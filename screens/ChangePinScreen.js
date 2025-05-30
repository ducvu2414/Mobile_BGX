import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChangePinScreen = ({ navigation }) => {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step === 1) {
      // Validate current PIN
      if (currentPin.length !== 6) {
        Alert.alert('Lỗi', 'Mã PIN phải có 6 chữ số');
        return;
      }
      
      // In a real app, you would verify the current PIN with the server
      // For this demo, we'll just move to the next step
      setStep(2);
    } else if (step === 2) {
      // Validate new PIN
      if (newPin.length !== 6) {
        Alert.alert('Lỗi', 'Mã PIN mới phải có 6 chữ số');
        return;
      }
      
      setStep(3);
    } else {
      // Validate confirm PIN
      if (confirmPin.length !== 6) {
        Alert.alert('Lỗi', 'Mã PIN xác nhận phải có 6 chữ số');
        return;
      }
      
      if (newPin !== confirmPin) {
        Alert.alert('Lỗi', 'Mã PIN xác nhận không khớp với mã PIN mới');
        return;
      }
      
      // Process PIN change
      Alert.alert(
        'Thành công',
        'Mã PIN của bạn đã được thay đổi thành công',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  const renderPinInput = () => {
    let value = '';
    let setter = null;
    let placeholder = '';
    
    if (step === 1) {
      value = currentPin;
      setter = setCurrentPin;
      placeholder = 'Nhập mã PIN hiện tại';
    } else if (step === 2) {
      value = newPin;
      setter = setNewPin;
      placeholder = 'Nhập mã PIN mới';
    } else {
      value = confirmPin;
      setter = setConfirmPin;
      placeholder = 'Xác nhận mã PIN mới';
    }
    
    return (
      <TextInput
        style={styles.pinInput}
        placeholder={placeholder}
        keyboardType="numeric"
        secureTextEntry
        maxLength={6}
        value={value}
        onChangeText={(text) => {
          // Only allow numbers
          if (/^\d*$/.test(text)) {
            setter(text);
          }
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đổi mã PIN</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.stepIndicator}>
          <View style={[styles.stepDot, step >= 1 && styles.stepDotActive]} />
          <View style={styles.stepLine} />
          <View style={[styles.stepDot, step >= 2 && styles.stepDotActive]} />
          <View style={styles.stepLine} />
          <View style={[styles.stepDot, step >= 3 && styles.stepDotActive]} />
        </View>
        
        <Text style={styles.stepTitle}>
          {step === 1 ? 'Nhập mã PIN hiện tại' : 
           step === 2 ? 'Tạo mã PIN mới' : 
           'Xác nhận mã PIN mới'}
        </Text>
        
        <Text style={styles.stepDescription}>
          {step === 1 ? 'Vui lòng nhập mã PIN hiện tại của bạn' : 
           step === 2 ? 'Tạo mã PIN mới gồm 6 chữ số' : 
           'Nhập lại mã PIN mới để xác nhận'}
        </Text>
        
        {renderPinInput()}
        
        <View style={styles.pinHint}>
          <Text style={styles.pinHintText}>
            Mã PIN phải có 6 chữ số và không được trùng với mã PIN cũ
          </Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            ((step === 1 && currentPin.length !== 6) ||
             (step === 2 && newPin.length !== 6) ||
             (step === 3 && confirmPin.length !== 6)) && styles.nextButtonDisabled,
          ]}
          onPress={handleNextStep}
          disabled={
            (step === 1 && currentPin.length !== 6) ||
            (step === 2 && newPin.length !== 6) ||
            (step === 3 && confirmPin.length !== 6)
          }
        >
          <Text style={styles.nextButtonText}>
            {step === 3 ? 'Hoàn tất' : 'Tiếp tục'}
          </Text>
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
    padding: 24,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  stepDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  stepDotActive: {
    backgroundColor: '#1565C0',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 32,
  },
  pinInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 8,
  },
  pinHint: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
  },
  pinHintText: {
    fontSize: 12,
    color: '#1565C0',
    textAlign: 'center',
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  nextButton: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ChangePinScreen;