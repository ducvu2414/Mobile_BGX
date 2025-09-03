import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions
} from 'react-native';
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const WalletScreen = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const userInfo = user.userData.userData || {
    userCode: '',
    name: '',
    phoneNumber: '',
    email: '',
    gender: true,
    dateOfBirth: '',
    address: '',
    role: '',
    balance: 0
  };

  const [transactions] = useState([
    {
      id: 1,
      type: 'expense', // expense: chi, income: thu
      title: 'Thanh toán gửi xe tháng 3',
      amount: 120000,
      date: '01/03/2025',
      time: '08:15',
      status: 'completed', // completed, pending, failed
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
  ]);

  // Các phương thức thanh toán đã liên kết
  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'bank',
      name: 'VietinBank',
      number: '•••• 5678',
      icon: 'credit-card',
      color: '#F44336'
    },
    {
      id: 2,
      type: 'bank',
      name: 'BIDV',
      number: '•••• 9012',
      icon: 'credit-card',
      color: '#1565C0'
    },
    {
      id: 3,
      type: 'ewallet',
      name: 'MoMo',
      number: '09xx xxx 789',
      icon: 'account-balance-wallet',
      color: '#E91E63'
    }
  ]);

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
      case 'transfer':
        return <MaterialIcons name="swap-horiz" size={16} color="white" />;
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

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Ví điện tử</Text>
        <TouchableOpacity onPress={() => navigation.navigate('WalletSettings')}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderBalanceCard = () => (
    <View style={styles.balanceCardContainer}>
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <View>
            <Text style={styles.balanceLabel}>Số dư hiện tại</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(userInfo.balance)}</Text>
          </View>
          {/* <View style={styles.pointsContainer}>
            <MaterialCommunityIcons name="star-circle" size={24} color="#FFC107" />
            <Text style={styles.pointsText}>{walletInfo.points} điểm</Text>
          </View> */}
        </View>
        <View style={styles.actionsContainer}>
          {[
            { icon: 'add', label: 'Nạp tiền', onPress: () => navigation.navigate('TopUp') },
            { icon: 'account-balance-wallet', label: 'Rút tiền', onPress: () => navigation.navigate('Withdraw') },
            { icon: 'send', label: 'Chuyển tiền', onPress: () => navigation.navigate('Transfer') },
            { icon: 'payment', label: 'Thanh toán', onPress: () => navigation.navigate('Payment') }
          ].map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionButton} onPress={action.onPress}>
              <View style={styles.actionIcon}>
                <MaterialIcons name={action.icon} size={20} color="white" />
              </View>
              <Text style={styles.actionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderPaymentMethods = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddPaymentMethod')}>
          <Text style={styles.viewAllText}>Thêm mới</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={paymentMethods}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.paymentMethodsContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.paymentMethodCard}
            onPress={() => navigation.navigate('PaymentMethodDetail', { method: item })}
          >
            <View style={[styles.paymentMethodIcon, { backgroundColor: item.color }]}>
              <MaterialIcons name={item.icon} size={20} color="white" />
            </View>
            <View>
              <Text style={styles.paymentMethodName}>{item.name}</Text>
              <Text style={styles.paymentMethodNumber}>{item.number}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );

  const renderQuickServices = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Dịch vụ nhanh</Text>
      </View>
      <View style={styles.quickServicesGrid}>
        {[
          { icon: 'receipt-long', screen: 'TransactionHistory', label: 'Hóa đơn', color: '#E3F2FD', iconColor: '#1565C0' },
          { icon: 'local-offer', screen: 'Home', params: { screen: 'Membership' }, label: 'Gói đỗ xe', color: '#E8F5E9', iconColor: '#4CAF50' },
          { icon: 'card-giftcard', screen: 'Home', params: { screen: 'Promotions' }, label: 'Khuyến mãi', color: '#FFF3E0', iconColor: '#FF9800' },
          { icon: 'history', screen: 'TransactionHistory', label: 'Lịch sử', color: '#FCE4EC', iconColor: '#E91E63' }
        ].map((service, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickServiceItem}
            onPress={() => {
              if (service.screen) {
                if (service.params) {
                  navigation.navigate(service.screen, service.params);
                } else {
                  navigation.navigate(service.screen);
                }
              }
            }}
          >
            <View style={[styles.quickServiceIcon, { backgroundColor: service.color }]}>
              <MaterialIcons name={service.icon} size={22} color={service.iconColor} />
            </View>
            <Text style={styles.quickServiceLabel}>{service.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderTransactions = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Lịch sử giao dịch</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
          <Text style={styles.viewAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactions.slice(0, 5)}
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
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      {renderHeader()}
      <ScrollView style={styles.content}>
        {renderBalanceCard()}
        <View style={styles.sectionDivider} />
        {renderPaymentMethods()}
        <View style={styles.sectionDivider} />
        {renderQuickServices()}
        <View style={styles.sectionDivider} />
        {renderTransactions()}
        <View style={{ height: 80 }} />
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
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  balanceCardContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pointsText: {
    color: '#FF9800',
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1565C0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#616161',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  section: {
    marginTop: 0,
    marginBottom: 0,
    paddingHorizontal: 16,
  },
  sectionDivider: {
    height: 8,
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#212121',
  },
  viewAllText: {
    fontSize: 13,
    color: '#1565C0',
  },
  paymentMethodsContainer: {
    paddingRight: 16,
  },
  paymentMethodCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    width: width * 0.65,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  paymentMethodIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodName: {
    fontWeight: '500',
    fontSize: 14,
    color: '#212121',
    marginBottom: 2,
  },
  paymentMethodNumber: {
    fontSize: 12,
    color: '#757575',
  },
  quickServicesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  quickServiceItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickServiceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickServiceLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#424242',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
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
  bottomNav: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 12,
    marginTop: 2,
    color: '#9E9E9E',
  },
});

export default WalletScreen;