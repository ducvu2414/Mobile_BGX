import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import {
  transferMoney,
  checkAccountExist,
  checkPassword,
} from "../services/userServices";
import { Modal } from 'react-native';

const TransferScreen = ({ navigation, route }) => {
  const user = useSelector(state => state.user);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");

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
  const walletBalance = userInfo.balance;

  const [description, setDescription] = useState(`${userInfo.name} chuyển tiền`);

  const formatCurrency = (value) => {
    if (!value) return '0 đ';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ';
  };

  const handleTransfer = () => {
    console.log("Người gửi:", user?.userData?.userData?.userCode);
    console.log("Chuyển tiền đến:", recipientId);
    console.log("Mô tả:", description);

    // Kiểm tra xem người nhận có tồn tại không
    if (!recipientId || recipientId.trim() === "") {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng nhập mã tài khoản người nhận.',
      });
      return;
    }
    if (recipientId.trim() === user?.userData?.userData?.userCode.trim()) {

      Toast.show({
        type: 'error',
        text1: 'Không thể chuyển tiền cho chính mình.',
      });
      return;
    }

    const parsedAmount = parseInt(amount);

    // Kiểm tra số tiền hợp lệ
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Số tiền phải là số hợp lệ và lớn hơn 0.',
      });
      return;
    }

    // Kiểm tra số dư
    if (parsedAmount > user?.userData?.userData?.balance) {
      Toast.show({
        type: 'error',
        text1: 'Số dư tài khoản không đủ để thực hiện giao dịch này.',
      });
      return;
    }

    if (description.trim() === "") {
      setDescription(`${userInfo.name} chuyển tiền`);
    }

    checkAccountExist(recipientId)
      .then((response) => {
        console.log("Kết quả kiểm tra tài khoản:", response);

        const { EC, EM, DT } = response || {};

        if (EC !== 1 || DT !== true) {
          Toast.show({
            type: 'error',
            text1: EM || "Tài khoản người nhận không tồn tại.",
          });
          return;
        }

        // Nếu tài khoản tồn tại thì xử lý tiếp
        // processTransfer(parsedAmount);
        setAmount(parsedAmount);
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Lỗi khi kiểm tra tài khoản:", error);
        Toast.show({
          type: 'error',
          text1: 'Đã xảy ra lỗi khi kiểm tra tài khoản người nhận.',
        });
      });
  };

  const processTransfer = (parsedAmount, password) => {
    const senderId = user?.userData?.userData?.userCode;
    console.log("account", senderId);
    console.log("password", password);
    console.log("parsedAmount", parsedAmount);

    checkPassword({ userCode: senderId, password: password })
      .then((response) => {
        console.log("Kết quả kiểm tra mật khẩu:", response);
        const { EC, EM } = response || {};

        if (EC !== 1) {
          Toast.show({
            type: 'error',
            text1: EM || "Mật khẩu không đúng.",
          });
          return;
        }

        // Nếu mật khẩu đúng thì tiếp tục chuyển tiền
        const data = {
          senderEwalletId: senderId,
          receiverEwalletId: recipientId,
          amount: parsedAmount,
          description: description,
          password: password,
        };

        transferMoney(data)
          .then((response) => {
            const { EM, EC } = response;

            if (EC === 1) {
              Toast.show({
                type: 'success',
                text1: "Chuyển tiền thành công!",
              });

              const notifications = [
                {
                  userId: recipientId, // Người nhận
                  title: "Bạn đã nhận được tiền!",
                  message: `Bạn vừa nhận được ${parsedAmount} từ người dùng ${senderId}`,
                  type: "transfer",
                },
                {
                  userId: senderId, // Người gửi
                  title: "Chuyển tiền thành công",
                  message: `Bạn đã chuyển ${parsedAmount} đến người dùng ${recipientId}`,
                  type: "transfer",
                },
              ];

              // Gửi tất cả thông báo song song
              Promise.all(
                notifications.map((noti) =>
                  fetch("http://localhost:3001/api/notifications", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(noti),
                  })
                    .then((res) => {
                      if (!res.ok)
                        throw new Error("Network response was not ok");
                      return res.json();
                    })
                    .then((data) => {
                      console.log("✅ Notification sent:", data);
                    })
                    .catch((error) => {
                      console.error("❌ Error sending notification:", error);
                    })
                )
              ).finally(() => {
                navigation.navigate('TransferSuccess', {
                  amount: parsedAmount,
                  recipientId: recipientId,
                  description: description,
                  date: new Date().toISOString(),
                });
              });
            } else {
              Toast.show({
                type: 'error',
                text1: "Chuyển tiền thất bại: " + EM,
              });
            }
          })

          .catch((error) => {
            console.error("Lỗi khi chuyển tiền:", error);
            Toast.show({
              type: 'error',
              text1: 'Đã xảy ra lỗi khi chuyển tiền.',
            });
          });
      })
      .catch((error) => {
        console.error("Lỗi khi kiểm tra mật khẩu:", error);
        Toast.show({
          type: 'error',
          text1: 'Đã xảy ra lỗi khi kiểm tra mật khẩu.',
        });
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chuyển tiền</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.balanceCard}>
          <FontAwesome5 name="wallet" size={24} color="#1565C0" />
          <Text style={styles.balanceLabel}>Số dư khả dụng</Text>
          <Text style={styles.balanceAmount}>{formatCurrency(walletBalance)}</Text>
        </View>


        {/* Mã tài khoản người nhận */}
        <View style={styles.amountContainer}>
          <Text style={styles.label}>Mã tài khoản người nhận</Text>
          <TextInput
            style={styles.amountInput}
            value={recipientId}
            onChangeText={setRecipientId}
            placeholder="0"
          />
        </View>

        {/* Số tiền chuyển */}
        <View style={styles.amountContainer}>
          <Text style={styles.label}>Số tiền chuyển</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0"
          />
        </View>

        {/* Nội dung chuyển tiền */}
        <View style={styles.noteContainer}>
          <Text style={styles.label}>Nội dung chuyển tiền</Text>
          <TextInput
            style={styles.noteInput}
            value={description}
            onChangeText={setDescription}
            placeholder="Nội dung chuyển tiền"
          />
        </View>

        {/* Xác nhận chuyển tiền sẽ có modal hiện lên*/}
        <TouchableOpacity style={styles.confirmButton} onPress={() => handleTransfer()}>
          <Text style={styles.confirmButtonText}>Xác nhận chuyển tiền</Text>
        </TouchableOpacity>


      </ScrollView>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Xác nhận mật khẩu</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  processTransfer(parseInt(amount), password);
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  noteContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 12,
  },
  amountInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#1565C0',
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 8,
    color: '#212121',
  },

  noteInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#212121',
    height: 100,
    textAlignVertical: 'top',
  },
  paymentTypeContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  typeItemActive: {
    backgroundColor: '#F5F5F5',
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  typeInfo: {
    flex: 1,
  },
  typeName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#212121',
  },
  typeDesc: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  paymentMethodContainer: {
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#212121',
  },
  methodDetails: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  addMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  addMethodText: {
    marginLeft: 8,
    color: '#1565C0',
    fontWeight: '500',
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  paymentButton: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  paymentButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  paymentButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  // Styles for package selection
  packageContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  packageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  packageItemActive: {
    backgroundColor: '#F5F5F5',
  },
  packageInfo: {
    flex: 1,
  },
  packageName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#212121',
  },
  packageDesc: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  packagePrice: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1565C0',
    marginRight: 12,
  },

  confirmButton: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 30,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#1565C0',
    marginHorizontal: 4,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
  },

  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
  },

});

export default TransferScreen;