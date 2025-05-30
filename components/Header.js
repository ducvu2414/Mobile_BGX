import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const Header = ({ studentInfo = {}, onRegisterParking }) => {
  const name = studentInfo?.name || 'User';
  const id = studentInfo?.id || '';
  const className = studentInfo?.class || '';
  const hasParking = studentInfo?.hasParking || false;

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.greeting}>Xin chào, {name}</Text>
            <Text style={styles.subGreeting}>{id} • {className}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Student Parking Status */}
      <TouchableOpacity
        style={styles.studentParkingContainer}
        onPress={hasParking ? null : onRegisterParking}
      >
        <View style={styles.parkingIconContainer}>
          <FontAwesome5 name="id-card" size={16} color="white" />
        </View>
        <View style={styles.parkingInfo}>
          <Text style={styles.parkingTitle}>
            {hasParking
              ? "Đã đăng ký đỗ xe: 29H1-12345"
              : "Bạn chưa đăng ký đỗ xe máy"}
          </Text>
          {hasParking && (
            <Text style={styles.parkingSubtitle}>Bãi B - Thư viện</Text>
          )}
        </View>
        {!hasParking && (
          <Text style={styles.registerText}>Đăng ký</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1565C0',
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#64B5F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  greeting: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  subGreeting: {
    color: '#BBDEFB',
    fontSize: 12,
    marginTop: 2,
  },
  studentParkingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
    padding: 10,
  },
  parkingIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  parkingInfo: {
    flex: 1,
  },
  parkingTitle: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  parkingSubtitle: {
    color: '#BBDEFB',
    fontSize: 12,
  },
  registerText: {
    color: '#BBDEFB',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default Header;