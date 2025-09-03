import { template } from "lodash";
import axios from "../customize/axios";

const handleForgotPwd = (data) => {
  try {
    return axios.post("/api/forgotPassword", data);
  } catch (error) {
    console.error("Error at ForgetPwd at accountServices:", error);
  }
};

const handleSubmitVerifyForgotPwd = (email) => {
  try {
    return axios.post("/api/verifyEmail", email)
  } catch (error) {
    console.log('Error at handleSubmitVerifyForgotPwd at accountServices: ', error);
  }
}

const handleSubmitVerifyCodeForgotPwd = (data) => {
  try {
    return axios.post('/api/submitVerifyCode', data)
  } catch (error) {
    console.log('Error at handleSubmitVerifyCodeForgotPwd at accountServices: ', error);
  }
}

export {
  handleForgotPwd,
  handleSubmitVerifyForgotPwd,
  handleSubmitVerifyCodeForgotPwd
};
