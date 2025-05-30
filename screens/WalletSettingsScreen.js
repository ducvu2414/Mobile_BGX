import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Switch,
  Alert,
  ScrollView
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const WalletSettingsScreen = ({ navigation }) => {
  const [autoRecharge, setAutoRecharge] = useState(false);
  const [transactionNotifications, setTransactionNotifications] = useState(true);
  const [lowBalanceAlert, setLowBalanceAlert] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc muốn đăng xuất khỏi ví?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: () => {
            // Xử lý đăng xuất
            navigation.navigate('Login');
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
        <Text style={styles.headerTitle}>Cài đặt ví</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Cài đặt thanh toán</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="autorenew" size={24} color="#1565C0" />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Tự động nạp tiền</Text>
                <Text style={styles.settingDescription}>Tự động nạp tiền khi số dư dưới 50.000đ</Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
              thumbColor={autoRecharge ? '#1565C0' : '#BDBDBD'}
              onValueChange={setAutoRecharge}
              value={autoRecharge}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => navigation.navigate('PaymentMethods')}
          >
            <View style={styles.settingInfo}>
              <MaterialIcons name="credit-card" size={24} color="#1565C0" />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Phương thức thanh toán</Text>
                <Text style={styles.settingDescription}>Quản lý thẻ và tài khoản ngân hàng</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Thông báo</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="notifications" size={24} color="#1565C0" />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Thông báo giao dịch</Text>
                <Text style={styles.settingDescription}>Nhận thông báo khi có giao dịch mới</Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
              thumbColor={transactionNotifications ? '#1565C0' : '#BDBDBD'}
              onValueChange={setTransactionNotifications}
              value={transactionNotifications}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="warning" size={24} color="#1565C0" />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Cảnh báo số dư thấp</Text>
                <Text style={styles.settingDescription}>Nhận thông báo khi số dư dưới 50.000đ</Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
              thumbColor={lowBalanceAlert ? '#1565C0' : '#BDBDBD'}
              onValueChange={setLowBalanceAlert}
              value={lowBalanceAlert}
            />
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Bảo mật</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="fingerprint" size={24} color="#1565C0" />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Xác thực sinh trắc học</Text>
                <Text style={styles.settingDescription}>Sử dụng vân tay hoặc Face ID để xác thực</Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
              thumbColor={biometricAuth ? '#1565C0' : '#BDBDBD'}
              onValueChange={setBiometricAuth}
              value={biometricAuth}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => navigation.navigate('ChangePin')}
          >
            <View style={styles.settingInfo}>
              <MaterialIcons name="lock" size={24} color="#1565C0" />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Đổi mã PIN</Text>
                <Text style={styles.settingDescription}>Thay đổi mã PIN bảo mật</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <MaterialIcons name="exit-to-app" size={20} color="#F44336" />
          <Text style={styles.logoutButtonText}>Đăng xuất khỏi ví</Text>
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
  settingsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
  },
  settingDescription: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  logoutButtonText: {
    color: '#F44336',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default WalletSettingsScreen;