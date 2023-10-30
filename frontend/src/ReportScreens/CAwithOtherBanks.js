import React ,{useEffect,useState} from 'react'
import { Col,Select,DatePicker,Button } from 'antd'

import { PageHeader } from '../components/page-headers/page-headers'
import { Cards } from "../components/cards/frame/cards-frame";
import api from "../Services/api";
import { Main } from "../container/styled";

import BankTable from './BankTable';




export default function CAwithOtherBanks() {
    const [stateData, setStateData] = useState("");
    const[CaData,setCaData]=useState([])
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
    const { Option } = Select;
    const [state, setstate] = useState({
      date: null,
      dateString: null,
    });
    

    useEffect(() => {
        getData();
        districtList();
        bankyList();
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

      
      const districtList = () => {
        const acToken = localStorage.getItem("accessToken");
        api.getDistrictList(acToken).then((response) => {
          // console.log("district-", response.data, null, 2)
          setDistrict(response.data);
        });
      };

      const bankyList = () => {
        const acToken = localStorage.getItem("accessToken");
        console.log(acToken)
        const bankId = 0;
        const branch_Id = 0;
        api.getbank(acToken,bankId,branch_Id).then((response) => {
          console.log("district-", response.data, null, 2)
          
        });
      };

      const getData = () => {
        const acToken = localStorage.getItem("accessToken");
       
        const bankId = shoudShowBranch ? shoudShowBranch : 0;
        const branch_Id = branchId ? branchId : 0;
        api
          .caData(acToken,bankId,branch_Id)
          .then((response) => {
            console.log("result----->" + JSON.stringify(response.data, null, 2));
            setCaData(response.data);
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
            width:"50%"
          }}
        >
          <div>
            <h1>District</h1>
            <Select
              defaultValue="All"
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
      <PageHeader  />
      <Main>
      <Col flex={1}  style={{width:"100%"}}>
            <Cards  size="Large" style={{width:"100%"}} className="banktab">
            <BankTable data={CaData}/>
            </Cards>
          </Col>
      </Main>
    </div>
  )
}
