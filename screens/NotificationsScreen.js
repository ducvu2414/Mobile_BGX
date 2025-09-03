import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { NOTIFICATION_URL } from '@env';
import axios from 'axios';
import { fetchUserAccount } from '../redux/slice/userSlice';

const NotificationsScreen = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const userInfo = user?.userData?.userData || {};
  const userCode = userInfo.userCode || '';

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef(null);

  const dispatch = useDispatch();

  /** ---------- Helpers: dedupe / upsert / sort ---------- */
  const dedupeById = (arr) => {
    const map = new Map();
    for (const item of arr) map.set(item._id, item);
    return Array.from(map.values());
  };

  const upsertById = (arr, item) => {
    const map = new Map(arr.map(n => [n._id, n]));
    map.set(item._id, { ...map.get(item._id), ...item });
    return Array.from(map.values());
  };

  const sortByCreatedAtDesc = (arr) =>
    [...arr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  /** ---------- Fetch once userCode is ready ---------- */
  useEffect(() => {
    if (!userCode) return;
    getNotifications(userCode);
  }, [userCode]);

  const getNotifications = async (code) => {
    try {
      const baseURL = `${NOTIFICATION_URL}/api/notifications/${code}`;
      const response = await axios.get(baseURL);

      const uniq = dedupeById(response.data || []);
      const sorted = sortByCreatedAtDesc(uniq);

      setNotifications(sorted);
      setUnreadCount(sorted.filter(item => !item.isRead).length);
    } catch (error) {
      console.error('Lỗi khi lấy thông báo:', error);
    }
  };

  /** ---------- Socket.io: register & upsert on event ---------- */
  useEffect(() => {
    if (!userCode) return;
    if (socketRef.current) return;

    const newSocket = io(NOTIFICATION_URL, { transports: ['websocket'] });
    socketRef.current = newSocket;

    newSocket.on('connect', () => {
      console.log('✅ Socket connected');
      newSocket.emit('register', userCode);
    });

    // Đảm bảo không gắn nhiều listener trùng
    newSocket.off('new_notification');

    newSocket.on('new_notification', (data) => {
      console.log('📩 Notification received:', data);

      // Upsert + sort trong functional setState để có prev state chính xác
      setNotifications(prev => {
        const existed = prev.some(n => n._id === data._id);
        const merged = existed ? upsertById(prev, data) : [data, ...prev];
        if (!existed && !data.isRead) {
          setUnreadCount(c => c + 1);
        }
        return sortByCreatedAtDesc(merged);
      });
      dispatch(fetchUserAccount());
    });

    // Cleanup khi unmount / đổi userCode
    return () => {
      try {
        newSocket.off('new_notification');
        newSocket.disconnect();
      } catch (e) {
        // ignore
      }
      socketRef.current = null;
    };
  }, [userCode]);

  /** ---------- Actions ---------- */
  const markAsRead = async (_id) => {
    try {
      const baseURL = `${NOTIFICATION_URL}/api/notifications/${_id}/read`;
      await axios.put(baseURL);
      setNotifications(prev => prev.map(it => it._id === _id ? { ...it, isRead: true } : it));
      setUnreadCount(prev => {
        // Kiểm tra trạng thái hiện tại (ngoại vi), có thể lệch một tick — vẫn an toàn:
        const wasUnread = notifications.find(it => it._id === _id && !it.isRead);
        return wasUnread ? Math.max(prev - 1, 0) : prev;
      });
    } catch (error) {
      console.error('Lỗi khi đánh dấu đã đọc:', error);
    }
  };

  // const deleteNotification = (_id) => {
  //   Alert.alert(
  //     'Xác nhận xóa',
  //     'Bạn có chắc muốn xóa thông báo này?',
  //     [
  //       { text: 'Hủy', style: 'cancel' },
  //       {
  //         text: 'Xóa',
  //         style: 'destructive',
  //         onPress: () => {
  //           const wasUnread = notifications.find(it => it._id === _id && !it.isRead);
  //           setNotifications(prev => prev.filter(item => item._id !== _id));
  //           if (wasUnread) setUnreadCount(prev => Math.max(prev - 1, 0));
  //         },
  //       },
  //     ]
  //   );
  // };

  const markAllAsRead = async () => {
    try {
      const baseURL = `${NOTIFICATION_URL}/api/notifications/mark-all-read/${userCode}`;
      await axios.put(baseURL);
      setNotifications(prev => prev.map(item => ({ ...item, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Lỗi khi đánh dấu tất cả đã đọc:', error);
    }
  };

  const deleteAllNotifications = () => {
    // if (notifications.length === 0) return;

    // Alert.alert(
    //   'Xác nhận xóa',
    //   'Bạn có chắc muốn xóa tất cả thông báo?',
    //   [
    //     { text: 'Hủy', style: 'cancel' },
    //     {
    //       text: 'Xóa tất cả',
    //       style: 'destructive',
    //       onPress: () => {
    //         setNotifications([]);
    //         setUnreadCount(0);
    //       },
    //     },
    //   ]
    // );
  };

  /** ---------- UI utils ---------- */
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'payment':
        return <MaterialIcons name="payment" size={24} color="#1565C0" />;
      case 'reminder':
        return <MaterialIcons name="access-time" size={24} color="#FF9800" />;
      case 'promotion':
        return <MaterialIcons name="local-offer" size={24} color="#E91E63" />;
      case 'transfer':
        return <MaterialIcons name="swap-horiz" size={24} color="#4CAF50" />;
      case 'system':
        return <MaterialIcons name="system-update" size={24} color="#4CAF50" />;
      default:
        return <MaterialIcons name="notifications" size={24} color="#757575" />;
    }
  };

  const formatDateTime = (createdAt) => {
    const dateObj = new Date(createdAt || Date.now());
    if (isNaN(dateObj)) return { date: '--/--/----', time: '--:--' };

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    return { date: `${day}/${month}/${year}`, time: `${hours}:${minutes}` };
  };

  /** ---------- Renderers ---------- */
  const renderItem = ({ item }) => {
    const { date, time } = formatDateTime(item.createdAt);

    return (
      <TouchableOpacity
        style={[styles.notificationItem, item.isRead ? styles.readItem : styles.unreadItem]}
        onPress={() => {
          markAsRead(item._id);
          // navigation.navigate('NotificationDetail', { notification: item });
        }}
      >
        <View style={styles.notificationIcon}>
          {getNotificationIcon(item.type)}
        </View>

        <View style={styles.notificationContent}>
          <Text style={[styles.notificationTitle, !item.isRead && styles.unreadText]}>
            {item.title}
          </Text>
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {item.message}
          </Text>
          <Text style={styles.notificationTime}>
            {time} - {date}
          </Text>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNotification(item._id)}>
          <MaterialIcons name="delete-outline" size={22} color="#757575" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerActions}>
        <Text style={styles.notificationCount}>
          {unreadCount > 0 ? `${unreadCount} thông báo chưa đọc` : 'Không có thông báo mới'}
        </Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Text style={[styles.actionButtonText, unreadCount === 0 && styles.disabledText]}>
              Đánh dấu đã đọc
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={deleteAllNotifications}
            disabled={notifications.length === 0}
          >
            <Text style={[styles.actionButtonText, notifications.length === 0 && styles.disabledText]}>
              Xóa tất cả
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="notifications-off" size={60} color="#BDBDBD" />
      <Text style={styles.emptyText}>Không có thông báo nào</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={notifications.length === 0 ? { flex: 1 } : null}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#1565C0',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  headerActions: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  notificationCount: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    paddingVertical: 8,
  },
  actionButtonText: {
    color: '#1565C0',
    fontWeight: '500',
  },
  disabledText: {
    color: '#BDBDBD',
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 1,
    alignItems: 'center',
  },
  unreadItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#1565C0',
  },
  readItem: {
    opacity: 0.8,
  },
  notificationIcon: {
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: '700',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#757575',
    marginTop: 16,
  },
});

export default NotificationsScreen;