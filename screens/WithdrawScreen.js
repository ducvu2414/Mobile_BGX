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
import { useSelector } from 'react-redux';


const WithdrawScreen = ({ navigation }) => {
    const user = useSelector(state => state.user);
    const userInfo = user.userData.userData || {
        userCode: '',
        name: '',
        phoneNumber: '',
        email: '',
        gender: true,
        dateOfBirth: '',
        address: '',
        role: '',
        balance: 0
    };
    const [amount, setAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState(null);

    const bankAccounts = [
        {
            id: 1,
            name: 'VietinBank',
            number: '•••• 5678',
            icon: 'credit-card',
            color: '#F44336'
        },
        {
            id: 2,
            name: 'BIDV',
            number: '•••• 9012',
            icon: 'credit-card',
            color: '#1565C0'
        },
        {
            id: 3,
            name: 'Vietcombank',
            number: '•••• 3456',
            icon: 'credit-card',
            color: '#4CAF50'
        }
    ];

    const quickAmounts = [50000, 100000, 200000, 500000];
    const walletBalance = userInfo.balance;


    const handleWithdraw = () => {
        if (!amount || parseInt(amount) < 50000) {
            Alert.alert('Lỗi', 'Vui lòng nhập số tiền tối thiểu 50.000đ');
            return;
        }

        if (parseInt(amount) > walletBalance) {
            Alert.alert('Lỗi', 'Số dư không đủ để thực hiện giao dịch này');
            return;
        }

        if (!selectedMethod) {
            Alert.alert('Lỗi', 'Vui lòng chọn tài khoản nhận tiền');
            return;
        }

        // Xử lý rút tiền
        Alert.alert(
            'Xác nhận',
            `Bạn có chắc muốn rút ${formatCurrency(amount)} về tài khoản ${selectedMethod.name}?`,
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Xác nhận',
                    onPress: () => {
                        // Xử lý giao dịch rút tiền
                        Alert.alert('Thành công', 'Yêu cầu rút tiền đã được gửi đi và đang được xử lý!', [
                            {
                                text: 'OK',
                                onPress: () =>
                                    navigation.navigate(
                                        'PaymentSuccess',
                                        {
                                            amount: parseInt(amount),
                                            description: `Rút tiền về tài khoản ${selectedMethod.name}`,
                                            type: 'withdraw',
                                            paymentMethod: selectedMethod.name,
                                            date: new Date().toISOString()

                                        }
                                    ),
                            },
                        ]);
                    },
                },
            ]
        );
    };

    const formatCurrency = (value) => {
        if (!value) return '0 đ';
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ';
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Rút tiền</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Số dư khả dụng</Text>
                    <Text style={styles.balanceAmount}>{formatCurrency(walletBalance)}</Text>
                </View>

                <View style={styles.amountContainer}>
                    <Text style={styles.label}>Số tiền rút</Text>
                    <TextInput
                        style={styles.amountInput}
                        placeholder="0 đ"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
                    />
                    <Text style={styles.minAmount}>Tối thiểu: 50.000 đ</Text>

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
                    <Text style={styles.label}>Tài khoản nhận tiền</Text>

                    {bankAccounts.map((account) => (
                        <TouchableOpacity
                            key={account.id}
                            style={[
                                styles.methodItem,
                                selectedMethod?.id === account.id && styles.methodItemActive,
                            ]}
                            onPress={() => setSelectedMethod(account)}
                        >
                            <View style={[styles.methodIcon, { backgroundColor: account.color }]}>
                                <MaterialIcons name={account.icon} size={20} color="white" />
                            </View>
                            <View style={styles.methodInfo}>
                                <Text style={styles.methodName}>{account.name}</Text>
                                <Text style={styles.methodNumber}>{account.number}</Text>
                            </View>
                            {selectedMethod?.id === account.id && (
                                <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                            )}
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={styles.addMethodButton}
                        onPress={() => navigation.navigate('AddBankAccount')}
                    >
                        <MaterialIcons name="add" size={20} color="#1565C0" />
                        <Text style={styles.addMethodText}>Thêm tài khoản ngân hàng</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.noteContainer}>
                    <MaterialIcons name="info-outline" size={20} color="#757575" />
                    <Text style={styles.noteText}>
                        Lưu ý: Thời gian xử lý rút tiền có thể mất từ 1-3 ngày làm việc tùy thuộc vào ngân hàng của bạn.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={[
                        styles.withdrawButton,
                        (!amount || !selectedMethod || parseInt(amount) > walletBalance) && styles.withdrawButtonDisabled,
                    ]}
                    onPress={handleWithdraw}
                    disabled={!amount || !selectedMethod || parseInt(amount) > walletBalance}
                >
                    <Text style={styles.withdrawButtonText}>Rút tiền</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    balanceCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
    },
    balanceLabel: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 8,
    },
    balanceAmount: {
        fontSize: 24,
        fontWeight: '700',
        color: '#212121',
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
        marginBottom: 16,
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
    noteContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF8E1',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    noteText: {
        flex: 1,
        fontSize: 12,
        color: '#757575',
        marginLeft: 8,
    },
    bottomContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    withdrawButton: {
        backgroundColor: '#1565C0',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    withdrawButtonDisabled: {
        backgroundColor: '#BDBDBD',
    },
    withdrawButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default WithdrawScreen;