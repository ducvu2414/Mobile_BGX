// import axios from "axios"
import axios from "../customize/axios"

const loginUser = (valueLogin, password, typeLogin) => {
    try {
        return axios.post("/api/login", { valueLogin, password, typeLogin })
    } catch (error) {
        console.log('Error at loginUser in userServices: ', error)
    }
}

const loginEmployee = (valueLogin, password, typeLogin) => {
    try {
        return axios.post("/api/emp/login", { valueLogin, password, typeLogin })
    } catch (error) {
        console.log('Error at loginUser in userServices: ', error)
    }
}

const getDataUser = (user) => {
    try {
        return axios.get("/api/user/infomation", { user })
    } catch (error) {
        console.log('Error at getDataUser in userServices: ', error)
    }
}

const updateCurrentUser = (userData) => {
    try {
        return axios.put('/api/user/updateInfo', { userData })
    } catch (error) {
        console.log('Error at updateCurrentUser in userServices: ', error)
    }
}

const updatePasswordUser = (data) => {
    try {
        return axios.put('/api/user/updatePassword', { data })
    } catch (error) {
        console.log('Error at updatePasswordUser: ', error);
    }
}

const logoutUser = () => {
    try {
        return axios.post('/api/logout')
    } catch (error) {
        console.log('Error at logoutUser in userServices: ', error);
    }
}

const getUserAccount = () => {
    try {
        return axios.get(`/api/account`)
    } catch (error) {
        console.log('Error at getUserAccount in userService: ', error)
    }
}

const findTicketInPeriodOfTime = (data) => {
    try {
        return axios.post(`/api/user/findTicketInPeriodOfTime`, { data })
    } catch (error) {
        console.log('Error at findTicketInPeriodOfTime: ', error);
    }
}

const getAllParkingLots = () => {
    try {
        return axios.get('/api/user/getAllParkingLots')
    } catch (error) {
        console.log('Error at getAllParkingLots at userServices: ', error);
    }
}

const getAllTicketUser = (data) => {
    try {
        // console.log('data in axios srvec: ', data);
        let userCode = data.userData.userData.userCode
        let userId = data.userData.userData.userId
        return axios.get('/api/user/getAllTicketUser/', {
            params: { userCode, userId },
        });
    } catch (error) {
        console.log('Error at getAllTicketUser at userServices: ', error);
    }
}

const updateUserBalance = (userEwalletId, amount) => {
    try {
        console.log('data EwalletId: ', userEwalletId);
        console.log('data balance: ', amount);
        return axios.put('/api/user/updateUserBalance', { userEwalletId, amount });
    } catch (error) {
        console.log('Error at updateUserBalance in userServices: ', error);
    }
}

// Chuyển tiền
const transferMoney = (data) => {
    try {
        return axios.post("/api/user/transferEwalletUser", { data });
    } catch (error) {
        console.log("Error at transferMoney in userServices: ", error);
    }
};

// Check tài khoản có tồn tại hay không
const checkAccountExist = (account) => {
    console.log("account in checkAccountExist: ", account);
    try {
        return axios.post("/api/user/checkAccountExist", { account });
    } catch (error) {
        console.log("Error at checkAccountExist in userServices: ", error);
    }
};

// Check mật khẩu có đúng hay không
const checkPassword = (password) => {
    try {
        return axios.post("/api/user/checkPassword", { password });
    } catch (error) {
        console.log("Error at checkPassword in userServices: ", error);
    }
};

export {
    loginUser,
    loginEmployee,
    logoutUser,
    getDataUser,
    updateCurrentUser,
    getUserAccount,
    updatePasswordUser,
    findTicketInPeriodOfTime,
    getAllParkingLots,
    getAllTicketUser,
    updateUserBalance,
    transferMoney,
    checkAccountExist,
    checkPassword,
}