import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Share
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const TransactionDetailScreen = ({ route, navigation }) => {
  const { transaction } = route.params;

  // Format số tiền VNĐ
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ';
  };

  // Hiển thị biểu tượng cho danh mục giao dịch
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'parking':
        return <FontAwesome5 name="motorcycle" size={24} color="white" />;
      case 'deposit':
        return <MaterialIcons name="add" size={24} color="white" />;
      case 'refund':
        return <MaterialIcons name="replay" size={24} color="white" />;
      case 'package':
        return <MaterialIcons name="local-offer" size={24} color="white" />;
      default:
        return <MaterialIcons name="payment" size={24} color="white" />;
    }
  };

  // Hiển thị màu cho danh mục giao dịch
  const getCategoryColor = (category) => {
    switch (category) {
      case 'parking':
        return '#1565C0';
      case 'deposit':
        return '#4CAF50';
      case 'refund':
        return '#FF9800';
      case 'package':
        return '#9C27B0';
      default:
        return '#607D8B';
    }
  };

  // Hiển thị tên danh mục
  const getCategoryName = (category) => {
    switch (category) {
      case 'parking':
        return 'Đỗ xe';
      case 'deposit':
        return 'Nạp tiền';
      case 'refund':
        return 'Hoàn tiền';
      case 'package':
        return 'Gói đỗ xe';
      default:
        return 'Thanh toán';
    }
  };

  // Chia sẻ thông tin giao dịch
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Chi tiết giao dịch: ${transaction.title} - ${formatCurrency(transaction.amount)} - ${transaction.date}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết giao dịch</Text>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.amountSection}>
          <View style={[styles.iconContainer, { backgroundColor: getCategoryColor(transaction.category) }]}>
            {getCategoryIcon(transaction.category)}
          </View>
          <Text style={[styles.amountText, { color: transaction.type === 'income' ? '#4CAF50' : '#F44336' }]}>
            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
          </Text>
          <View style={[styles.statusContainer, {
            backgroundColor: transaction.status === 'completed' ? '#E8F5E9' :
              transaction.status === 'pending' ? '#FFF3E0' : '#FFEBEE'
          }]}>
            <Text style={[styles.statusText, {
              color: transaction.status === 'completed' ? '#4CAF50' :
                transaction.status === 'pending' ? '#FF9800' : '#F44336'
            }]}>
              {transaction.status === 'completed' ? 'Hoàn tất' :
                transaction.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
            </Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Thông tin giao dịch</Text>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Loại giao dịch</Text>
            <Text style={styles.detailValue}>{getCategoryName(transaction.category)}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Tiêu đề</Text>
            <Text style={styles.detailValue}>{transaction.title}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Ngày giao dịch</Text>
            <Text style={styles.detailValue}>{transaction.date}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Thời gian</Text>
            <Text style={styles.detailValue}>{transaction.time}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Mã giao dịch</Text>
            <Text style={styles.detailValue}>TRX{transaction.id}2025{Math.floor(Math.random() * 1000)}</Text>
          </View>
        </View>

        {transaction.category === 'parking' && (
          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>Thông tin đỗ xe</Text>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Khu vực đỗ xe</Text>
              <Text style={styles.detailValue}>Khu A - Trường ĐH</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Thời gian vào</Text>
              <Text style={styles.detailValue}>{transaction.date} {transaction.time}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Thời gian ra</Text>
              <Text style={styles.detailValue}>{transaction.date} 17:30</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Biển số xe</Text>
              <Text style={styles.detailValue}>59-X1 23456</Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.supportButton}>
          <MaterialIcons name="headset-mic" size={20} color="#1565C0" />
          <Text style={styles.supportButtonText}>Liên hệ hỗ trợ</Text>
        </TouchableOpacity>
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  amountText: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#757575',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    maxWidth: '60%',
    textAlign: 'right',
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  supportButtonText: {
    color: '#1565C0',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default TransactionDetailScreen;