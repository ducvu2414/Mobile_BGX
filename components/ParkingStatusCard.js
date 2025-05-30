import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ParkingStatusCard = ({ studentInfo, onRegister }) => {
  return (
    <View style={styles.statusCard}>
      <View style={styles.statusHeader}>
        <FontAwesome5 name="motorcycle" size={18} color="#1565C0" />
        <Text style={styles.statusTitle}>Trạng thái đỗ xe:</Text>
      </View>
      {studentInfo.hasParking ? (
        <View>
          <Text style={styles.statusText}>
            Bạn đã đăng ký đỗ xe máy thành công
          </Text>
          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>Biển số xe:</Text>
            <Text style={styles.statusValue}>29H1-12345</Text>
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>Khu vực:</Text>
            <Text style={styles.statusValue}>Bãi B - Thư viện</Text>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.statusText}>Bạn chưa đăng ký đỗ xe máy</Text>
          <TouchableOpacity 
            style={styles.registerBtn}
            onPress={onRegister}
          >
            <Text style={styles.registerBtnText}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statusCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginTop: 0,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusTitle: {
    marginLeft: 8,
    fontWeight: '600',
    color: '#212121',
    fontSize: 15,
  },
  statusText: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 12,
  },
  statusInfo: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  statusLabel: {
    fontSize: 13,
    color: '#757575',
    width: 80,
  },
  statusValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#212121',
  },
  registerBtn: {
    backgroundColor: '#1565C0',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  registerBtnText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default ParkingStatusCard;