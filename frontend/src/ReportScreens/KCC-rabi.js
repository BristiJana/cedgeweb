import React ,{useEffect,useState} from 'react'


import { Row, Col, Select, Dropdown,Menu,DatePicker, Button, Skeleton } from "antd";
import moment from 'moment'; 
import 'antd/dist/antd.css';
import { Cards } from "../components/cards/frame/cards-frame";
import api from "../Services/api";
import { Main } from "../container/styled";


import { Bar } from "react-chartjs-2";


import '../ReportScreens/style.css'

const { RangePicker } = DatePicker;
export default function KCCRabi() {
    
    const [district, setDistrict] = useState([]);
    const[KCCdata2,setKCCdata2]=useState([])
    const [bankList, setBankList] = useState([]);
    const [branchList, setBranchList] = useState([]);
    const [shoudShowBranch, setShoudShowBranch] = useState(null);
    const [shouldShowBank, setshouldShowBank] = useState(null);
    const [branchId, setBranchId] = useState("");
    
    const [kccresult, setResult] = useState([]);
    const [downloadData,setDownlaodData]=useState("")
    const [selectedOption, setSelectedOption] = useState('Select District');
    const defaultDate = moment('15 Jun', 'DD MMM'); // Parse the default date

  const handleChange = (date, dateString) => {
    // Handle date change here
    console.log(date, dateString);
  };
  const[won,setWon]=useState("");
  const[amoun,setAmoun]=useState("");
    // Define the options for the dropdown
    const { Option } = Select;
   



const ShowBranch = (value) => {
        console.log("bankid---", value);
        setShoudShowBranch(value);
        const acToken = localStorage.getItem("accessToken");
        api
          .getBranchList(acToken, shouldShowBank, shoudShowBranch)
          .then((response) => {
            console.log(
              "Branchhhhh-",
              JSON.stringify(response.data[0].branch_list, null, 2)
            );
            setBranchList(response.data[0].branch_list);
          });
      };

      const getBranchId = (value) => {
        console.log("branchid--", value);
        setBranchId(value);
      };

      const districtList = () => {
        const acToken = localStorage.getItem("accessToken");
        console.log(acToken)
        api.getDistrictList(acToken).then((response) => {
          // console.log("district-", response.data, null, 2)
          setDistrict(response.data);
        });
      };

     
       const getCrop = () => {
       const acToken = localStorage.getItem("accessToken");
      
       const bankId = shoudShowBranch ? shoudShowBranch : 0;
       const branch_Id = branchId ? branchId : 0;
        api
          .cropDatak(acToken,bankId,branch_Id)
          .then((response) => {
            console.log("resultkcc----->" + JSON.stringify(response.data, null, 2));
            
            setKCCdata2(response.data);
            
          })
          .catch((err) => {
            console.log("err", err);
          });}

          const handleDropdownChange = (option) => {
            setSelectedOption(option.key);
          
          };
        
        
          const menu = (
            KCCdata2 && KCCdata2.web_result ? (
              <Menu onClick={handleDropdownChange}>
                {KCCdata2.web_result.map((option) => (
                  <Menu.Item key={option.district_name}>{option.district_name}</Menu.Item>
                ))}
              </Menu>
            ) : null
          );
    
          const extractChartData = (data) => {
            if (!data || selectedOption === "" || !data.web_result || !Array.isArray(data.web_result)) {
              return null;
            }
          
            const labels = [];
            const amountTodayData = [];
            const outstandingAmountData = [];
          
            for (const district of data.web_result) {
              if (district.district_name === selectedOption && district.json_agg && Array.isArray(district.json_agg)) {
                setWon(district.amount_today);
                setAmoun(district.outstanding_amount);
          
                for (const branch of district.json_agg) {
                  if (branch.branch_name && branch.amount_today !== undefined && branch.outstanding_amount !== undefined) {
                    labels.push(branch.branch_name);
                    amountTodayData.push(branch.amount_today);
                    outstandingAmountData.push(branch.outstanding_amount);
                  }
                }
              }
            }
          
            return {
              labels,
              amountTodayData,
              outstandingAmountData,
            };
          };
          
          
         
    const BarChart = () => {
      
      
      const chartData = extractChartData(KCCdata2);
      const data = {
        labels: chartData==null?[]:chartData.labels,
        datasets: [
          {
            label: 'Amount Today',
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: chartData==null?[]:chartData.amountTodayData,
          },
          {
            label: 'Outstanding Amount',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: chartData==null?[]: chartData.outstandingAmountData,
          },
        ],
      };
    
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
      
      return (
        <div>
         
         <h1> <Bar data={data} options={options} /></h1>
        </div>
      );
    };
         
      

    

      useEffect(() => {
       
        districtList();
        getCrop();
     
      }, []);


    
     

  return (
    <div>
         <Cards>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width:"80%"
          }}
        >
          <div>
            <h1>District</h1>
            <Select
              defaultValue="Select District"
              style={{ width: 200 }}
              
            >
              {district.map((item) => (
                // console.log("item-----------------",item)
                <Option value={item.id}>{item.district_name}</Option>
              ))}
            </Select>
          </div>

         

          <div>
            {shoudShowBranch != null ? (
              <div>
                <h1>Branch</h1>
                <Select
                  defaultValue="Select Branch"
                  style={{ width: 200 }}
                  onChange={getBranchId}
                >
                  {branchList?.map((item) => (
                    <Option value={item.branch_id}>{item.branch_name}</Option>
                  ))}
                </Select>
              </div>
            ) : <div>
            <h1>Branch</h1>
            <Select
              defaultValue="Select Branch"
              style={{ width: 200 }}
              onChange={getBranchId}
              disabled
            >
              {branchList?.map((item) => (
                <Option value={item.branch_id}>{item.branch_name}</Option>
              ))}
            </Select>
          </div>}
          </div>

          <div>
          
                <h1>Date</h1>
                <RangePicker
        defaultValue={[defaultDate, defaultDate]} // Set the default date
        style={{ width: "50px" ,paddingTop:"6px",paddingBottom:"7.5px"}}
        format="DD MMM" // Specify the desired date format
        onChange={handleChange}
      />
              
          </div>

          

         
        
          <div style={{marginTop:"35px"}}>
          <a href="#" >
          <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxDT3sdgwcrdo2Huol2itGoOY-WRMc3AacJHItZ4q5L0LEeKb3ErCqnrqQEtSvq229ZDA&usqp=CAU"
        alt="Microsoft Excel Icon"
        width="24"
        height="24"
      /></a>
        
        </div>
        </div>
      </Cards>
      <div style={{marginLeft:"34px"}}> <Row gutter={10}>
         
            <Col xxl={10} md={5} sm={5} xs={5} lg={7}>
              <div>
                
              <div>
              <Cards headless >
                <h1 style={{ fontWeight: "bolder" ,color:"grey"}}>Amount Today</h1>
                <h1 style={{ color: "black", fontWeight: "bold",fontSize:"21px" }}>
                  {won}
                </h1>
              
              </Cards></div>
              
             </div>
            </Col>
            <Col xxl={10} md={5} sm={5} xs={5} lg={7}>
              <div>
                
              <div>
              <Cards headless >
                <h1 style={{ fontWeight: "bolder",color:"grey" }}>Outstanding Amount</h1>
                <h1 style={{ color: "black", fontWeight: "bold",fontSize:"21px" }}>
                 {amoun}
                </h1>
               
                
              </Cards></div>
              
             </div>
            </Col>
          
        </Row>
        </div>
      
      <Main>
      <Col flex={1}  >
            <Cards >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginBottom:"20px"}}>
          <h2>Closed Deals Performance</h2>
          <div style={{backgroundColor: 'black',
  borderRadius: '10px',
  padding: '8px'}}>
          <Dropdown overlay={menu} placement="bottomRight" >
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()} style={{justifyContent:'flex-end', color:"white"}}>
              {selectedOption}
            </a>
          </Dropdown></div>
        </div>
           <BarChart/>
            </Cards>
          </Col>
      </Main>
    </div>
  )
}



//top 20 housing
// import React ,{useEffect,useState} from 'react'
// import { Col,Select,DatePicker,Button } from 'antd'
// import FeatherIcon from 'feather-icons-react';
// import { PageHeader } from '../components/page-headers/page-headers'
// import { Cards } from "../components/cards/frame/cards-frame";
// import api from "../Services/api";
// import { Main } from "../container/styled";
// import { HorizontalBar } from "react-chartjs-2";
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import PropTypes from "prop-types";
// import { ExportButtonPageHeader } from "../components/buttons/export-button/export-button";


// export default function Top20Housing() {
//     const [stateData, setStateData] = useState("");
//     const [account, setAccount] = useState("");
//     const [amount, setAmount] = useState("");
//     const [district, setDistrict] = useState([]);
//     const [bankList, setBankList] = useState([]);
//     const [branchList, setBranchList] = useState([]);
//     const [shoudShowBranch, setShoudShowBranch] = useState(null);
//     const [shouldShowBank, setshouldShowBank] = useState(null);
//     const [branchId, setBranchId] = useState("");
//     const [bankinfo, setBankinfo] = useState("");
//     const [result, setResult] = useState([]);
//     const [downloadData,setDownlaodData]=useState("")
//     const { Option } = Select;
//     const [state, setstate] = useState({
//       date: null,
//       dateString: null,
//     });
//     const onChangedate = (date, dateString) => {
//       setstate({ ...state, date, dateString });
//     };

//     useEffect(() => {
//         getData();
//         districtList();
//         // BankList();
//       }, []);

//       const ShowBranch = (value) => {
//         console.log("bankid---", value);
//         setShoudShowBranch(value);
//         const acToken = localStorage.getItem("accessToken");
//         api
//           .getBranchList(acToken, shouldShowBank, shoudShowBranch)
//           .then((response) => {
//             console.log(
//               "Branchhhhh-",
//               JSON.stringify(response.data[0].branch_list, null, 2)
//             );
//             setBranchList(response.data[0].branch_list);
//           });
//       };

//       const getBranchId = (value) => {
//         console.log("branchid--", value);
//         setBranchId(value);
//       };

//       const districtList = () => {
//         const acToken = localStorage.getItem("accessToken");
//         api.getDistrictList(acToken).then((response) => {
//           // console.log("district-", response.data, null, 2)
//           setDistrict(response.data);
//         });
//       };

//       const getData = () => {
//         const acToken = localStorage.getItem("accessToken");
//         const report_type = "Top 20 Housing"
//         const bankId = shoudShowBranch ? shoudShowBranch : 0;
//         const branch_Id = branchId ? branchId : 0;
//         api
//           .reportsData(acToken,report_type,bankId,branch_Id)
//           .then((response) => {
//             console.log("result----->" + JSON.stringify(response.data, null, 2));
//             setBankinfo(response.data.info);
//             setResult(response.data.result);
//             setStateData(response.data.web_result[0].barchart[0].labels);
//             setAccount(response.data.web_result[0].barchart[0].number_of_account);
//             setAmount(response.data.web_result[0].barchart[0].amount);
//             downloadApi(
//               response.data.info.date,
//               response.data.info.name,
//               response.data.result
//             );
//           })
//           .catch((err) => {
//             console.log("err", err);
//           });}

//       const ShowBank = (value) => {
//         console.log("districtid---", value);
//         setshouldShowBank(value);
//         const id = value;
//         const acToken = localStorage.getItem("accessToken");
//         api.getBankList(acToken, id).then((response) => {
//           // console.log("Bankkk-", JSON.stringify(response.data, null, 2));
//           setBankList(response.data);
//         });
//       };

//       const downloadApi = (date, name, result) => {
//         console.log("name: ", name);
//         console.log("date: ", date);
//         console.log("result: ", result);
//         const downloadObject = {
//           report_type: "Top 20 Housing",
//           date: date,
//           name: name,
//           data: result,
//         };
//         // downloadObject.bank_name = bankinfo.bank_name
//         // downloadObject.branch_name = bankinfo.branch_name
//         const acToken = localStorage.getItem("accessToken");
//         console.log("downloadObject---", downloadObject);
//         api.dowloadData(acToken, downloadObject).then((response) => {
//           console.log("downloaddddd---", response, null, 2);
//           setDownlaodData(response.data)
//           // handleExportExcel(response.data)
//           // generatePdfFromBase64(response.data)
//         });
//       };

//       const handleExportExcel = () => {
//         const workbook = XLSX.read(downloadData.excel, { type: 'base64' });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
//         const ws = XLSX.utils.aoa_to_sheet(excelData);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
//         const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//         const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//         // const path = downloadData.file_name.slice(9)
//         saveAs(excelBlob,'Top 20 Housing.xlsx' );
//         console.log("Done")
//       };

//       const generatePdfFromBase64 = () => {
//         // console.log('responsepdfff: ', downloadData.pdf);
//           // Create a link for downloading
//           const a = document.createElement('a');
//           a.href = 'data:application/octet-string;base64,'+ downloadData.pdf;
//           a.download = 'Top 20 Housing.pdf';; // Set the desired file name
//           a.click();
//       };
      
    
//       const filterData = () => {
//         const acToken = localStorage.getItem("accessToken");
//         const report_type = "Top 20 Housing"
//         const bankId = shoudShowBranch ? shoudShowBranch : 0;
//         const branch_Id = branchId ? branchId : 0;
//         api
//           .reportsData(acToken,report_type, bankId, branch_Id)
//           .then((response) => {
//             console.log("result2----->" + JSON.stringify(response.data, null, 2));
//             setStateData(response.data.web_result[0].barchart[0].labels);
//             setAccount(response.data.web_result[0].barchart[0].number_of_account);
//             setAmount(response.data.web_result[0].barchart[0].amount);
//             downloadApi(
//               response.data.info.date,
//               response.data.info.name,
//               response.data.result
//             );
//           })
//           .catch((err) => {
//             console.log("err", err);
//           });
//       };


//   const ChartjsHorizontalChart1 = (props) => {
//     const { labels, datasets, options, height } = props;
//     const data = {
//       datasets,
//       labels,
//     };
//     return <HorizontalBar data={data} height={height} options={options} />;
//   };

//   ChartjsHorizontalChart1.defaultProps = {
//     height: 300,
//     // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//     labels: stateData,
//     datasets: [
//       {
//         // data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
//         data: amount,
//         backgroundColor: "#07519C",
//         barPercentage: 0.6,
//       },
//       {
//         // data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
//         data: account,
//         backgroundColor: "yellow",
//         barPercentage: 0.6,
//       },
//     ],

//     options: {
//       maintainAspectRatio: true,
//       responsive: true,
//       legend: {
//         display: false,
//         labels: {
//           display: false,
//         },
//       },
//       scales: {
//         yAxes: [
//           {
//             stacked: true,
//             gridLines: {
//               color: "#e5e9f2",
//             },
//             ticks: {
//               beginAtZero: true,
//               fontSize: 10,
//               fontColor: "#182b49",
//             },
//           },
//         ],
//         xAxes: [
//           {
//             stacked: true,
//             gridLines: {
//               display: false,
//             },

//             ticks: {
//               beginAtZero: true,
//               fontSize: 11,
//               fontColor: "#182b49",
//             },
//           },
//         ],
//       },
//     },
//   };

//   ChartjsHorizontalChart1.propTypes = {
//     height: PropTypes.number,
//     labels: PropTypes.arrayOf(PropTypes.string),
//     datasets: PropTypes.arrayOf(PropTypes.object),
//     options: PropTypes.object,
//   };

//   return (
//     <div>
//          <Cards>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <div>
//             <h1>District hi</h1>
//             <Select
//               defaultValue="Select District"
//               style={{ width: 200 }}
//               onChange={ShowBank}
//             >
//               {district.map((item) => (
//                 // console.log("item-----------------",item)
//                 <Option value={item.id}>{item.district_name}</Option>
//               ))}
//             </Select>
//           </div>

//           <div>
//             {shouldShowBank != null ? (
//               <div>
//                 <h1>Member Bank</h1>
//                 <Select
//                   defaultValue="Select Bank"
//                   style={{ width: 200 }}
//                   onChange={ShowBranch}
//                 >
//                   {bankList?.map((item) => (
//                     <Option value={item.id}>{item.bank_name}</Option>
//                   ))}
//                 </Select>
//               </div>
//             ) :   <div>
//             <h1>Member Bank</h1>
//             <Select
//               defaultValue="Select Bank"
//               style={{ width: 200 }}
//               onChange={ShowBranch}
//               disabled
//             >
//               {bankList?.map((item) => (
//                 <Option value={item.id}>{item.bank_name}</Option>
//               ))}
//             </Select>
//           </div>}
//           </div>

//           <div>
//             {shoudShowBranch != null ? (
//               <div>
//                 <h1>Branch</h1>
//                 <Select
//                   defaultValue="Select Branch"
//                   style={{ width: 200 }}
//                   onChange={getBranchId}
//                 >
//                   {branchList?.map((item) => (
//                     <Option value={item.branch_id}>{item.branch_name}</Option>
//                   ))}
//                 </Select>
//               </div>
//             ) : <div>
//             <h1>Branch</h1>
//             <Select
//               defaultValue="Select Branch"
//               style={{ width: 200 }}
//               onChange={getBranchId}
//               disabled
//             >
//               {branchList?.map((item) => (
//                 <Option value={item.branch_id}>{item.branch_name}</Option>
//               ))}
//             </Select>
//           </div>}
//           </div>

//           <Button
//             size="default"
//             outlined
//             type="info"
//             style={{ alignSelf: "flex-end"}}
//             onClick={filterData}
//           >
//             Apply
//           </Button>

//           {/* <DatePicker style={{ width: 100 }} onChange={onChangedate} /> */}
//           {/* <ExportButtonPageHeader /> */}
//           <div style={{ alignSelf: "flex-end"}}>
//           <FeatherIcon size={24} icon="file" onClick={generatePdfFromBase64} />
//         <span>PDF</span>
//         </div>
//         <div style={{ alignSelf: "flex-end"}}>
//           <FeatherIcon size={24} icon="file" onClick={handleExportExcel} />
//         <span>Excel</span>
//         </div>
//         </div>
//       </Cards>
//       <PageHeader title="Top 20 Housing" />
//       <Main>
//       <Col flex={1} md={12} xs={24}>
//             <Cards title="Top 20 Housing" size="Large">
//               <ChartjsHorizontalChart1 />
//             </Cards>
//           </Col>
//       </Main>
//     </div>
//   )
// }




