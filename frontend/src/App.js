import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from "react-hot-loader/root";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import { ConfigProvider, Spin } from "antd";
import store, { rrfProps } from "./redux/store";
import Admin from "./routes/admin";
import Auth from "./routes/auth";
import "./static/css/style.css";
import config from "./config/config";
// import ProtectedRoute from './components/utilities/protectedRoute';
import "antd/dist/antd.less";

const { theme } = config;

const ProviderConfig = () => {
  const { rtl, isLoggedIn, topMenu, darkMode, auth } = useSelector((state) => {
    console.log("State----", JSON.stringify(state.auth.login, null, 2));
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
      auth: state.fb.auth,
    };
  });

  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    let unmounted = false;
    console.log("WHAT IS THIS?--", window.location.pathname);
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  return (
    <ConfigProvider direction={rtl ? "rtl" : "ltr"}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu, darkMode }}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          {!isLoaded(auth) ? (
            <div className="spin">
              <Spin />
            </div>
          ) : (
            <Router>
              {/* {!isLoggedIn ? (
                <Route path="/" component={Auth} />
              ) : (
                <Route path="/admin" component={Admin} />
              )} */}
              {localStorage.getItem("accessToken") ? (
                <Route path="/admin" component={Admin} />
              ) : (
                <Route path="/" component={Auth} />
              )}
            </Router>
          )}
        </ReactReduxFirebaseProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />

      {/* <Router>{!localStorage.getItem("accessToken") ?(<Route path="/" component={Auth} />):( <Route path="/admin" component={Admin} />)}</Router> */}
    </Provider>
  );
}

export default hot(App);
