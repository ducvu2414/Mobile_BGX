import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../customize/axios'
import { getUserAccount, updateUserBalance } from '../../services/userServices'

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    token: "",
    account: {}, //data cua user,
    userData: {}
}

export const fetchUserAccount = createAsyncThunk(
    'user/fetchUserAccount',
    async (_, { rejectWithValue }) => {
        try {
            let response = await getUserAccount()
            // console.log('response: ', response.EC);
            if (response && response.EC === 1) {
                let groupWithRoles = response.DT.groupWithRoles
                let userData = response.DT
                let token = response.DT.access_token
                let data = {
                    isAuthenticated: true,
                    token: token,
                    account: { groupWithRoles },
                    userData: userData,
                    isLoading: false
                }
                // console.log('userData in server: ', userData);
                // console.log('data in context: ', data);
                return data
            }
            else {   //ko co nguoi dung
                return rejectWithValue({ isAuthenticated: false, isLoading: false });
            }
        } catch (error) {
            return rejectWithValue({ isAuthenticated: false, isLoading: false });
        }
    }
)

export const updateBalance = createAsyncThunk(
    'user/updateBalance',
    async ({ ewalletId, amount }, { rejectWithValue }) => {
        try {
            console.log('data: ', ewalletId, amount);

            const response = await updateUserBalance(ewalletId, amount);
            if (response && response.EC === 1) {
                console.log('res: ', response);

                return response.DT;  // Trả về dữ liệu user mới sau khi cập nhật balance
            } else {
                return rejectWithValue('Không thể cập nhật số dư');
            }
        } catch (error) {
            return rejectWithValue('Lỗi khi cập nhật số dư');
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true
            state.token = action.payload.token
            state.account = action.payload.account
            state.userData = action.payload
            state.isLoading = false
        },
        logout: (state) => {
            return initialState; // Reset state về mặc định khi logout
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAccount.pending, (state, action) => {
                state.isLoading = true
                state.isAuthenticated = false
            })
            .addCase(fetchUserAccount.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload.isAuthenticated
                state.token = action.payload.token
                state.account = action.payload.account
                state.userData = action.payload.userData
                state.isLoading = false
            })
            .addCase(fetchUserAccount.rejected, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
            })
            //cap nhat so du
            .addCase(updateBalance.fulfilled, (state, action) => {
                const amount = action.meta.arg.amount; // lấy amount từ input của thunk
                console.log('log add from .addCase: ', amount);

                if (typeof state.userData.userData.balance === 'number') {
                    state.userData.userData.balance += parseInt(amount); // cộng thêm số tiền vừa nạp
                } else {
                    state.userData.userData.balance = parseInt(amount); // nếu chưa có thì gán luôn
                }
            })
            .addCase(updateBalance.rejected, (state, action) => {
                console.error(action.payload);
            })
    }
})
export const { login, logout } = userSlice.actions
export default userSlice.reducer