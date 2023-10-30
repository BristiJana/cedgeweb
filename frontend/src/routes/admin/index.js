import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Dashboard from './dashboard';
import Ecommerce from './ecommerce';
import LoanSummary from '../../ReportScreens/LoanSummary';
import Top20Loans from '../../ReportScreens/Top20Loans';
import Top20Housing from '../../ReportScreens/Top20Housing';
// import Pages from './pages';
// import Users from './users';
// import Widgets from './widgets';
// import Features from './features';
// import Axios from './axios';
// import Gallery from './gallery';
import withAdminLayout from '../../layout/withAdminLayout';
import ProfileScreen from '../../components/utilities/auth-info/ProfileScreen';
import Otp from '../../container/profile/authentication/overview/Otp';
import Cashinhand from '../../ReportScreens/Cashinhand';
import KCCkharif from '../../ReportScreens/KCC-kharif';
import KCCRabi from '../../ReportScreens/KCC-rabi';
import CashinAtm from '../../ReportScreens/CashinAtm';
import CashCreditFertilizer from '../../ReportScreens/CashCreditFertilizer';
import DCCBwiseFd from '../../ReportScreens/DCCBwiseFd';
import CAwithOtherBanks from '../../ReportScreens/CAwithOtherBanks';
import OtherBankTermDeposit from '../../ReportScreens/OtherBankTermDeposit';
import UnclaimDeposit from '../../ReportScreens/UnclaimDeposit';
import DepositSummary from '../../ReportScreens/DepositSummary';
import Form from '../../ReportScreens/Form';
import TenantHierarchy from '../../AdminPanelScreens/TenantHierarchy';
import TenantOnBoard from '../../AdminPanelScreens/TenantOnBoard';
import RoleTenantdefine from '../../AdminPanelScreens/RoleTenantdefine';
import UserRegistration from '../../AdminPanelScreens/UserRegistration';
import PagesRoleDefine from '../../AdminPanelScreens/PagesRoleDefine';
import FileStructureDefine from '../../AdminPanelScreens/FileStructureDefine';
import ProductMapping from '../../AdminPanelScreens/ProductMapping';
import CategoryMapping from '../../AdminPanelScreens/CategoryMapping';
import BankStorageLink from '../../AdminPanelScreens/BankStorageLink';
import DefineSFTPServer from '../../AdminPanelScreens/DefineSFTPServer';
function Admin() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={`${path}/loan-summary`} component={LoanSummary} />
        <Route path={`${path}/top20loans`} component={Top20Loans} />
        <Route path={`${path}/top20housing`} component={Top20Housing} />
        <Route path={path} component={Dashboard} />
        <Route path={`${path}/Otp`} component={Otp} />
        <Route path={`${path}/ecommerce`} component={Ecommerce} />
        <Route path={`${path}/profile`} component={ProfileScreen} />
        <Route path={`${path}/Cashinhand`} component={Cashinhand} />
        <Route path={`${path}/KCCkharif`} component={KCCkharif} />
        <Route path={`${path}/KCCRabi`} component={KCCRabi} />
        <Route path={`${path}/CashinAtm`} component={CashinAtm} />
        <Route path={`${path}/CashCreditFertilizer`} component={CashCreditFertilizer} />
        <Route path={`${path}/DCCBwiseFd`} component={DCCBwiseFd} />
        <Route path={`${path}/CAwithOtherBanks`} component={CAwithOtherBanks} />
        <Route path={`${path}/OtherBankTermDeposit`} component={OtherBankTermDeposit} />
        <Route path={`${path}/UnclaimDeposit`} component={UnclaimDeposit} />
        <Route path={`${path}/DepositSummary`} component={DepositSummary} />
        <Route path={`${path}/Form`} component={Form} /> 
        <Route path={`${path}/TenantHierarchy`} component={TenantHierarchy} /> 
        <Route path={`${path}/TenantOnBoard`} component={TenantOnBoard} /> 
        <Route path={`${path}/RoleTenantdefine`} component={RoleTenantdefine} /> 
        <Route path={`${path}/UserRegistration`} component={UserRegistration} /> 
        <Route path={`${path}/PagesRoleDefine`} component={PagesRoleDefine} /> 
        <Route path={`${path}/FileStructureDefine`} component={FileStructureDefine} /> 
        <Route path={`${path}/ProductMapping`} component={ProductMapping} /> 
        <Route path={`${path}/CategoryMapping`} component={CategoryMapping} /> 
        <Route path={`${path}/DefineSFTPServer`} component={DefineSFTPServer} /> 
        <Route path={`${path}/BankStorage`} component={BankStorageLink}/>
        
      
        {/* <Route path={`${path}`} component={Pages} />
        <Route path={`${path}`} component={Features} />
        <Route path={`${path}`} component={Axios} />
        <Route path={`${path}/users`} component={Users} />
        <Route path={`${path}/gallery`} component={Gallery} /> */}
        {/* <Route path={`${path}/project`} component={Projects} />
        <Route path={`${path}/calendar`} component={Calendars} />        
        <Route path={`${path}/app/kanban`} component={Kanban} />
        <Route path={`${path}/email/:page`} component={Inbox} />
        <Route path={`${path}/firestore`} component={Firebase} />
        <Route path={`${path}/main/chat`} component={Chat} />
        <Route path={`${path}/profile/myProfile`} component={Myprofile} />
        <Route path={`${path}/app/to-do`} component={ToDo} />
        <Route path={`${path}/app/note`} component={Note} />
        <Route path={`${path}/app/task`} component={Task} />
        <Route path={`${path}/contact/list`} component={Contact} />
        <Route path={`${path}/contact/grid`} component={ContactGrid} />
        <Route path={`${path}/contact/addNew`} component={ContactAddNew} />
        <Route path={`${path}/app/calendar`} component={Calendar} /> */}
        {/* <Route path={`${path}/widgets`} component={Widgets} /> */}
      </Suspense>
    </Switch>
  );
}

export default withAdminLayout(Admin);
