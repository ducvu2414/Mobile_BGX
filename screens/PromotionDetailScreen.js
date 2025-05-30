import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Share
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const PromotionDetailScreen = ({ navigation, route }) => {
  const { promotion } = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Kiểm tra ưu đãi này trên ứng dụng Quản lý bãi đỗ xe: ${promotion.title} - ${promotion.description}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUsePromotion = () => {
    // Logic to use the promotion
    navigation.navigate('Payment', { 
      promoCode: `PROMO${promotion.id}`,
      discount: promotion.id * 5 // Just for demo
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết khuyến mãi</Text>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.promotionBanner, { backgroundColor: promotion.color }]}>
          <View style={styles.promotionIcon}>
            <MaterialIcons name={promotion.icon} size={40} color={promotion.iconColor} />
          </View>
          <Text style={styles.promotionTitle}>{promotion.title}</Text>
          <Text style={styles.validUntil}>Có hiệu lực đến: {promotion.validUntil}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả</Text>
          <Text style={styles.description}>{promotion.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Điều kiện áp dụng</Text>
          <View style={styles.conditionItem}>
            <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.conditionIcon} />
            <Text style={styles.conditionText}>Áp dụng cho tất cả sinh viên</Text>
          </View>
          <View style={styles.conditionItem}>
            <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.conditionIcon} />
            <Text style={styles.conditionText}>Chỉ áp dụng một lần cho mỗi tài khoản</Text>
          </View>
          <View style={styles.conditionItem}>
            <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.conditionIcon} />
            <Text style={styles.conditionText}>Không áp dụng cùng các khuyến mãi khác</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.useButton} onPress={handleUsePromotion}>
          <Text style={styles.useButtonText}>Sử dụng ngay</Text>
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
  },
  promotionBanner: {
    padding: 24,
    alignItems: 'center',
  },
  promotionIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  promotionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 8,
  },
  validUntil: {
    fontSize: 14,
    color: '#424242',
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 24,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  conditionIcon: {
    marginRight: 8,
  },
  conditionText: {
    fontSize: 14,
    color: '#424242',
    flex: 1,
  },
  useButton: {
    backgroundColor: '#1565C0',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  useButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PromotionDetailScreen;