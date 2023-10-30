import React, { useEffect, useState, Suspense, lazy } from "react";
import { Row, Col, Select, DatePicker, Button, Skeleton } from "antd";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
// import LoanData from "./LoanSummaryData";
import Pie from "./pie";
import { Chart } from "react-google-charts";
import { PageHeader } from "../components/page-headers/page-headers";
import { Cards } from "../components/cards/frame/cards-frame";
import api from "../Services/api";
import Heading from "../components/heading/heading";
import { Radio, Table } from "antd";
import { Bar } from "react-chartjs-2";
import { ChartjsBarChartTransparent } from "../../src/components/charts/chartjs";
import { CardBarChart2, EChartCard } from "../container/dashboard/style";
import barData from "./BarData";
import BarChartData from "./BarChatData";
import { Main } from "../container/styled";
import { HorizontalBar } from "react-chartjs-2";
import * as XLSX from "xlsx";
// import { CardGroup } from '../../style';
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { triggerFocus } from "antd/lib/input/Input";
import CardModal from './Modal';
import './style.css'
export default function DepositSummary() {
  const [stateData, setStateData] = useState("");
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
  const[web,setweb]=useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [downloadData, setDownlaodData] = useState("");
  const { Option } = Select;

  const[responseloan,setresponseloan]=useState([]);

  const [iscardModalOpen, setCardModalOpen] = useState({});

// Function to open a specific modal
const opencardModal = (item) => {
  console.log("Opening modal for:", item.sub_category_id);
  setCardModalOpen({ ...iscardModalOpen, [item.sub_category_id]: true });
};

// Function to close a specific modal
const closecardModal = (item) => {
  console.log("Closing modal for:", item.sub_category_id);
  setCardModalOpen({ ...iscardModalOpen, [item.sub_category_id]: false });
};






  const DailyOverview = lazy(() =>
    import("../../src/container/dashboard/overview/performance/DailyOverview")
  );
  const [state, setstate] = useState({
    date: null,
    dateString: null,
  });
  const onChangedate = (date, dateString) => {
    setstate({ ...state, date, dateString });
  };

  const loanhistory = () => {
    const acToken = localStorage.getItem("accessToken");
    console.log(acToken)
    const report_type = "Deposit Summary";
    const bankId = shoudShowBranch ? shoudShowBranch : 0;
    const branch_Id = branchId ? branchId : 0;
    api
      .reportdeData(acToken, bankId, branch_Id)
      .then((response) => {
        console.log("result----->" + JSON.stringify(response.data.web_result[0], null, 2));
        console.log(response.data.result)
        setresponseloan(response.data.web_result);
         
        
        
      })
      .catch((err) => {
        console.log("err", err);
      });
   
  };
 
  
  useEffect(() => {
    
    loanhistory();


  }, []);

  const openModal = () => {
    setModalIsOpen(true);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsModalOpen(true);
  };

  

  return (
    <div>
      <Cards headless> 
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1>District</h1>
            <Select
              defaultValue="Select District"
              style={{ width: 200 }}
              // onChange={ShowBank}
            >
              {/* {district.map((item) => (
                // console.log("item-----------------",item)
                <Option value={item.id}>{item.district_name}</Option>
              ))} */}
              <Option value="Raipur">Raipur</Option>
            </Select>
          </div>

          <div>
            {/* {shouldShowBank != null ? ( */}
            <div>
              <h1>Member Bank</h1>
              <Select
                defaultValue="Select Bank"
                style={{ width: 200 }}
                // onChange={ShowBranch}
              >
                {/* {bankList?.map((item) => (
                    <Option value={item.id}>{item.bank_name}</Option>
                  ))} */}
                <Option value="CG Apex">CG Apex</Option>
              </Select>
            </div>
            {/* ) : null} */}
          </div>

          <div>
            {/* {shoudShowBranch != null ? ( */}
            <div>
              <h1>Branch</h1>
              <Select
                defaultValue="Select Branch"
                style={{ width: 200 }}
                // onChange={getBranchId}
              >
                {branchList?.map((item) => (
                  <Option value={item.branch_id}>{item.branch_name}</Option>
                ))}
              </Select>
            </div>
            {/* ) : null} */}
          </div>

          <Button
            size="default"
            outlined
            type="info"
            style={{ alignSelf: "flex-end"}}
            // onClick={filterData}
          >
            Apply
          </Button>

          {/* <DatePicker style={{ width: 100 }} onChange={onChangedate} /> */}
          {/* <ExportButtonPageHeader /> */}
          <div style={{ alignSelf: "flex-end"}}>
            <FeatherIcon size={24} icon="file" />
            <span>PDF</span>
          </div>
          <div style={{ alignSelf: "flex-end"}}>
            <FeatherIcon size={24} icon="file" />
            <span>Excel</span>
          </div>
        </div>
      </Cards>

      <div style={{marginLeft:"20px"}}>
        <Row gutter={10}>
          {responseloan.map((item) => {
            
            
            return(
            <Col xxl={10} md={5} sm={5} xs={5} lg={7}>
              <div>
                
              <div onClick={() => opencardModal(item)}>
              <Cards headless >
                <h1 style={{ fontWeight: "bolder" }}>{item.sub_category}</h1>
                <h4 style={{ color: "#176BE9", fontWeight: "bold" }}>
                  {item.total}
                </h4>
                <h6>{item.summary_date}</h6>
                {isModalOpen ? (
                  <h4 onClick={openModal}>Show More</h4>
                ) : (
                  <h4 onClick={closeModal}>Show less </h4>
                )}
              </Cards></div>
              {iscardModalOpen && iscardModalOpen[item.sub_category_id] ? (
        <CardModal
          isOpen={iscardModalOpen[item.sub_category_id]}
          closeModal={() => closecardModal(item)}
          data={item.category_json}
          head={item.sub_category}
        />
      ) : (
        <></>
      )}
             </div>
            </Col>
          )})}
        </Row>
       <Pie data={web}/>
      </div>
    </div>
  );
}

// centeredView: {
//   flex: 1,
//   justifyContent: 'center',
//   backgroundColor: 'rgba(52, 52, 52, 0.6)',
// },
// modalView: {
//   padding: 15,
//   borderRadius: 15,
//   justifyContent: 'center',
//   flexGrow: 1,
//   shadowColor: '#000',
//   shadowOffset: {
//     width: 0,
//     height: 2,
//   },
//   shadowOpacity: 0.25,
//   shadowRadius: 4,
// },

{
  /* <Cards title="Short term Loan">
          <Row gutter={40}>
            {BarChartData?.map((item) => (
              <Col xxl={6} md={12} sm={12} xs={7} lg={10}>
                <Cards headless>
                  <EChartCard>
                    <div className="card-chunk">
                      <CardBarChart2>
                        <Heading as="h1">
                          {item.Amount ? item.Amount : 0}
                        </Heading>
                        <span>{item.occurence}</span>
                        <p>
                          <span className="growth-downward">
                            <FeatherIcon icon="arrow-down" /> {item.growth}%
                          </span>
                        </p>
                      </CardBarChart2>
                    </div>
                    <div className="card-chunk">
                      <ChartjsBarChartTransparent
                        labels={item.labels}
                        datasets={[
                          {
                            data: item.dataset,
                            backgroundColor: "#FFF0F6",
                            hoverBackgroundColor: "#FF69A5",
                            label: "Growth",
                            barPercentage: 0.4,
                          },
                        ]}
                        options={chartOptions}
                      />
                    </div>
                  </EChartCard>
                </Cards>
              </Col>
            ))}
          </Row>
        </Cards> */
}

{
  /* <Col xxl={8} xl={10} lg={12} xs={24}>
<Suspense
  fallback={
    <Cards headless>
      <Skeleton active />
    </Cards>
  }
>
  <DailyOverview />
</Suspense>
</Col> */
}
