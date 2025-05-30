import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const PromotionsScreen = ({ navigation, route }) => {
  // Sample promotions data
  const [promotions] = useState([
    {
      id: 1,
      title: 'Giảm 20% phí gửi xe',
      description: 'Áp dụng cho sinh viên năm nhất khi đăng ký gói tháng',
      validUntil: '31/05/2025',
      icon: 'local-offer',
      iconColor: '#1565C0',
      color: '#E3F2FD'
    },
    {
      id: 2,
      title: 'Tặng 50 điểm thưởng',
      description: 'Khi nạp tiền từ 200.000đ trong tháng 4',
      validUntil: '30/04/2025',
      icon: 'card-giftcard',
      iconColor: '#4CAF50',
      color: '#E8F5E9'
    },
    {
      id: 3,
      title: 'Giảm 10% gói học kỳ',
      description: 'Áp dụng cho tất cả sinh viên khi đăng ký gói học kỳ',
      validUntil: '15/04/2025',
      icon: 'loyalty',
      iconColor: '#FF9800',
      color: '#FFF3E0'
    },
    {
      id: 4,
      title: 'Miễn phí đăng ký thẻ',
      description: 'Dành cho 100 sinh viên đăng ký đầu tiên',
      validUntil: '10/04/2025',
      icon: 'credit-card',
      iconColor: '#E91E63',
      color: '#FCE4EC'
    }
  ]);

  const renderPromotionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.promotionCard}
      onPress={() => navigation.navigate('PromotionDetail', { promotion: item })}
    >
      <View style={[styles.promotionHeader, { backgroundColor: item.color }]}>
        <View style={styles.promotionIcon}>
          <MaterialIcons name={item.icon} size={24} color={item.iconColor} />
        </View>
        <Text style={styles.promotionTitle}>{item.title}</Text>
      </View>
      <View style={styles.promotionContent}>
        <Text style={styles.promotionDesc}>{item.description}</Text>
        <View style={styles.promotionFooter}>
          <Text style={styles.validUntil}>Có hiệu lực đến: {item.validUntil}</Text>
          <TouchableOpacity style={styles.useButton}>
            <Text style={styles.useButtonText}>Sử dụng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Khuyến mãi</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={promotions}
        renderItem={renderPromotionItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    padding: 16,
  },
  promotionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  promotionHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promotionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    flex: 1,
  },
  promotionContent: {
    padding: 16,
  },
  promotionDesc: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 16,
    lineHeight: 20,
  },
  promotionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  validUntil: {
    fontSize: 12,
    color: '#757575',
  },
  useButton: {
    backgroundColor: '#1565C0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  useButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default PromotionsScreen;