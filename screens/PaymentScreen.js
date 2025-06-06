import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const PaymentScreen = ({ navigation, route }) => {
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
  const [amount, setAmount] = useState(route.params?.amount || '');
  const [note, setNote] = useState(route.params?.description || '');
  const [paymentType, setPaymentType] = useState(route.params?.type || 'general');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const walletBalance = userInfo.balance;

  // Danh sách gói thanh toán
  const paymentPackages = {
    parking: [
      { id: 'parking-day', name: 'Gói ngày', price: 10000, description: 'Đỗ xe trong 24 giờ' },
      { id: 'parking-week', name: 'Gói tuần', price: 50000, description: 'Đỗ xe trong 7 ngày' },
      { id: 'parking-month', name: 'Gói tháng', price: 150000, description: 'Đỗ xe trong 30 ngày' },
    ],
    membership: [
      { id: 'student-basic', name: 'Gói tiết kiệm', price: 350000, description: 'Gói tiết kiệm dành cho sinh viên' },
      { id: 'student-premium', name: 'Gói nâng cấp', price: 900000, description: 'Gói nâng cấp dành cho sinh viên' },
      { id: 'student-vip', name: 'Gói siêu cấp', price: 1500000, description: 'Gói siêu cấp dành cho sinh viên' },
    ],
    promotion: [
      { id: 'promo-basic', name: 'Khuyến mãi cơ bản', price: 100000, description: 'Khuyến mãi cơ bản' },
      { id: 'promo-special', name: 'Khuyến mãi đặc biệt', price: 200000, description: 'Khuyến mãi đặc biệt' },
    ],
    general: [
      { id: 'general-small', name: 'Thanh toán nhỏ', price: 50000, description: 'Thanh toán dịch vụ nhỏ' },
      { id: 'general-medium', name: 'Thanh toán vừa', price: 100000, description: 'Thanh toán dịch vụ vừa' },
      { id: 'general-large', name: 'Thanh toán lớn', price: 200000, description: 'Thanh toán dịch vụ lớn' },
    ]
  };

  // Danh sách phương thức thanh toán
  const paymentMethods = [
    {
      id: 1,
      type: 'wallet',
      name: 'Ví điện tử',
      balance: walletBalance,
      icon: 'account-balance-wallet',
      color: '#1565C0',
      isDefault: true
    },
    {
      id: 2,
      type: 'bank',
      name: 'VietinBank',
      number: '•••• 5678',
      icon: 'credit-card',
      color: '#F44336',
      isDefault: false
    }
  ];

  // Thiết lập phương thức thanh toán mặc định
  useEffect(() => {
    if (!selectedPaymentMethod && paymentMethods.length > 0) {
      setSelectedPaymentMethod(paymentMethods.find(method => method.isDefault) || paymentMethods[0]);
    }
  }, []);

  // Cập nhật số tiền khi chọn gói
  useEffect(() => {
    if (selectedPackage) {
      setAmount(selectedPackage.price.toString());
      setNote(selectedPackage.description);
    }
  }, [selectedPackage]);

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    setSelectedPackage(null); // Reset selected package when changing type
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handlePayment = () => {
    if (!amount || parseInt(amount) < 1000) {
      Alert.alert('Lỗi', 'Vui lòng nhập số tiền hợp lệ');
      return;
    }

    if (selectedPaymentMethod?.type === 'wallet' && parseInt(amount) > walletBalance) {
      Alert.alert('Lỗi', 'Số dư không đủ để thực hiện giao dịch này');
      return;
    }

    if (!selectedPaymentMethod) {
      Alert.alert('Lỗi', 'Vui lòng chọn phương thức thanh toán');
      return;
    }

    // Xử lý thanh toán
    let confirmMessage = `Bạn có chắc muốn thanh toán ${formatCurrency(amount)}?`;
    if (selectedPackage) {
      confirmMessage = `Bạn có chắc muốn thanh toán gói ${selectedPackage.name} với giá ${formatCurrency(amount)}?`;
    }
    confirmMessage += `\nPhương thức: ${selectedPaymentMethod.name}`;

    Alert.alert(
      'Xác nhận thanh toán',
      confirmMessage,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => {
            // Xử lý giao dịch thanh toán
            Alert.alert('Thành công', 'Thanh toán thành công!', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('PaymentSuccess', {
                  amount: parseInt(amount),
                  description: note,
                  type: paymentType,
                  packageName: selectedPackage?.name,
                  paymentMethod: selectedPaymentMethod.name,
                  date: new Date().toISOString()
                }),
              },
            ]);
          },
        },
      ]
    );
  };

  const formatCurrency = (value) => {
    if (!value) return '0 đ';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Số dư khả dụng</Text>
          <Text style={styles.balanceAmount}>{formatCurrency(walletBalance)}</Text>
        </View>

        <View style={styles.paymentTypeContainer}>
          <Text style={styles.label}>Loại thanh toán</Text>

          <TouchableOpacity
            style={[styles.typeItem, paymentType === 'general' && styles.typeItemActive]}
            onPress={() => handlePaymentTypeChange('general')}
          >
            <View style={[styles.typeIcon, { backgroundColor: '#E3F2FD' }]}>
              <MaterialIcons name="payment" size={20} color="#1565C0" />
            </View>
            <View style={styles.typeInfo}>
              <Text style={styles.typeName}>Thanh toán chung</Text>
              <Text style={styles.typeDesc}>Thanh toán các dịch vụ chung</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeItem, paymentType === 'parking' && styles.typeItemActive]}
            onPress={() => handlePaymentTypeChange('parking')}
          >
            <View style={[styles.typeIcon, { backgroundColor: '#E8F5E9' }]}>
              <FontAwesome5 name="parking" size={20} color="#4CAF50" />
            </View>
            <View style={styles.typeInfo}>
              <Text style={styles.typeName}>Đỗ xe</Text>
              <Text style={styles.typeDesc}>Thanh toán phí đỗ xe</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeItem, paymentType === 'membership' && styles.typeItemActive]}
            onPress={() => handlePaymentTypeChange('membership')}
          >
            <View style={[styles.typeIcon, { backgroundColor: '#FFF3E0' }]}>
              <MaterialIcons name="card-membership" size={20} color="#FF9800" />
            </View>
            <View style={styles.typeInfo}>
              <Text style={styles.typeName}>Gói thành viên</Text>
              <Text style={styles.typeDesc}>Thanh toán gói thành viên</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeItem, paymentType === 'promotion' && styles.typeItemActive]}
            onPress={() => handlePaymentTypeChange('promotion')}
          >
            <View style={[styles.typeIcon, { backgroundColor: '#FCE4EC' }]}>
              <MaterialIcons name="local-offer" size={20} color="#E91E63" />
            </View>
            <View style={styles.typeInfo}>
              <Text style={styles.typeName}>Khuyến mãi</Text>
              <Text style={styles.typeDesc}>Thanh toán khuyến mãi</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Phần chọn gói thanh toán */}
        {paymentPackages[paymentType] && (
          <View style={styles.packageContainer}>
            <Text style={styles.label}>Chọn gói thanh toán</Text>

            {paymentPackages[paymentType].map((pkg) => (
              <TouchableOpacity
                key={pkg.id}
                style={[
                  styles.packageItem,
                  selectedPackage?.id === pkg.id && styles.packageItemActive
                ]}
                onPress={() => handlePackageSelect(pkg)}
              >
                <View style={styles.packageInfo}>
                  <Text style={styles.packageName}>{pkg.name}</Text>
                  <Text style={styles.packageDesc}>{pkg.description}</Text>
                </View>
                <Text style={styles.packagePrice}>{formatCurrency(pkg.price)}</Text>
                {selectedPackage?.id === pkg.id && (
                  <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.amountContainer}>
          <Text style={styles.label}>Số tiền thanh toán</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0 đ"
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
          />
        </View>

        <View style={styles.paymentMethodContainer}>
          <Text style={styles.label}>Phương thức thanh toán</Text>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodItem,
                selectedPaymentMethod?.id === method.id && styles.methodItemActive,
              ]}
              onPress={() => setSelectedPaymentMethod(method)}
            >
              <View style={[styles.methodIcon, { backgroundColor: method.color }]}>
                <MaterialIcons name={method.icon} size={20} color="white" />
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{method.name}</Text>
                {method.type === 'wallet' ? (
                  <Text style={styles.methodDetails}>Số dư: {formatCurrency(method.balance)}</Text>
                ) : (
                  <Text style={styles.methodDetails}>{method.number}</Text>
                )}
              </View>
              {selectedPaymentMethod?.id === method.id && (
                <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.addMethodButton}
            onPress={() => navigation.navigate('AddPaymentMethod')}
          >
            <MaterialIcons name="add" size={20} color="#1565C0" />
            <Text style={styles.addMethodText}>Thêm phương thức thanh toán</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.label}>Ghi chú</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Nhập ghi chú (không bắt buộc)"
            multiline
            value={note}
            onChangeText={setNote}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.paymentButton,
            (!amount || !selectedPaymentMethod) && styles.paymentButtonDisabled,
          ]}
          onPress={handlePayment}
          disabled={!amount || !selectedPaymentMethod}
        >
          <Text style={styles.paymentButtonText}>Thanh toán</Text>
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
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
  },
  amountContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 12,
  },
  amountInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    fontSize: 24,
    fontWeight: '700',
    paddingVertical: 8,
  },
  noteContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#212121',
    height: 100,
    textAlignVertical: 'top',
  },
  paymentTypeContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  typeItemActive: {
    backgroundColor: '#F5F5F5',
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  typeInfo: {
    flex: 1,
  },
  typeName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#212121',
  },
  typeDesc: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  paymentMethodContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  methodItemActive: {
    backgroundColor: '#F5F5F5',
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#212121',
  },
  methodDetails: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  addMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  addMethodText: {
    marginLeft: 8,
    color: '#1565C0',
    fontWeight: '500',
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  paymentButton: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  paymentButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  paymentButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  // Styles for package selection
  packageContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  packageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  packageItemActive: {
    backgroundColor: '#F5F5F5',
  },
  packageInfo: {
    flex: 1,
  },
  packageName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#212121',
  },
  packageDesc: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  packagePrice: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1565C0',
    marginRight: 12,
  },
});

export default PaymentScreen;