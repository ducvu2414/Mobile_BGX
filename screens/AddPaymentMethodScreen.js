import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const AddPaymentMethodScreen = ({ navigation }) => {
  const [methodType, setMethodType] = useState('bank');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleAddMethod = () => {
    // Validate inputs
    if (!bankName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên ngân hàng');
      return;
    }

    if (!accountNumber.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập số tài khoản');
      return;
    }

    if (!accountName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên chủ tài khoản');
      return;
    }

    // Process adding new payment method
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn thêm phương thức thanh toán này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Thêm',
          onPress: () => {
            // Add payment method logic would go here
            Alert.alert('Thành công', 'Đã thêm phương thức thanh toán mới', [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thêm phương thức thanh toán</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.methodTypeContainer}>
          <Text style={styles.label}>Loại phương thức</Text>
          <View style={styles.methodTypeButtons}>
            <TouchableOpacity
              style={[
                styles.methodTypeButton,
                methodType === 'bank' && styles.methodTypeButtonActive,
              ]}
              onPress={() => setMethodType('bank')}
            >
              <MaterialIcons
                name="account-balance"
                size={24}
                color={methodType === 'bank' ? '#1565C0' : '#757575'}
              />
              <Text
                style={[
                  styles.methodTypeText,
                  methodType === 'bank' && styles.methodTypeTextActive,
                ]}
              >
                Ngân hàng
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.methodTypeButton,
                methodType === 'ewallet' && styles.methodTypeButtonActive,
              ]}
              onPress={() => setMethodType('ewallet')}
            >
              <MaterialIcons
                name="account-balance-wallet"
                size={24}
                color={methodType === 'ewallet' ? '#1565C0' : '#757575'}
              />
              <Text
                style={[
                  styles.methodTypeText,
                  methodType === 'ewallet' && styles.methodTypeTextActive,
                ]}
              >
                Ví điện tử
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Thông tin {methodType === 'bank' ? 'ngân hàng' : 'ví điện tử'}</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              {methodType === 'bank' ? 'Tên ngân hàng' : 'Tên ví điện tử'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={methodType === 'bank' ? 'VietinBank, BIDV, ...' : 'MoMo, ZaloPay, ...'}
              value={bankName}
              onChangeText={setBankName}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              {methodType === 'bank' ? 'Số tài khoản' : 'Số điện thoại'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={methodType === 'bank' ? '1234567890' : '0901234567'}
              keyboardType="numeric"
              value={accountNumber}
              onChangeText={setAccountNumber}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              {methodType === 'bank' ? 'Tên chủ tài khoản' : 'Tên chủ ví'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nguyễn Văn A"
              value={accountName}
              onChangeText={setAccountName}
            />
          </View>
          
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setIsDefault(!isDefault)}
            >
              {isDefault ? (
                <MaterialIcons name="check-box" size={24} color="#1565C0" />
              ) : (
                <MaterialIcons name="check-box-outline-blank" size={24} color="#757575" />
              )}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>
              Đặt làm phương thức thanh toán mặc định
            </Text>
          </View>
        </View>

        <View style={styles.securityNote}>
          <MaterialIcons name="security" size={20} color="#757575" />
          <Text style={styles.securityNoteText}>
            Thông tin thanh toán của bạn được mã hóa và bảo mật theo tiêu chuẩn ngành.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.addButton,
            (!bankName || !accountNumber || !accountName) && styles.addButtonDisabled,
          ]}
          onPress={handleAddMethod}
          disabled={!bankName || !accountNumber || !accountName}
        >
          <Text style={styles.addButtonText}>Thêm phương thức thanh toán</Text>
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
  methodTypeContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 16,
  },
  methodTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  methodTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  methodTypeButtonActive: {
    borderColor: '#1565C0',
    backgroundColor: '#E3F2FD',
  },
  methodTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
    marginLeft: 8,
  },
  methodTypeTextActive: {
    color: '#1565C0',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#212121',
  },
  securityNote: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  securityNoteText: {
    flex: 1,
    fontSize: 12,
    color: '#757575',
    marginLeft: 8,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  addButton: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddPaymentMethodScreen;