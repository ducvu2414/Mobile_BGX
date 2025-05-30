import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Switch,
  ScrollView,
  Alert
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const AppSettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [language, setLanguage] = useState('Tiếng Việt');

  const handleClearCache = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xóa bộ nhớ đệm?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => {
            // Logic to clear cache
            Alert.alert('Thành công', 'Đã xóa bộ nhớ đệm');
          },
        },
      ]
    );
  };

  const handleLanguageChange = () => {
    Alert.alert(
      'Chọn ngôn ngữ',
      'Chọn ngôn ngữ hiển thị cho ứng dụng',
      [
        {
          text: 'Tiếng Việt',
          onPress: () => setLanguage('Tiếng Việt'),
        },
        {
          text: 'English',
          onPress: () => setLanguage('English'),
        },
        {
          text: 'Hủy',
          style: 'cancel',
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
        <Text style={styles.headerTitle}>Cài đặt</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chung</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleLanguageChange}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Ngôn ngữ</Text>
              <Text style={styles.settingValue}>{language}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Chế độ tối</Text>
              <Text style={styles.settingDesc}>Thay đổi giao diện sang chế độ tối</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
              thumbColor={darkModeEnabled ? '#1565C0' : '#FAFAFA'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông báo</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Thông báo đẩy</Text>
              <Text style={styles.settingDesc}>Nhận thông báo từ ứng dụng</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
              thumbColor={notificationsEnabled ? '#1565C0' : '#FAFAFA'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quyền riêng tư</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Vị trí</Text>
              <Text style={styles.settingDesc}>Cho phép ứng dụng truy cập vị trí</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
              thumbColor={locationEnabled ? '#1565C0' : '#FAFAFA'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Xác thực sinh trắc học</Text>
              <Text style={styles.settingDesc}>Đăng nhập bằng vân tay hoặc khuôn mặt</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: '#E0E0E0', true: '#BBDEFB' }}
              thumbColor={biometricEnabled ? '#1565C0' : '#FAFAFA'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dữ liệu</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleClearCache}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Xóa bộ nhớ đệm</Text>
              <Text style={styles.settingDesc}>Xóa dữ liệu tạm thời của ứng dụng</Text>
            </View>
            <MaterialIcons name="delete-outline" size={24} color="#F44336" />
          </TouchableOpacity>
        </View>
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
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    marginBottom: 8,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1565C0',
    padding: 16,
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: 14,
    color: '#757575',
  },
  settingValue: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
});

export default AppSettingsScreen;