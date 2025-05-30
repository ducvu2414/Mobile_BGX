import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      // Kiểm tra đầu vào
      // if (!username.trim()) {
      //   Alert.alert('Thông báo', 'Vui lòng nhập mã người dùng');
      //   return;
      // }

      // if (!password.trim()) {
      //   Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu');
      //   return;
      // }

      // Mô phỏng đăng nhập thành công
      // Trong ứng dụng thực tế, bạn sẽ gọi API đăng nhập ở đây
      // if (username === 'admin' && password === 'admin') {
      //   navigation.dispatch(
      //     CommonActions.reset({
      //       index: 0,
      //       routes: [{ name: 'Main' }],
      //     })
      //   );
      navigation.navigate('Main');
      // } else {
      //   Alert.alert('Thông báo', 'Mã người dùng hoặc mật khẩu không đúng');
      // }
    } catch (error) {
      Alert.alert('Lỗi', 'Đăng nhập thất bại, vui lòng thử lại sau');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleChangePassword = () => {
    navigation.navigate('VerifyCode', { email: 'user@example.com' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />

      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Quản Lý Bãi Đỗ Xe</Text>
        <Text style={styles.appSlogan}>Đơn giản - Tiện lợi - An toàn</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>Đăng nhập</Text>

          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={24} color="#1565C0" style={styles.inputIcon} />
            <View style={styles.textInputContainer}>
              <Text style={styles.inputLabel}>Mã người dùng</Text>
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Nhập mã người dùng"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="#1565C0" style={styles.inputIcon} />
            <View style={styles.textInputContainer}>
              <Text style={styles.inputLabel}>Mật khẩu</Text>
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Nhập mật khẩu"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={24}
                    color="#757575"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.actionLinks}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.changePasswordText}>Quên mật khẩu?</Text>
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Quản Lý Bãi Đỗ Xe</Text>
      </View>
    </SafeAreaView>
  );
};

// Thêm import TextInput
import { TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#1565C0',
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  appSlogan: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginTop: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#212121',
    paddingVertical: 8,
  },
  passwordToggle: {
    padding: 8,
  },
  actionLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#1565C0',
    fontSize: 14,
  },
  changePasswordText: {
    color: '#1565C0',
    fontSize: 14,
    marginBottom: 18
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#1565C0',
  },
  loginButton: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9E9E9E',
  },
});

export default LoginScreen;