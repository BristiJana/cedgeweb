import React ,{useEffect,useState} from 'react'


import { Row, Col, Select, Dropdown,Menu,DatePicker, Button, Skeleton } from "antd";
import moment from 'moment'; 
import 'antd/dist/antd.css';
import { Cards } from "../components/cards/frame/cards-frame";
import api from "../Services/api";
import { Main } from "../container/styled";


import { Bar } from "react-chartjs-2";
import './style.css'
import {Casinhan} from './cashdata';
const { RangePicker } = DatePicker;
export default function Cashinhand() {
    
    const [district, setDistrict] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [branchList, setBranchList] = useState([]);
    const [shoudShowBranch, setShoudShowBranch] = useState(null);
    const [shouldShowBank, setshouldShowBank] = useState(null);
    const [branchId, setBranchId] = useState("");
    const[Casinhan,setCashinhan]=useState([])
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
          .cashinhandData(acToken)
          .then((response) => {
            console.log("resultkcc----->" + JSON.stringify(response.data, null, 2));
            
            setCashinhan(response.data);
            
          })
          .catch((err) => {
            console.log("err", err);
          });}

          const handleDropdownChange = (option) => {
            setSelectedOption(option.key);
          
          };
        
        
          const menu = (
            Casinhan && Casinhan.web_result ? (
            <Menu onClick={handleDropdownChange}>
              {Casinhan.result.map((option) => (
                <Menu.Item key={option.details.district_name}>{option.details.district_name}</Menu.Item>
              ))}
            </Menu>) : null
          );
    
          const extractChartData = (data) => {
            if (!data || selectedOption === "" || !data.web_result || !Array.isArray(data.web_result)) {
              return null;
            }
            const labels = [];
            const amountTodayData = [];
            const outstandingAmountData = [];
          
         
            data.web_result.forEach((district) => {
              if(district.details.district_name==selectedOption)
            {
             
              setAmoun(district.details.amount)
              district.details.result.forEach((branch) => {
                labels.push(branch.branch_name);
                amountTodayData.push(branch.amount);
                
              });}
            });
          
            return {
             
              labels,
              amountTodayData,
              
            };
          };
         
        
         
    const BarChart = () => {
      
      
      const chartData = extractChartData(Casinhan);
      const data = {
        labels: chartData==null?[]:chartData.labels,
        datasets: [
          {
            label: 'Amount Today',
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: chartData==null?[]:chartData.amountTodayData,
            barPercentage: 0.2,
          }
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
                <h1 style={{ fontWeight: "bolder",color:"grey" }}>Amount</h1>
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
          <h2>Cash In Hand</h2>
          <div style={{backgroundColor: 'tranparent',
         
          
  borderRadius: '10px',
  border: '1px solid black',
  padding: '12px'}}>
    <div
    style={{
      content: '',
      position: 'absolute',
      top:'8.6%',
      right: '30px', // Adjust this value for arrow placement
      width: '0',
      height: '0',
      borderTop: '4px solid transparent',
      borderBottom: '4px solid transparent',
      borderLeft: '4px solid black', // Adjust the size and color of the arrow
      transform: 'translateY(-50%)', // Center the arrow vertically
    }}
  ></div>
          <Dropdown overlay={menu} placement="bottomRight" >
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()} style={{justifyContent:'flex-end', color:"black"}}>
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




