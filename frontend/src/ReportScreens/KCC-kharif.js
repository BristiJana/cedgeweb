import React ,{useEffect,useState} from 'react'

import { Row, Col, Select, Dropdown,Menu,DatePicker, Button, Skeleton } from "antd";

import { Cards } from "../components/cards/frame/cards-frame";
import api from "../Services/api";
import { Main } from "../container/styled";


import { Bar } from "react-chartjs-2";
import '../ReportScreens/style.css'


export default function KCCkharif() {
    const [stateData, setStateData] = useState("");
    const[KCCdata1,setKCCdata1]=useState([])
    const [account, setAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [district, setDistrict] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [branchList, setBranchList] = useState([]);
    const [shoudShowBranch, setShoudShowBranch] = useState(null);
    const [shouldShowBank, setshouldShowBank] = useState(null);
    const [branchId, setBranchId] = useState("");
    const [bankinfo, setBankinfo] = useState("");
    const [result, setResult] = useState([]);
    const [downloadData,setDownlaodData]=useState("")
    const [selectedOption, setSelectedOption] = useState('Select District');
  const[won,setWon]=useState("");
  const[amoun,setAmoun]=useState("");
    // Define the options for the dropdown
    const { Option } = Select;
   
    
    
    useEffect(() => {
        getData();
        districtList();
        // BankList();
      }, []);

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

     
     
    
    
      const handleDropdownChange = (option) => {
        setSelectedOption(option.key);
      
      };
    
    
      const menu = (
        KCCdata1 && KCCdata1.web_result ? (
          <Menu onClick={handleDropdownChange}>
            {KCCdata1.web_result.map((option) => (
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
  
  const chartData = extractChartData(KCCdata1);
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




      const getData = () => {
        const acToken = localStorage.getItem("accessToken");
        console.log(acToken)
        const report_type = "KCC-Kharif"
        const bankId = shoudShowBranch ? shoudShowBranch : 0;
        const branch_Id = branchId ? branchId : 0;
        api
          .cropData(acToken,bankId,branch_Id)
          .then((response) => {
            console.log("result----->" + JSON.stringify(response.data, null, 2));
            setKCCdata1(response.data)
            // setBankinfo(response.data.info);
            // setResult(response.data.result);
            // setStateData(response.data.web_result[0].barchart[0].labels);
            // setAccount(response.data.web_result[0].barchart[0].number_of_account);
            // setAmount(response.data.web_result[0].barchart[0].amount);
            // downloadApi(
            //   response.data.info.date,
            //   response.data.info.name,
            //   response.data.result
            // );
          })
          .catch((err) => {
            console.log("err", err);
          });}

      const ShowBank = (value) => {
        console.log("districtid---", value);
        setshouldShowBank(value);
        const id = value;
        const acToken = localStorage.getItem("accessToken");
        api.getBankList(acToken, id).then((response) => {
          // console.log("Bankkk-", JSON.stringify(response.data, null, 2));
          setBankList(response.data);
        });
      };

      const downloadApi = (date, name, result) => {
        console.log("name: ", name);
        console.log("date: ", date);
        console.log("result: ", result);
        const downloadObject = {
          report_type: "Top 20 Housing",
          date: date,
          name: name,
          data: result,
        };
        // downloadObject.bank_name = bankinfo.bank_name
        // downloadObject.branch_name = bankinfo.branch_name
        const acToken = localStorage.getItem("accessToken");
        console.log("downloadObject---", downloadObject);
        api.dowloadData(acToken, downloadObject).then((response) => {
          console.log("downloaddddd---", response, null, 2);
          setDownlaodData(response.data)
          // handleExportExcel(response.data)
          // generatePdfFromBase64(response.data)
        });
      };

     


    
     

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
              onChange={ShowBank}
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
                <Select
                  defaultValue="15 June,2023"
                  style={{ width: 200 }}
                  onChange={ShowBranch}
                >
                  {bankList?.map((item) => (
                    <Option value={item.id}>{item.bank_name}</Option>
                  ))}
                </Select>
              
          </div>

          

         
        
          <div style={{marginTop:"35px"}}>
          <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxDT3sdgwcrdo2Huol2itGoOY-WRMc3AacJHItZ4q5L0LEeKb3ErCqnrqQEtSvq229ZDA&usqp=CAU"
        alt="Microsoft Excel Icon"
        width="24"
        height="24"
      />
        
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



