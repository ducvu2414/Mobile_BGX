import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const PaymentMethodDetailScreen = ({ route, navigation }) => {
  const { method } = route.params;
  const [isDefault, setIsDefault] = useState(method.id === 1);

  const handleRemove = () => {
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc muốn xóa phương thức thanh toán ${method.name}?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            // Xử lý xóa phương thức thanh toán
            Alert.alert('Thành công', 'Đã xóa phương thức thanh toán', [
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

  const handleSetDefault = () => {
    if (!isDefault) {
      setIsDefault(true);
      Alert.alert('Thành công', `Đã đặt ${method.name} làm phương thức thanh toán mặc định`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết phương thức</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.methodCard}>
          <View style={[styles.methodIcon, { backgroundColor: method.color }]}>
            <MaterialIcons name={method.icon} size={30} color="white" />
          </View>
          <Text style={styles.methodName}>{method.name}</Text>
          <Text style={styles.methodNumber}>{method.number}</Text>
          {isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>Mặc định</Text>
            </View>
          )}
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Thông tin chi tiết</Text>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Loại</Text>
            <Text style={styles.detailValue}>
              {method.type === 'bank' ? 'Tài khoản ngân hàng' : 'Ví điện tử'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Tên</Text>
            <Text style={styles.detailValue}>{method.name}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Số tài khoản</Text>
            <Text style={styles.detailValue}>{method.number}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Ngày thêm</Text>
            <Text style={styles.detailValue}>01/01/2025</Text>
          </View>
        </View>

        <View style={styles.actionsCard}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleSetDefault}
            disabled={isDefault}
          >
            <MaterialIcons 
              name="star" 
              size={24} 
              color={isDefault ? "#BDBDBD" : "#1565C0"} 
            />
            <Text 
              style={[
                styles.actionText, 
                isDefault && { color: '#BDBDBD' }
              ]}
            >
              Đặt làm mặc định
            </Text>
          </TouchableOpacity>

          <View style={styles.actionDivider} />

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('EditPaymentMethod', { method })}>
            <MaterialIcons name="edit" size={24} color="#1565C0" />
            <Text style={styles.actionText}>Chỉnh sửa</Text>
          </TouchableOpacity>

          <View style={styles.actionDivider} />

          <TouchableOpacity style={styles.actionButton} onPress={handleRemove}>
            <MaterialIcons name="delete-outline" size={24} color="#F44336" />
            <Text style={[styles.actionText, { color: '#F44336' }]}>Xóa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.securityNote}>
          <MaterialIcons name="security" size={20} color="#757575" />
          <Text style={styles.securityNoteText}>
            Thông tin thanh toán của bạn được mã hóa và bảo mật theo tiêu chuẩn ngành.
          </Text>
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
    padding: 16,
  },
  methodCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  methodIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  methodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  methodNumber: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 8,
  },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 8,
  },
  defaultBadgeText: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 12,
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
  },
  actionsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionText: {
    fontSize: 16,
    color: '#212121',
    marginLeft: 16,
  },
  actionDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
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
});

export default PaymentMethodDetailScreen;