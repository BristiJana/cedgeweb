import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Dropdown, Menu, DatePicker, Button } from "antd";
import moment from 'moment';
import 'antd/dist/antd.css';
import { Cards } from "../components/cards/frame/cards-frame";
import api from "../Services/api";
import { Main } from "../container/styled";
import { Bar } from "react-chartjs-2";
import './style.css'


const { RangePicker } = DatePicker;

export default function DCCBwiseFd() {
  const [district, setDistrict] = useState([]);
  const[Dcc,setDcc]=useState([])
  const [bankList, setBankList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [shoudShowBranch, setShoudShowBranch] = useState(null);
  const [shouldShowBank, setshouldShowBank] = useState(null);
  const [branchId, setBranchId] = useState("");
  const [kccresult, setResult] = useState([]);
  const [downloadData, setDownlaodData] = useState("");
  const [selectedOption, setSelectedOption] = useState('Select District');
  const defaultDate = moment('15 Jun', 'DD MMM'); // Parse the default date
  const [selectedBar, setSelectedBar] = useState(null);
  const handleChange = (date, dateString) => {
    // Handle date change here
    console.log(date, dateString);
  };

  

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
      setDistrict(response.data);
    });
  };

  const getCrop = () => {
    const acToken = localStorage.getItem("accessToken");
    const bankId = shoudShowBranch ? shoudShowBranch : 0;
       const branch_Id = branchId ? branchId : 0;
    api
      .dccbData(acToken,bankId,branch_Id)
      .then((response) => {
        setDcc(response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleDropdownChange = (option) => {
    setSelectedOption(option.key);
  };

  const menu = (
    Dcc && Dcc.web_result ? (
    <Menu onClick={handleDropdownChange}>
      {Dcc.result.map((option) => (
        <Menu.Item key={option.json_build_object.district}>{option.json_build_object.district}</Menu.Item>
      ))}
    </Menu>):null
  );

  const extractChartData = (data) => {
    if (!data || selectedOption === "" || !data.web_result || !Array.isArray(data.web_result)) {
      return null;
    }
    const labels = [];
    const amountTodayData = [];
    
    data.web_result.forEach((district) => {
      if (district.json_build_object.district === selectedOption) {
        district.json_build_object.result.forEach((branch) => {
          labels.push(branch.bank_name);
          amountTodayData.push(branch.amount);
          
        });
      }
    });

    return {
      labels,
      amountTodayData,
     
    };
  };

  


  const BarChart = () => {
    const chartData = extractChartData(Dcc);
    const data = {
      labels: chartData == null ? [] : chartData.labels,
      datasets: [
        {
          label: 'Amount',
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: chartData == null ? [] : chartData.amountTodayData,
          barPercentage:0.6
        }
      ],
    };
    const options = {
        onClick: (event, elements) => {
            
          if (elements.length > 0) {
            console.log(elements)
            const clickedBarIndex = elements[0]._index;
            
            setSelectedBar(clickedBarIndex);
            
           
          } else {
            setSelectedBar(null);
          }
        },
        scales: {
            y: {
              beginAtZero: true,
            },
          },
      };
   

    return (
      <div>
        <h1> <Bar data={data} options={options} /></h1>
        {selectedBar !== null && (
            <div style={{marginTop:"40px"}}>
        <BankBarChart selectedBar={selectedBar} datee={Dcc.result[0]} /></div>
      )}
      </div>
    );
  };

  const BankBarChart = ({ selectedBar, datee }) => {
    if (selectedBar === null) {
      return null;
    }
  
    const bankData = datee.json_build_object.result[selectedBar];
   console.log(bankData)
   const branchData = bankData.branch.map((branch) => branch.amount);
  const branchLabels = bankData.branch.map((branch) => branch.branch_name);

  
  const data = {
    labels: branchLabels,
    datasets: [
      {
        label: 'Amount',
        backgroundColor: 'rgba(255, 0, 0, 0.6)', 
      borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 1,
        data: branchData,
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
       <Bar data={data} options={options} />
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
            width: "80%"
          }}
        >
          <div>
            <h1>District</h1>
            <Select
              defaultValue="Select District"
              style={{ width: 200 }}
            >
              {district.map((item) => (
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
              defaultValue={[defaultDate, defaultDate]}
              style={{ width: "50px", paddingTop: "6px", paddingBottom: "7.5px" }}
              format="DD MMM"
              onChange={handleChange}
            />
          </div>

          <div style={{ marginTop: "35px" }}>
            <a href="#">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxDT3sdgwcrdo2Huol2itGoOY-WRMc3AacJHItZ4q5L0LEeKb3ErCqnrqQEtSvq229ZDA&usqp=CAU"
                alt="Microsoft Excel Icon"
                width="24"
                height="24"
              />
            </a>
          </div>
        </div>
      </Cards>

      <Main>
        <Col flex={1}  >
          <Cards >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "20px" }}>
              <h2>DCCB Wise FD</h2>
              <div style={{
                backgroundColor: 'tranparent',
                borderRadius: '10px',
                border: '1px solid black',
                padding: '12px'
              }}>
                <div
                  style={{
                    content: '',
                    position: 'absolute',
                    top: '8.6%',
                    right: '30px',
                    width: '0',
                    height: '0',
                    borderTop: '4px solid transparent',
                    borderBottom: '4px solid transparent',
                    borderLeft: '4px solid black',
                    transform: 'translateY(-50%)',
                  }}
                ></div>
                <Dropdown overlay={menu} placement="bottomRight" >
                  <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()} style={{ justifyContent: 'flex-end', color: "black" }}>
                    {selectedOption}
                  </a>
                </Dropdown>
              </div>
            </div>
            <BarChart />
           
          </Cards>
        </Col>
      </Main>
    </div>
  )
}


