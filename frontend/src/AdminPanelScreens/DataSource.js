// const DataSource = [];
// const DataSourceForFileStructure=[];

// // for (let i = 1; i <= 810; i++) {
// //   DataSource.push({
// //     id: i,
// //     tenant_name: `Tenant ${i}`,
// //     tenant_type: `Type ${i % 5 + 1}`,
// //     address1: `Address ${i}`,
// //     pincode: `Pincode ${i}`,
// //   });
// // }

// // for (let i = 1; i <= 810; i++) {
// //   DataSource.push({
// //     id: i,
// //     File_name: `trial_cg_apex_state_co_op_bank ${i}`,
// //     tenant_type: `CSV ${i % 5 + 1}`,
// //     Is_Temporary: `true ${i}`,
    
// //   });
// // }

// for (let i = 1; i <= 810; i++) {
//   DataSource.push({
//     id: i,
//     Tenant_Name: `Apex Bank Nabard ${i}`,
//     Is_Multiple_SFTP_Definition: `true ${i}`,
//   });
// }

// export default DataSource;
// DataSource.js
const DataSource = [];
const DataSource2 = [];
const DataSource3 = [];
const DataSource4 = [];
const DataSourcerole = [];

for (let i = 1; i <= 810; i++) {
  DataSource.push({
    id: i,
    tenant_name: `Tenant ${i}`,
    tenant_type: `Type ${i % 5 + 1}`,
    address1: `Address ${i}`,
    pincode: `Pincode ${i}`,
  });
}
for (let i = 1; i <= 15; i++) {
  DataSource4.push({
    id: i,
    form_name: `Form ${i}`,
    
is_parent:Math.random() < 0.5,

    
  });
}
for (let i = 1; i <= 810; i++) {
  DataSource3.push({
    id: i,
    tenant_name: `Tenant ${i}`,
    role_name: `Role ${i % 5 + 1}`,
    user_name: `User ${i}`,
   
  });
}

for (let i = 1; i <= 810; i++) {
  DataSourcerole.push({
    id: i,
    role_name: `Tenant ${i}`,
    Is_Temporary:Math.random() < 0.5,

  });
}

for (let i = 1; i <= 810; i++) {
  DataSource2.push({
    id: i,
   
    email_id: `email ${i}`,
    mobile_number: `mobile Number ${i}`,
    role_name: `Role ${i % 5 + 1}`,
    tenant_name: `Tenant ${i}`,
    
  });
}
export { DataSource, DataSourcerole,DataSource2, DataSource3,DataSource4};

