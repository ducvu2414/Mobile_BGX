import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Alert
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import VnPayModal from '../components/VnPayModal';
const TopUpScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState(null);

    const paymentMethods = [
        {
            id: 1,
            type: 'bank',
            name: 'VietinBank',
            number: '•••• 5678',
            icon: 'credit-card',
            color: '#F44336'
        },
        {
            id: 2,
            type: 'bank',
            name: 'BIDV',
            number: '•••• 9012',
            icon: 'credit-card',
            color: '#1565C0'
        },
        {
            id: 3,
            type: 'ewallet',
            name: 'MoMo',
            number: '09xx xxx 789',
            icon: 'account-balance-wallet',
            color: '#E91E63'
        }
    ];

    const quickAmounts = [100000, 200000, 500000, 1000000];
    const [showModal, setShowModal] = useState(false);

    const handleTopUp = () => {
        if (!amount || parseInt(amount) < 10000) {
            Alert.alert('Lỗi', 'Vui lòng nhập số tiền tối thiểu 10.000đ');
            return;
        }

        if (!selectedMethod) {
            Alert.alert('Lỗi', 'Vui lòng chọn phương thức thanh toán');
            return;
        }

        setShowModal(true);
    };


    const formatCurrency = (value) => {
        if (!value) return '0 đ';
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ';
    };

    return (
        <>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Nạp tiền</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.content}>
                    <View style={styles.amountContainer}>
                        <Text style={styles.label}>Số tiền</Text>
                        <TextInput
                            style={styles.amountInput}
                            placeholder="0 đ"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
                        />
                        <Text style={styles.minAmount}>Tối thiểu: 10.000 đ</Text>

                        <View style={styles.quickAmountContainer}>
                            {quickAmounts.map((value) => (
                                <TouchableOpacity
                                    key={value}
                                    style={[
                                        styles.quickAmountButton,
                                        parseInt(amount) === value && styles.quickAmountButtonActive,
                                    ]}
                                    onPress={() => setAmount(value.toString())}
                                >
                                    <Text
                                        style={[
                                            styles.quickAmountText,
                                            parseInt(amount) === value && styles.quickAmountTextActive,
                                        ]}
                                    >
                                        {formatCurrency(value)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.methodContainer}>
                        <Text style={styles.label}>Phương thức thanh toán</Text>

                        {paymentMethods.map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                style={[
                                    styles.methodItem,
                                    selectedMethod?.id === method.id && styles.methodItemActive,
                                ]}
                                onPress={() => setSelectedMethod(method)}
                            >
                                <View style={[styles.methodIcon, { backgroundColor: method.color }]}>
                                    <MaterialIcons name={method.icon} size={20} color="white" />
                                </View>
                                <View style={styles.methodInfo}>
                                    <Text style={styles.methodName}>{method.name}</Text>
                                    <Text style={styles.methodNumber}>{method.number}</Text>
                                </View>
                                {selectedMethod?.id === method.id && (
                                    <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                                )}
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            style={styles.addMethodButton}
                            onPress={() => navigation.navigate('AddPaymentMethod')}
                        >
                            <MaterialIcons name="add" size={20} color="#1565C0" />
                            <Text style={styles.addMethodText}>Thêm phương thức thanh toán</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={[
                            styles.topUpButton,
                            (!amount || !selectedMethod) && styles.topUpButtonDisabled,
                        ]}
                        onPress={handleTopUp}
                        disabled={!amount || !selectedMethod}
                    >
                        <Text style={styles.topUpButtonText}>Nạp tiền</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {selectedMethod && (
                <VnPayModal
                    visible={showModal}
                    orderId={Math.floor(Math.random() * 1000000).toString()}
                    amount={parseInt(amount)}
                    orderInfo={`Nạp tiền từ ${selectedMethod.name}`}
                    onClose={(result) => {
                        setShowModal(false);
                        console.log("Amount: ", amount);
                        if (result?.success) {
                            navigation.navigate('PaymentSuccess', {
                                amount: parseInt(amount),
                                description: `Nạp tiền từ ${selectedMethod.name}`,
                                type: 'topup',
                                paymentMethod: selectedMethod.name,
                                date: new Date().toISOString()
                            });
                        } else {
                            Alert.alert('Thanh toán thất bại', 'Vui lòng thử lại.');
                        }
                    }}
                />
            )}

        </>
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
    amountContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#212121',
        marginBottom: 12,
    },
    amountInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        fontSize: 24,
        fontWeight: '700',
        paddingVertical: 8,
        marginBottom: 8,
    },
    minAmount: {
        fontSize: 12,
        color: '#757575',
        marginBottom: 16,
    },
    quickAmountContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    quickAmountButton: {
        width: '48%',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    quickAmountButtonActive: {
        borderColor: '#1565C0',
        backgroundColor: '#E3F2FD',
    },
    quickAmountText: {
        color: '#616161',
        fontWeight: '500',
    },
    quickAmountTextActive: {
        color: '#1565C0',
    },
    methodContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
    },
    methodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    methodItemActive: {
        backgroundColor: '#F5F5F5',
    },
    methodIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    methodInfo: {
        flex: 1,
    },
    methodName: {
        fontWeight: '500',
        fontSize: 14,
        color: '#212121',
    },
    methodNumber: {
        fontSize: 12,
        color: '#757575',
    },
    addMethodButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        marginTop: 8,
    },
    addMethodText: {
        color: '#1565C0',
        fontWeight: '500',
        marginLeft: 8,
    },
    bottomContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    topUpButton: {
        backgroundColor: '#1565C0',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    topUpButtonDisabled: {
        backgroundColor: '#BDBDBD',
    },
    topUpButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default TopUpScreen;