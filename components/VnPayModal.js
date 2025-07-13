import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Feather } from '@expo/vector-icons';
// import axios from "../customize/axiosVNPAY";
import axios from 'axios';
import { PAYMENT_URL } from '@env';

const RETURN_URL = `${PAYMENT_URL}/order/vnpay_return`;

const VnPayModal = ({ visible, orderId, amount, orderInfo, onClose }) => {
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const queryParams = new URLSearchParams({
        amount: amount,
        bankCode: "NCB",
        language: "vn",
        platform: "mobile"
    });
    const baseURL = `${PAYMENT_URL}/order/create_payment_url`;
    useEffect(() => {
        if (!visible) return;

        setLoading(true);
        axios.get(`${baseURL}?${queryParams.toString()}`)
            .then(res => {
                console.log('res:', res.data?.data?.vnpUrl);
                const url = res.data?.data?.vnpUrl;
                console.log('Payment URL:', url);

                setPaymentUrl(url);
            }).catch(err => {
                onClose({ success: false, message: err.message });
            }).finally(() => setLoading(false));
    }, [visible]);

    const onMessage = (event) => {
        const data = JSON.parse(event.nativeEvent.data);
        onClose(data);
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.header}>
                <TouchableOpacity onPress={() => onClose({ success: false })}>
                    <Feather name="x" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Thanh toán VNPAY</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" style={{ flex: 1 }} />
            ) : (
                paymentUrl && (
                    <WebView
                        source={{ uri: paymentUrl }}
                        onMessage={onMessage}
                        startInLoadingState
                    />
                )
            )}
        </Modal>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 56,
        backgroundColor: '#f7f7f7',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default VnPayModal;
