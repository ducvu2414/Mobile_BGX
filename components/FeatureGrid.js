import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const FeatureGrid = ({ onFeaturePress }) => {
  const features = [
    {
      id: 'membership',
      icon: 'card-membership',
      label: 'Gói thành viên',
      color: '#E3F2FD',
      iconColor: '#1565C0',
      iconType: 'MaterialIcons'
    },
    {
      id: 'parking-history',
      icon: 'history',
      label: 'Lịch sử ra vào',
      color: '#FBE9E7',
      iconColor: '#D32F2F',
      iconType: 'MaterialIcons'
    },
    {
      id: 'wallet',
      icon: 'account-balance-wallet',
      label: 'Ví',
      color: '#EDE7F6',
      iconColor: '#673AB7',
      iconType: 'MaterialIcons'
    },
    {
      id: 'support',
      icon: 'support-agent',
      label: 'Hỗ trợ',
      color: '#E0F7FA',
      iconColor: '#00ACC1',
      iconType: 'MaterialIcons'
    }
  ];

  const renderIcon = (feature) => {
    if (feature.iconType === 'MaterialIcons') {
      return <MaterialIcons name={feature.icon} size={24} color={feature.iconColor} />;
    } else if (feature.iconType === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={feature.icon} size={24} color={feature.iconColor} />;
    }
    return null;
  };

  const handleFeaturePress = (featureId) => {
    if (onFeaturePress) {
      onFeaturePress(featureId);
    }
  };

  return (
    <View style={styles.featuresContainer}>
      <Text style={styles.sectionTitle}>Dịch vụ</Text>
      <View style={styles.featuresGrid}>
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={styles.featureItem}
            onPress={() => handleFeaturePress(feature.id)}
          >
            <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
              {renderIcon(feature)}
            </View>
            <Text style={styles.featureLabel}>{feature.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  featuresContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '19%',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#424242',
  },
});

export default FeatureGrid;