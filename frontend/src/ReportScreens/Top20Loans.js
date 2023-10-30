import React, { useEffect, useState } from "react";
import { Row, Col, Select, DatePicker, Button } from "antd";
import { PageHeader } from "../components/page-headers/page-headers";
import { Cards } from "../components/cards/frame/cards-frame";
import api from "../Services/api";
import { Main } from "../container/styled";
import { HorizontalBar } from "react-chartjs-2";
import FeatherIcon from 'feather-icons-react';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import { ExportButtonPageHeader } from "../components/buttons/export-button/export-button";

// import useChartData from '../../hooks/useChartData';
// import { customTooltips } from '../utilities/utilities';
// import { ChartContainer } from '../../container/dashboard/style';

function Top20Loans() {
  const [stateData, setStateData] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [stateData2, setStateData2] = useState("");
  const [account2, setAccount2] = useState("");
  const [amount2, setAmount2] = useState("");
  const [district, setDistrict] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [shoudShowBranch, setShoudShowBranch] = useState(null);
  const [shouldShowBank, setshouldShowBank] = useState(null);
  const [branchId, setBranchId] = useState("");
  const [bankinfo, setBankinfo] = useState("");
  const [result, setResult] = useState([]);
  const [downloadData, setDownlaodData] = useState("");
  const { Option } = Select;
  const [state, setstate] = useState({
    date: null,
    dateString: null,
  });
  const onChangedate = (date, dateString) => {
    setstate({ ...state, date, dateString });
  };

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

  const getBranchId = (value) => {
    console.log("branchid--", value);
    setBranchId(value);
  };

  const districtList = () => {
    const acToken = localStorage.getItem("accessToken");
    api.getDistrictList(acToken).then((response) => {
      // console.log("district-", response.data, null, 2)
      setDistrict(response.data);
    });
  };

  const getData = () => {
    const acToken = localStorage.getItem("accessToken");
    console.log(acToken)
    const report_type = "Top 20 Loans";
    const bankId = shoudShowBranch ? shoudShowBranch : 0;
    const branch_Id = branchId ? branchId : 0;
    api
      .reportsData(acToken, report_type, bankId, branch_Id)
      .then((response) => {
        console.log("result----->" + JSON.stringify(response.data, null, 2));
        setBankinfo(response.data.info);
        setResult(response.data.result);
        setStateData(response.data.web_result[0].barchart[0].labels);
        setAccount(response.data.web_result[0].barchart[0].number_of_account);
        setAmount(response.data.web_result[0].barchart[0].amount);
        downloadApi(
          response.data.info.date,
          response.data.info.name,
          response.data.result
        );
      })
      .catch((err) => {
        console.log("err", err);
      });
    api
      .reportsDataD(acToken, bankId, branch_Id)
      .then((response) => {
        // console.log('----->LoDE-' + JSON.stringify(response.data.web_result[0].barchart[0], null, 2));
        setStateData2(response.data.web_result[0].barchart[0].labels);
        setAccount2(response.data.web_result[0].barchart[0].number_of_account);
        setAmount2(response.data.web_result[0].barchart[0].amount);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const downloadApi = (date, name, result) => {
    console.log("name: ", name);
    console.log("date: ", date);
    console.log("result: ", result);
    const downloadObject = {
      report_type: "Top 20 Loans",
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
      setDownlaodData(response.data);
    });
  };

  const handleExportExcel = (response) => {
    const workbook = XLSX.read(response.excel, { type: "base64" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(excelBlob, "outputofTop20.xlsx");
    console.log("Done");
  };

  const generatePdfFromBase64 = (response) => {
    console.log("responsepdfff: ", response.pdf);
    // Create a link for downloading
    const a = document.createElement("a");
    a.href = "data:application/octet-string;base64," + response.pdf;
    a.download = "document.pdf"; // Set the desired file name
    a.click();
  };

  const filterData = () => {
    const acToken = localStorage.getItem("accessToken");
    const report_type = "Top 20 Loans";
    const bankId = shoudShowBranch ? shoudShowBranch : 0;
    const branch_Id = branchId ? branchId : 0;
    api
      .reportsData(acToken, report_type, bankId, branch_Id)
      .then((response) => {
        console.log("result2----->" + JSON.stringify(response.data, null, 2));
        setStateData(response.data.web_result[0].barchart[0].labels);
        setAccount(response.data.web_result[0].barchart[0].number_of_account);
        setAmount(response.data.web_result[0].barchart[0].amount);
      })
      .catch((err) => {
        console.log("err", err);
      });
    api
      .reportsDataD(acToken, bankId, branch_Id)
      .then((response) => {
        // console.log('----->LoDE-' + JSON.stringify(response.data.web_result[0].barchart[0], null, 2));
        setStateData2(response.data.web_result[0].barchart[0].labels);
        setAccount2(response.data.web_result[0].barchart[0].number_of_account);
        setAmount2(response.data.web_result[0].barchart[0].amount);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const ChartjsHorizontalChart1 = (props) => {
    const { labels, datasets, options, height } = props;
    const data = {
      datasets,
      labels,
    };
    return <HorizontalBar data={data} height={height} options={options} />;
  };

  ChartjsHorizontalChart1.defaultProps = {
    height: 300,
    // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: stateData,
    datasets: [
      {
        // data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
        data: amount,
        backgroundColor: "green",
        barPercentage: 0.6,
      },
      {
        // data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
        data: account,
        backgroundColor: "yellow",
        barPercentage: 0.6,
      },
    ],

    options: {
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        display: false,
        labels: {
          display: false,
        },
      },
      scales: {
        yAxes: [
          {
            stacked: true,
            gridLines: {
              color: "#e5e9f2",
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              fontColor: "#182b49",
            },
          },
        ],
        xAxes: [
          {
            stacked: true,
            gridLines: {
              display: false,
            },

            ticks: {
              beginAtZero: true,
              fontSize: 11,
              fontColor: "#182b49",
            },
          },
        ],
      },
    },
  };

  ChartjsHorizontalChart1.propTypes = {
    height: PropTypes.number,
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf(PropTypes.object),
    options: PropTypes.object,
  };

  const ChartjsHorizontalChart2 = (props) => {
    const { labels, datasets, options, height } = props;
    const data = {
      datasets,
      labels,
    };
    return <HorizontalBar data={data} height={height} options={options} />;
  };

  ChartjsHorizontalChart2.defaultProps = {
    height: 300,
    // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: stateData2,
    datasets: [
      {
        // data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
        data: amount2,
        backgroundColor: "red",
        barPercentage: 1,
      },
      {
        // data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
        data: account2,
        backgroundColor: "blue",
        barPercentage: 1,
      },
    ],

    options: {
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        display: false,
        labels: {
          display: false,
        },
      },
      scales: {
        yAxes: [
          {
            stacked: true,
            gridLines: {
              color: "#e5e9f2",
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              fontColor: "#182b49",
            },
          },
        ],
        xAxes: [
          {
            stacked: true,
            gridLines: {
              display: false,
            },

            ticks: {
              beginAtZero: true,
              fontSize: 11,
              fontColor: "#182b49",
            },
          },
        ],
      },
    },
  };

  ChartjsHorizontalChart2.propTypes = {
    height: PropTypes.number,
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf(PropTypes.object),
    options: PropTypes.object,
  };

  return (
    <>
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
              onChange={ShowBank}
            >
              {district.map((item) => (
                // console.log("item-----------------",item)
                <Option value={item.id}>{item.district_name}</Option>
              ))}
            </Select>
          </div>

          <div>
            {shouldShowBank != null ? (
              <div>
                <h1>Member Bank</h1>
                <Select
                  defaultValue="Select Bank"
                  style={{ width: 200 }}
                  onChange={ShowBranch}
                >
                  {bankList?.map((item) => (
                    <Option value={item.id}>{item.bank_name}</Option>
                  ))}
                </Select>
              </div>
            ) : (
              <div>
                <h1>Member Bank</h1>
                <Select
                  defaultValue="Select Bank"
                  style={{ width: 200 }}
                  onChange={ShowBranch}
                  disabled
                >
                  {bankList?.map((item) => (
                    <Option value={item.id}>{item.bank_name}</Option>
                  ))}
                </Select>
              </div>
            )}
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
            ) : (
              <div>
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
              </div>
            )}
          </div>

          <Button
            size="default"
            outlined
            type="info"
            style={{ alignSelf: "flex-end"}}
            onClick={filterData}
          >
            Apply
          </Button>

          {/* <DatePicker onChange={onChangedate} /> */}
          {/* <ExportButtonPageHeader /> */}
          <div style={{ alignSelf: "flex-end" }}>
            <FeatherIcon
              size={24}
              icon="file"
              onClick={generatePdfFromBase64}
            />
            <span>PDF</span>
          </div>
          <div style={{ alignSelf: "flex-end" }}>
            <FeatherIcon size={24} icon="file" onClick={handleExportExcel} />
            <span>Excel</span>
          </div>
        </div>
      </Cards>
      <PageHeader title="Top 20 Loans and Deposits" />
      <Main>
        <Row gutter={25}>
          <Col md={12} xs={24}>
            <Cards title="Top 20 Loans" size="Large">
              <ChartjsHorizontalChart1 />
            </Cards>
          </Col>
          <Col md={12} xs={24}>
            <Cards title="Top 20 Deposits" size="large">
              <ChartjsHorizontalChart2 />
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Top20Loans;
