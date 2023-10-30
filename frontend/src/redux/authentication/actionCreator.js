import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useState } from "react";
import CryptoJS from 'crypto-js';
import actions from './actions';

let userName = '';
let Password = '';
let Profile = '';

const { loginBegin, loginSuccess, loginErr, logoutSuccess, logoutErr } = actions;

const decryptedData = (Base64CBC) => {
  const iv = CryptoJS.enc.Utf8.parse('}w&{^[fNE>SYq[w8');
  const key = CryptoJS.enc.Utf8.parse('LfX>8bxAtMz[$_iB');
  let decrypted = CryptoJS.AES.decrypt(Base64CBC, key, { iv: iv, mode: CryptoJS.mode.CBC });
  decrypted = decrypted.toString(CryptoJS.enc.Utf8);
  console.log('decrypted-------', decrypted);
  localStorage.setItem('accessToken', decrypted);
};

const login = (username, password) => {
  userName = username;
  Password = password;
  console.log('user', username, 'password', password);
  return async (dispatch) => {
    try {
      dispatch(loginBegin());
      axios
        .post('https://cedgetestnew.rhythm.works/api/web/auth/code/', {
          username: username,
          password: password,
        })
        .then((res) => {
          console.log('ress---', res);
          Profile = res.data.profile;
          if (res.data.length === 0) {
            alert('username not registered');
            dispatch(loginErr());
          } else if (res.status === 200) {
            // dispatch(verifyOTP(true))
            console.log('okaayyyyy');
          } else {
            alert('wrong password');
            dispatch(loginErr());
          }
        })
        .catch((err) => {
          if (err) {
            alert('User not found');
          }
        });
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const verifyOtp = (OTP) => {
  console.log('OTP----', OTP);
  return async (dispatch) => {
    try {
      axios
        .post('https://cedgetestnew.rhythm.works/api/web/auth/login/', {
          username: userName,
          password: Password,
          profile: Profile,
          otp: OTP,
        })
        .then((res) => {
          console.log('res-', res);

          dispatch(loginSuccess(true));
          // access_token
          // localStorage.setItem("accessToken",res.data.access_token)
          decryptedData(res.data.access_token);
        });
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const logOut = () => {
  return async (dispatch) => {
    try {
      // dispatch(logoutBegin());
      // Cookies.remove('logedIn');
      const access = localStorage.getItem('accessToken');
      const refresh = localStorage.getItem('refreshToken');
      const accessToken = `Bearer ${access}`;
      axios
        .post('https://6180-2405-201-1012-20fa-efec-6ed8-7108-a330.ngrok-free.app/api/web/logout_user/', {
          access_token: accessToken,
          refresh_token: refresh,
        })
        .then((res) => {
          console.log('ress---', res);

          if (res.data.length === 0) {
            alert('user_number not registered');
            dispatch(loginErr());
          } else if (res.status === 200) {
            dispatch(loginSuccess(true));
          } else {
            alert('wrong password');
            dispatch(loginErr());
          }
        })
        .catch((err) => {
          if (err) {
            alert('User not found');
          }
        });

      dispatch(logoutSuccess(null));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut, verifyOtp };
