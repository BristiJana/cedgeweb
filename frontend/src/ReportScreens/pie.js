import React, { useEffect, useState, Suspense, lazy } from "react";
import { Row, Col, Select, DatePicker, Button, Skeleton } from "antd";

// import LoanData from "./LoanSummaryData";
import { Chart } from "react-google-charts";

import { Cards } from "../components/cards/frame/cards-frame";

import { Table } from "antd";
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
export default function pie(props) {
  
    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const ChartjsStackedChart = (props) => {
        const { labels, datasets, options, height } = props;
        const data = {
          datasets,
          labels,
        };
        return <Bar data={data} height={height} options={options} />;
      };
    
      ChartjsStackedChart.defaultProps = {
        height: 200,
        labels: ["Today", "Prev friday", "Prev month", "31 March"],
    
        datasets: [
          {
            data: [206.9, 102.27, 123.0, 140.53],
            backgroundColor: "#001737",
            barPercentage: 0.8,
          },
          {
            data: [72, 32, 23, 41],
            backgroundColor: "#1ce1ac",
            barPercentage: 0.8,
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
    
      ChartjsStackedChart.propTypes = {
        height: PropTypes.number,
        labels: PropTypes.arrayOf(PropTypes.string),
        datasets: PropTypes.arrayOf(PropTypes.object),
        options: PropTypes.object,
      };
    
      
      const trafficTableColumns = [
        {
          dataIndex: "Product",
          key: "Product",
        },
        {
          dataIndex: "Amount",
          key: "Amount",
        },
      ];
      const trafficTableData = [
        {
          // key: "1",
          Product: <span className="traffic-title">Product</span>,
          Amount: <span className="traffic-title">Amount</span>,
        },
      ];
    
      const chartOptions = {
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
                display: false,
              },
              ticks: {
                display: false,
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
                display: false,
              },
            },
          ],
        },
      };
      
    
      const Data =
      props.data && props.data.piechart
        ? [
            ["Deposit Type", "amount"],
            ...props.data.piechart.labels.map((label, index) => [label, props.data.piechart.data[index]]),
          ]
        : null;
    
    console.log(Data || 'props.data.piechart is undefined or null');
    

  return (
    <div>
      
        <Row gutter={25}>
          <Col xxl={10} md={10} sm={10} xs={10}>
            <Cards title="Category Distribtion" size="large">
              
              <Chart
                width="100%"
                height="300px"
                chartType="PieChart"
                chartArea="100%"
               
                loader={<div>Loading Chart</div>}
                data={Data}
                options={{
                  chartArea: { width: "100%" },
                  
                }}
               
                rootProps={{ "data-testid": "9" }}
              />
            </Cards>
          </Col>
          {modalIsOpen ? (
            <Cards headless size="large">
              <Table
                columns={trafficTableColumns}
                dataSource={trafficTableData}
                pagination={false}
              />
            </Cards>
          ) : null}
          <Col xxl={10} md={10} sm={10} xs={10}>
            <Cards title="Loan Amount Comparison" size="large">
              <ChartjsStackedChart />
            </Cards>
          </Col>
        </Row>
      </div>
    
  );}


