import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const TransactionHistoryScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [transactions] = useState([
    {
      id: 1,
      type: 'expense',
      title: 'Thanh toán gửi xe tháng 3',
      amount: 120000,
      date: '01/03/2025',
      time: '08:15',
      status: 'completed',
      category: 'parking'
    },
    {
      id: 2,
      type: 'income',
      title: 'Nạp tiền vào ví',
      amount: 500000,
      date: '28/02/2025',
      time: '14:30',
      status: 'completed',
      category: 'deposit'
    },
    {
      id: 3,
      type: 'expense',
      title: 'Phí đỗ xe ngày',
      amount: 10000,
      date: '25/02/2025',
      time: '09:20',
      status: 'completed',
      category: 'parking'
    },
    {
      id: 4,
      type: 'expense',
      title: 'Gói đỗ xe có mái che',
      amount: 150000,
      date: '15/02/2025',
      time: '10:45',
      status: 'completed',
      category: 'package'
    },
    {
      id: 5,
      type: 'income',
      title: 'Hoàn tiền khuyến mãi',
      amount: 25000,
      date: '10/02/2025',
      time: '16:30',
      status: 'completed',
      category: 'refund'
    },
    {
      id: 6,
      type: 'expense',
      title: 'Phí đỗ xe ngày',
      amount: 10000,
      date: '05/02/2025',
      time: '08:30',
      status: 'completed',
      category: 'parking'
    },
    {
      id: 7,
      type: 'income',
      title: 'Nạp tiền vào ví',
      amount: 200000,
      date: '01/02/2025',
      time: '10:15',
      status: 'completed',
      category: 'deposit'
    },
    {
      id: 8,
      type: 'expense',
      title: 'Phí đỗ xe ngày',
      amount: 10000,
      date: '28/01/2025',
      time: '14:20',
      status: 'completed',
      category: 'parking'
    },
  ]);

  // Lọc giao dịch theo loại
  const filteredTransactions = transactions.filter(transaction => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'income') return transaction.type === 'income';
    if (activeFilter === 'expense') return transaction.type === 'expense';
    return true;
  });

  // Hiển thị biểu tượng cho danh mục giao dịch
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'parking':
        return <FontAwesome5 name="motorcycle" size={16} color="white" />;
      case 'deposit':
        return <MaterialIcons name="add" size={16} color="white" />;
      case 'refund':
        return <MaterialIcons name="replay" size={16} color="white" />;
      case 'package':
        return <MaterialIcons name="local-offer" size={16} color="white" />;
      default:
        return <MaterialIcons name="payment" size={16} color="white" />;
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

  // Format số tiền VNĐ
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử giao dịch</Text>
        <TouchableOpacity onPress={() => {}}>
          <MaterialIcons name="filter-list" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {['all', 'income', 'expense'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter === 'all' ? 'Tất cả' : 
               filter === 'income' ? 'Tiền vào' : 'Tiền ra'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTransactions}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.transactionItem}
            onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
          >
            <View style={[styles.transactionIconContainer, { backgroundColor: getCategoryColor(item.category) }]}>
              {getCategoryIcon(item.category)}
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>{item.title}</Text>
              <Text style={styles.transactionDate}>{item.date} • {item.time}</Text>
            </View>
            <View style={styles.transactionAmount}>
              <Text style={[styles.transactionAmountText, { color: item.type === 'income' ? '#4CAF50' : '#F44336' }]}>
                {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
              </Text>
              <View style={[styles.transactionStatus, {
                backgroundColor: item.status === 'completed' ? '#E8F5E9' :
                  item.status === 'pending' ? '#FFF3E0' : '#FFEBEE'
              }]}>
                <Text style={[styles.transactionStatusText, {
                  color: item.status === 'completed' ? '#4CAF50' :
                    item.status === 'pending' ? '#FF9800' : '#F44336'
                }]}>
                  {item.status === 'completed' ? 'Hoàn tất' :
                    item.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.transactionList}
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
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: '#E3F2FD',
  },
  filterText: {
    color: '#757575',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#1565C0',
  },
  transactionList: {
    padding: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#757575',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  transactionStatusText: {
    fontSize: 10,
    fontWeight: '500',
  },
});

export default TransactionHistoryScreen;