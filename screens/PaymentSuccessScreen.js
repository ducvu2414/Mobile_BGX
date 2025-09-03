import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { fetchUserAccount } from '../redux/slice/userSlice';

const PaymentSuccessScreen = ({ navigation, route }) => {
  const { amount, description, type, paymentMethod, date, vehicle } = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserAccount());
  }, [dispatch]);
  // Format currency
  const formatCurrency = (value) => {
    if (!value) return '0 đ';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get title and icon based on transaction type
  const getTransactionInfo = () => {
    switch (type) {
      case 'topup':
        return {
          title: 'Nạp tiền thành công',
          icon: 'add-circle-outline',
          color: '#4CAF50'
        };
      case 'withdraw':
        return {
          title: 'Rút tiền thành công',
          icon: 'remove-circle-outline',
          color: '#FF9800'
        };
      case 'membership':
        return {
          title: 'Thanh toán gói thành viên thành công',
          icon: 'card-membership',
          color: '#1565C0'
        };
      case 'promotion':
        return {
          title: 'Thanh toán khuyến mãi thành công',
          icon: 'local-offer',
          color: '#E91E63'
        };
      default:
        return {
          title: 'Thanh toán thành công',
          icon: 'check-circle-outline',
          color: '#1565C0'
        };
    }
  };

  const transactionInfo = getTransactionInfo();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết giao dịch</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.successCard}>
          <MaterialIcons name={transactionInfo.icon} size={60} color={transactionInfo.color} />
          <Text style={styles.successTitle}>{transactionInfo.title}</Text>
          <Text style={[styles.successAmount, { color: transactionInfo.color }]}>
            {formatCurrency(amount)}
          </Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Thông tin giao dịch</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Loại giao dịch:</Text>
            <Text style={styles.detailValue}>{description}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phương thức:</Text>
            <Text style={styles.detailValue}>{paymentMethod}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Thời gian:</Text>
            <Text style={styles.detailValue}>{formatDate(date)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Mã giao dịch:</Text>
            <Text style={styles.detailValue}>
              {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.homeButtonText}>Về trang chủ</Text>
        </TouchableOpacity>
      </View>
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
  successCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginTop: 16,
    marginBottom: 8,
  },
  successAmount: {
    fontSize: 28,
    fontWeight: '700',
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  detailRow: {
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
  bottomContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  homeButton: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  homeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PaymentSuccessScreen;