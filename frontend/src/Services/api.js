import axios from "axios";
import Global from "./Global";

const instance = axios.create({
  baseURL: Global.baseURL,
});

export default {
  getReports: (token) =>
    instance({
      method: "GET",
      url: "reports/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }),
  getUserDetails: (token) =>
  instance({
    method: 'GET',
    url: 'get_user_data',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }),
  getLeftPanelData: (token,user_id,role_id) =>
    instance({
      method: "GET",
      url: "get_left_panel_data/",
      params: {
        user_id:user_id,
        role_id:role_id,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }),
  reportsData: (token, bank_id, branch_id) =>
    instance({
      method: "POST",
      url: "reports_data/",
      data: {
        report_type: "Loan Summary",
        bank_id: bank_id ? bank_id : 0,
        branch_id: branch_id ? branch_id : 0,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
    reportdeData: (token, bank_id, branch_id) =>
    instance({
      method: "POST",
      url: "reports_data/",
      data: {
        report_type: "Deposit Summary",
        bank_id: bank_id ? bank_id : 0,
        branch_id: branch_id ? branch_id : 0,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
    
    cropData: (token, bank_id, branch_id) =>
    instance({
      method: "POST",
      url: "reports_data/",
      data: {
        report_type: "KCC-Kharif",
        bank_id: bank_id ? bank_id : 0,
        branch_id: branch_id ? branch_id : 0,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
    cropDatak: (token, bank_id, branch_id) =>
    instance({
      method: "POST",
      url: "reports_data/",
      data: {
        report_type: "KCC-Rabi",
        bank_id: bank_id ? bank_id : 0,
        branch_id: branch_id ? branch_id : 0,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
    creditData: (token, bank_id, branch_id) =>
    instance({
      method: "POST",
      url: "reports_data/",
      data: {
        report_type: "CashCreditFertilizer",
        bank_id: bank_id ? bank_id : 0,
        branch_id: branch_id ? branch_id : 0,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
    cashinatmData: (token, bank_id, branch_id) =>
    instance({
      method: "POST",
      url: "reports_data/",
      data: {
        report_type: "Cash In ATM",
        bank_id: bank_id ? bank_id : 0,
        branch_id: branch_id ? branch_id : 0,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
    cashinhandData: (token, bank_id, branch_id) =>
    instance({
      method: "POST",
      url: "reports_data/",
      data: {
        report_type: "Cash In Hand",
        bank_id: bank_id ? bank_id : 0,
        branch_id: branch_id ? branch_id : 0,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
    dccbData: (token, bank_id, branch_id) =>
    instance({
      method: "POST",
      url: "reports_data/",
      data: {
        report_type: "DCCB Wise FD",
        bank_id: bank_id ? bank_id : 0,
        branch_id: branch_id ? branch_id : 0,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
    caData: (token, bank_id, branch_id) =>
    instance({
      method: "POST",
      url: "reports_data/",
      data: {
        report_type: "CA With Other Banks",
        bank_id: bank_id ? bank_id : 0,
        branch_id: branch_id ? branch_id : 0,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
    obankData: (token, bank_id, branch_id) =>
    instance({
      method: "POST",
      url: "reports_data/",
      data: {
        report_type: "OtherBankTermDeposit",
        bank_id: bank_id ? bank_id : 0,
        branch_id: branch_id ? branch_id : 0,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  reportsDataD: (token, bank_id, branch_id) =>
    instance({
      method: "POST",
      url: "reports_data/",
      data: {
        report_type: "Top 20 Deposits",
        bank_id: bank_id ? bank_id : 0,
        branch_id: branch_id ? branch_id : 0,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  getDistrictList: (token) =>
    instance({
      method: "GET",
      url: "district/",
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
    getbank: (token, bank_id,branch_id) =>
      instance({
        method: "POST",
        url: "reports_data/",
        params: {
          report_type: "CA With Other Banks",
    bank_id: bank_id,
    branch_id: branch_id
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
  getBankList: (token, district_id) =>
    instance({
      method: "GET",
      url: "branch_list/",
      params: {
        district_id: district_id,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  //   getLoanhistory: (token, report_type,bank_id,branch_id) =>
  //   instance({
  //     method: "POST",
  //     url: "reports_data/",
  //     params: {
  //       report_type: report_type,
  // bank_id: bank_id,
  // branch_id: branch_id
  //     },
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   }),
  getBranchList: (token, district_id, bank_id) =>
    instance({
      method: "GET",
      url: "branch_list/",
      params: {
        district_id: district_id,
        bank_id: bank_id,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  dowloadData: (token, data) =>
    instance({
      method: "POST",
      url: "download/",
      data: data,
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
    tenant: (token) =>
 instance({
 method: "GET",
 url: "tenant/",
 headers: {
 Authorization: "Bearer " + token,
 },
 }),
 tenantPost:(token,data) =>
 instance({
 method:"POST",
 url:"tenant/",
 data: data,
 headers: {
 Authorization: "Bearer " + token,
 },
 }),
 tenantHierarchy:(token)=>
 instance({
 method:"GET",
 url:"tenant_hierarchy_define/",
 headers: {
 Authorization: "Bearer " + token,
 },
 }),
 fileStructure:(token)=>
 instance({
 method:"GET",
 url:"file_structure_define/",
 headers: {
 Authorization: "Bearer " + token,
 },
 }),
 filePost:(token)=>
 instance({
 method:"POST",
 url:"tenant/",
 headers: {
 Authorization: "Bearer " + token,
 },
 }),
 CategoryMap:(token)=>
 instance({
 method:"GET",
 url:"category_define/",
 headers: {
 Authorization: "Bearer " + token,
 },
 }),
 ProjectMap:(token)=>
 instance({
 method:"GET",
 url:"get_bank_in_product_mapping/",
 headers: {
 Authorization: "Bearer " + token,
 },
 }),
 ProjectPost:(token)=>
 instance({
 method:"POST",
 url:"get_bank_in_product_mapping/",
 headers: {
 Authorization: "Bearer " + token,
 },
 }),

 DefineSFTPlist:(token)=>
 instance({
 method:"GET",
 url:"define-sftp-server/",
 headers: {
 Authorization: "Bearer " + token,
 },
 }),

 BankStoragelist:(token)=>
 instance({
 method:"GET",
 url:"member_bank_storage_link/",
 headers: {
 Authorization: "Bearer " + token,
 },
 }),

};


// import axios from 'axios';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import NetInfo from '@react-native-community/netinfo';

// import Global from './Global';
// const addAuthorizationHeader = (config) => {
//   config.headers.Authorization = 'Bearer ' + localStorage.getItem('ACCESS_TOKEN');
//   return config;
// };

// const handleResponseError = (error) => {
//   // const { response } = error;
//   // const status = response ? response.status : -1;
//   // const errorMessage = response ? response?.data?.message : 'Something went wrong';
//   return Promise.reject(error);
//   // switch (status) {
//   //   case 401:
//   //     Snackbar.show({
//   //       text: 'Unauthorized: Please login again',
//   //       duration: Snackbar.LENGTH_LONG,
//   //     });
//   //     break;
//   //   case 400:
//   //   case 404:
//   //   case 424:
//   //   case 500:
//   //     Snackbar.show({
//   //       text: 'Something Went Wrong',
//   //       duration: Snackbar.LENGTH_LONG,
//   //     });
//   //     break;
//   //   default:
//   //     Snackbar.show({
//   //       text: 'Something Went Wrong.....',
//   //       duration: Snackbar.LENGTH_LONG,
//   //     });
//   //     break;
//   // }

//   // const payload = {
//   //   baseUrl: response.config.baseURL,
//   //   endpoint: response.request.url,
//   //   url: response.request.responseURL,
//   //   method: response.request?._method || 'UNKNOWN',
//   //   status: response?.status,
//   //   severity: 'error',
//   //   errorMessage: response?.data?.detail || 'Something went wrong',
//   //   errorCode: response?.data?.code || 'UNKNOWN',
//   //   responseHeaders: response?.headers || {},
//   //   responseData: response?._response || {},
//   //   requestHeaders: response?.request?._headers || {},
//   //   datetime: new Date().toISOString(),
//   // };

//   // console.log('payload: ', payload);

//   // return Promise.reject(
//   //   new Error({
//   //     error: errorMessage,
//   //     status,
//   //   }),
//   // );
// };

// const createInstance = (baseURL, auth = true) => {
//   const instance = axios.create({
//     baseURL,
//   });

//   instance.interceptors.response.use((response) => response, handleResponseError);

//   if (auth) {
//     instance.interceptors.request.use(addAuthorizationHeader, (error) => Promise.reject(error));
//   }

//   return instance;
// };

// const Instance = createInstance(Global.baseURL);
// // const NonHeaderInstance = createInstance(Global.baseURL, false);

// // const checkInternetConnectivity = async () => {
// //   try {
// //     const connectionInfo = await NetInfo.fetch();
// //     console.log('connectionInfo: ', connectionInfo);
// //     return connectionInfo.isConnected;
// //   } catch (error) {
// //     console.log('Error checking internet connectivity:', error);
// //     return false;
// //   }
// // };

// // Helper function to make API calls with internet connectivity check
// const makeAPICall = async (instance, method, endpoint, params, data) => {
//   // const isInternetConnected = await checkInternetConnectivity();
//   // if (!isInternetConnected) {
//   //   // Snackbar.show({
//   //   //   text: 'No Internet Connection',
//   //   //   duration: Snackbar.LENGTH_LONG,
//   //   // });
//   //   throw new Error('No internet connectivity');
//   // }

//   try {
//     switch (method) {
//       case 'GET':
//         return instance.get(endpoint, { params });
//       case 'POST':
//         return instance.post(endpoint, data);
//       case 'PUT':
//         return instance.put(endpoint, data);
//       case 'PATCH':
//         return instance.patch(endpoint, data);
//       case 'DELETE':
//         return instance.delete(endpoint, { params });
//       default:
//         throw new Error('Invalid HTTP method');
//     }
//   } catch (error) {
//     console.log('Error in API call:', error);

//     // const payload = {
//     //   url: instance.defaults.baseURL + endpoint,
//     //   method,
//     //   data,
//     //   status: error?.response?.status,
//     //   severity: 'error',
//     //   requestHeaders: instance.defaults.headers,
//     //   datetime: new Date().toISOString(),
//     // };

//     // throw { error, payload };
//   }
// };

// // API object with various API functions
// const api = {
//   getReports: (token) => makeAPICall(Instance, 'GET', 'reports/',null ,token),
// };

// export default api;
