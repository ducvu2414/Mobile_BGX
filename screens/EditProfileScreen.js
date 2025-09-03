import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, StyleSheet, TouchableOpacity,
  StatusBar, TextInput, ScrollView, Image, Alert
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, updateCurrentUser } from '../services/userServices';
import Toast from 'react-native-toast-message';

const EditProfileScreen = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const userInfo = user.userData.userData || {};

  const [name, setName] = useState(userInfo.name || '');
  const [email, setEmail] = useState(userInfo.email || '');
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber || '');
  const [password, setPassword] = useState('');

  const handleSave = async () => {
    // Validate
    const emailRegex = /^[a-zA-Z0-9._%+-]{5,}@gmail\.com$/;
    const phoneRegex = /^0\d{9}$/;
    const passwordRegex = /^.{7,}$/;
    if (!name.trim() || !email.trim() || !phoneNumber.trim() || !password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin và xác minh bằng mật khẩu');
      Toast.show({
        type: 'error',
        text1: 'Vui lòng nhập đầy đủ thông tin và xác minh bằng mật khẩu',
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ. Vui lòng sử dụng định dạng @gmail.com');
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
      return;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert('Lỗi', 'Mật khẩu cần từ 7-16 ký tự');
      return;
    }

    try {
      const updatedUser = {
        userCode: userInfo.userCode,
        email,
        phoneNumber,
        password,
      };

      const res = await updateCurrentUser(updatedUser);
      if (res && res.EC === 1) {
        
        Alert.alert('Thành công', 'Cập nhật thành công. Bạn sẽ được đăng xuất.', [
          {
            text: 'OK',
            onPress: async () => {
              await logoutUser();
              navigation.replace('Login');
            }
          }
        ]);
      } else {
        Alert.alert('Lỗi', res.EM || 'Cập nhật thất bại');
      }
    } catch (err) {
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi cập nhật');
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chỉnh sửa thông tin</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            {userInfo.avatarUrl ? (
              <Image source={{ uri: userInfo.avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{name?.charAt(0) || 'U'}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={() => Alert.alert('Thông báo', 'Chức năng đang phát triển')}>
            <Text style={styles.changeAvatarText}>Thay đổi ảnh đại diện</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Mã người dùng</Text>
            <TextInput style={[styles.input, styles.disabledInput]} value={userInfo.userCode} editable={false} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Họ và tên</Text>
            <TextInput style={[styles.input, styles.disabledInput]} value={name} editable={false} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Giới tính</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={userInfo.gender === true || userInfo.gender === 'Nam' ? 'Nam' : 'Nữ'}
              editable={false}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Ngày sinh</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={formatDate(userInfo.dateOfBirth)}
              editable={false}
            />
          </View>


          <View style={styles.formGroup}>
            <Text style={styles.label}>Địa chỉ</Text>
            <TextInput style={[styles.input, styles.disabledInput]} value={userInfo.address} editable={false} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Chức vụ</Text>
            <TextInput style={[styles.input, styles.disabledInput]} value={userInfo.role} editable={false} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nhập mật khẩu để xác minh</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Nhập password để xác minh"
              secureTextEntry
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1565C0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  changeAvatarButton: {
    padding: 8,
  },
  changeAvatarText: {
    color: '#1565C0',
    fontSize: 16,
    fontWeight: '500',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
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
    color: '#212121',
  },
  disabledInput: {
    backgroundColor: '#F5F5F5',
    color: '#9E9E9E',
  },
  helperText: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 4,
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfileScreen;