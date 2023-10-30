import React from 'react';
import { Progress } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useSelector } from 'react-redux';
import { OverviewCard } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { Dropdown } from '../../../../components/dropdown/dropdown';
import BarChartData from '../../../../ReportScreens/BarChatData';

function DailyOverview() {
  const { rtl } = useSelector((state) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });

  return (
    <OverviewCard>
      {BarChartData.map((item)=>(
        <div>
      <div className="d-flex align-items-center justify-content-between overview-head">
        <Heading as="h4">Short Term Loan</Heading>
      </div>
      <div className="overview-box">
        <Cards headless>

          <div className="d-flex align-items-center justify-content-between">
            <div className="overview-box-single">
              <Heading as="h2" className="color-primary">
                {item.Amount?item.Amount:0}
              </Heading>
              <h4>{item.occurence}</h4>
            </div>
          </div>

          <Progress percent={item.growth?item.growth:0} showInfo={false} className="progress-primary" />

          <p>
            {item.growth > 0 ? <span className="growth-upward">
              <FeatherIcon icon="arrow-up" size={14} />
              {item.growth}% 
            </span>:<span className="growth-downward">
              <FeatherIcon icon="arrow-down" size={14} />
              {item.growth}% 
            </span>}
          </p>
        </Cards>
      </div>
      </div>
      ))}

    </OverviewCard>
  );
}

export default DailyOverview;
