import React, { useState } from 'react';
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
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const NotificationsScreen = ({ navigation }) => {
  // Dữ liệu mẫu cho thông báo
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Thanh toán thành công',
      message: 'Bạn đã thanh toán thành công gói đỗ xe tháng với số tiền 150.000đ',
      time: '10:30 AM',
      date: '12/03/2025',
      isRead: false,
      type: 'payment'
    },
    {
      id: 2,
      title: 'Sắp hết hạn gói đỗ xe',
      message: 'Gói đỗ xe tháng của bạn sẽ hết hạn trong 3 ngày nữa. Vui lòng gia hạn để tiếp tục sử dụng dịch vụ.',
      time: '08:45 AM',
      date: '11/03/2025',
      isRead: false,
      type: 'reminder'
    },
    {
      id: 3,
      title: 'Khuyến mãi đặc biệt',
      message: 'Đăng ký gói đỗ xe học kỳ mới và nhận ưu đãi giảm 20% tổng hóa đơn.',
      time: '02:15 PM',
      date: '10/03/2025',
      isRead: true,
      type: 'promotion'
    },
    {
      id: 4,
      title: 'Nạp tiền thành công',
      message: 'Bạn đã nạp thành công 200.000đ vào ví điện tử.',
      time: '09:20 AM',
      date: '09/03/2025',
      isRead: true,
      type: 'payment'
    },
    {
      id: 5,
      title: 'Cập nhật hệ thống',
      message: 'Hệ thống sẽ bảo trì từ 22:00 ngày 15/03/2025 đến 02:00 ngày 16/03/2025. Mong quý khách thông cảm.',
      time: '11:00 AM',
      date: '08/03/2025',
      isRead: true,
      type: 'system'
    }
  ]);

  // Đánh dấu thông báo đã đọc
  const markAsRead = (id) => {
    setNotifications(
      notifications.map(item => 
        item.id === id ? { ...item, isRead: true } : item
      )
    );
  };

  // Xóa thông báo
  const deleteNotification = (id) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa thông báo này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            setNotifications(notifications.filter(item => item.id !== id));
          },
        },
      ]
    );
  };

  // Đánh dấu tất cả đã đọc
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(item => ({ ...item, isRead: true }))
    );
  };

  // Xóa tất cả thông báo
  const deleteAllNotifications = () => {
    if (notifications.length === 0) return;
    
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa tất cả thông báo?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa tất cả',
          style: 'destructive',
          onPress: () => {
            setNotifications([]);
          },
        },
      ]
    );
  };

  // Lấy biểu tượng dựa trên loại thông báo
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'payment':
        return <MaterialIcons name="payment" size={24} color="#1565C0" />;
      case 'reminder':
        return <MaterialIcons name="access-time" size={24} color="#FF9800" />;
      case 'promotion':
        return <MaterialIcons name="local-offer" size={24} color="#E91E63" />;
      case 'system':
        return <MaterialIcons name="system-update" size={24} color="#4CAF50" />;
      default:
        return <MaterialIcons name="notifications" size={24} color="#757575" />;
    }
  };

  // Render item cho FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.isRead ? styles.readItem : styles.unreadItem]}
      onPress={() => {
        markAsRead(item.id);
        // Điều hướng đến chi tiết thông báo nếu cần
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
          {item.time} - {item.date}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNotification(item.id)}
      >
        <MaterialIcons name="delete-outline" size={22} color="#757575" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Render header cho FlatList
  const renderHeader = () => {
    const unreadCount = notifications.filter(item => !item.isRead).length;
    
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

  // Render khi không có thông báo
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
        keyExtractor={item => item.id.toString()}
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