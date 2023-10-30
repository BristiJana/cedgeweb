import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { NavLink, useRouteMatch } from "react-router-dom";
// import { ReactSVG } from 'react-svg';
import FeatherIcon from "feather-icons-react";
import api from "../../src/Services/api";
// import axios from 'axios';
import propTypes from "prop-types";
import { Nav } from "react-bootstrap";
// import { NavTitle } from './style';
// import versions from '../demoData/changelog.json';

const { SubMenu } = Menu;

function MenuItems({ darkMode, toggleCollapsed, topMenu }) {
  const { path } = useRouteMatch();
  const [data, setData] = useState();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split("/");
  // const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight, modeChangeTopNav, modeChangeSideNav } = events;
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu
      ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : "dashboard"}`]
      : []
  );

  const onOpenChange = (keys) => {
    setOpenKeys(
      keys[keys.length - 1] !== "recharts"
        ? [keys.length && keys[keys.length - 1]]
        : keys
    );
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  useEffect(() => {
    getData();
    // user();
  }, []);

  const getData = () => {
    const acToken = localStorage.getItem("accessToken");
    api.getUserDetails(acToken).then((res) => {
      user(res);
    });
  };

  const user = (res) => {
    console.log("this is hii from panel: ", res);

    const acToken = localStorage.getItem("accessToken");
    api
      .getLeftPanelData(acToken, res.data[0].user_id, res.data[0].role_id)
      .then((response) => {
        // console.log("left panel----->" + JSON.stringify(response.data, null, 2));
        setData(response.data);
        // setSubMenu(response.data.submenu_level1)
      })
      .catch((err) => {
        console.log("erroorrrr", err);
      });
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? "inline" : "horizontal"}
      theme={darkMode && "dark"}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1
                  ? "home"
                  : mainPathSplit.length === 2
                  ? mainPathSplit[1]
                  : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={
        !topMenu
          ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : "dashboard"}`]
          : []
      }
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <SubMenu
        key="dashboard"
        icon={!topMenu && <FeatherIcon icon="home" />}
        title="Dashboard"
      >
        {data?.map((item) => {
          // console.log(item);
          return (
            <Menu.Item>
              <NavLink
                onClick={toggleCollapsed}
                to={`${path}/${item.module_path}`}
              >
                {item.form_name}
              </NavLink>
            </Menu.Item>
          );
        })}
      </SubMenu>
      <SubMenu key="Tenant Setup" title="Tenant Setup">
        <Menu.Item >
          <NavLink onClick={toggleCollapsed} to={`${path}/TenantHierarchy`}>
            Tenant Hierarchy 
          </NavLink>
        </Menu.Item>
        <Menu.Item >
          <NavLink onClick={toggleCollapsed} to={`${path}/TenantOnBoard`}>
            Tenant OnBoard
          </NavLink>
        </Menu.Item>
        <Menu.Item >
          <NavLink onClick={toggleCollapsed} to={`${path}/RoleTenantdefine`}>
           Role Tenant Define 
          </NavLink>
        </Menu.Item>
        <Menu.Item >
          <NavLink onClick={toggleCollapsed} to={`${path}/UserRegistration`}>
           User Registration
          </NavLink>
        </Menu.Item>
        <Menu.Item >
          <NavLink onClick={toggleCollapsed} to={`${path}/PagesRoleDefine`}>
           Pages Role Define
          </NavLink>
        </Menu.Item> 
      </SubMenu>
      <SubMenu key="Common Setup" title="Common Setup">
        <Menu.Item>
          <NavLink  onClick={toggleCollapsed} to={`${path}/FileStructureDefine`}>
          File Structure Define
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink  onClick={toggleCollapsed} to={`${path}/ProductMapping`}>
          Product Mapping Define
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink  onClick={toggleCollapsed} to={`${path}/CategoryMapping`}>
          Category Mapping Define
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="Storage Setup" title="Storage Setup">
      <Menu.Item>
          <NavLink  onClick={toggleCollapsed} to={`${path}/DefineSFTPServer`}>
          DefineSFTPServer
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink  onClick={toggleCollapsed} to={`${path}/BankStorage`}>
         BankStorage
          </NavLink>
        </Menu.Item>
      
      </SubMenu>
     
    </Menu>
  );
}

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
  // events: propTypes.object,
};

export default MenuItems;
