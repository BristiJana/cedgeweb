import React, { useState, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Form, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Auth0Lock } from 'auth0-lock';
import { AuthWrapper } from './style';
import { login, verifyOtp } from '../../../../redux/authentication/actionCreator';
import Heading from '../../../../components/heading/heading';
import { auth0options } from '../../../../config/auth0';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();
  const [showOtp, setShowOtp] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const handleSubmit = useCallback(() => {
    history.push('/admin');
  }, [history, dispatch]);
  const [formDataOTP, setFormDataOTP] = useState({
    OTP: '',
  });
  const { OTP } = formDataOTP;
  const { username, password } = formData;
  const onClick = () => {
    if (dispatch(login(username, password, showOtp, setShowOtp))) {
      setShowOtp(false);
    }
  };
  const onClickOtp = () => {
    dispatch(verifyOtp(OTP, handleSubmit));
    handleSubmit();
  };
  // const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log('e.target.value : ', e.target.value,e.target.name );
  };
  const onChangeOTP = (e) => {
    setFormDataOTP({ ...formDataOTP, [e.target.name]: e.target.value });
    // console.log('e.target.value : ', e.target.value,e.target.name );
  };
  // const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const lock = new Auth0Lock(clientId, domain, auth0options);

  // const onChangeChecked = (checked) => {
  //   setState({ ...state, checked });
  // };

  lock.on('authenticated', (authResult) => {
    lock.getUserInfo(authResult.accessToken, (error) => {
      if (error) {
        return;
      }

      handleSubmit();
      lock.hide();
    });
  });

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="login" form={form} layout="vertical">
          {showOtp ? (
            <div>
              <Heading as="h3">
                Sign in to <span className="color-primary">MIS Dashboard</span>
              </Heading>
              <Form.Item
                rules={[{ message: 'Please input your username or Email!', required: true }]}
                initialValue="name@example.com"
                label="Username or Email Address"
              >
                <Input name="username" value={username} onChange={(e) => onChange(e)} />
              </Form.Item>
              <Form.Item name="password" initialValue="Apexuser_123" label="Password">
                <Input.Password placeholder="Password" name="password" value={password} onChange={(e) => onChange(e)} />
              </Form.Item>
              <Form.Item>
                <Button className="btn-signin" htmlType="submit" type="primary" size="large" onClick={onClick}>
                  {isLoading ? 'Loading...' : 'Sign In'}
                </Button>
              </Form.Item>
            </div>
          ) : (
            <div>
              <Heading as="h3">
                Please Verify your <span className="color-secondary">OTP</span>
              </Heading>
              <div>
                <Form.Item
                  rules={[{ message: 'Please input your OTP', required: true }]}
                  initialValue="name@example.com"
                  label="OTP"
                >
                  <Input name="OTP" value={OTP} onChange={(e) => onChangeOTP(e)} />
                </Form.Item>
                {/* <Form.Item>
                  <Button className="btn-signin" htmlType="submit" type="primary" size="large" onClick={onClickOtp}>
                    {isLoadingOTP ? 'Loading...' : 'Verify '}
                  </Button>
                </Form.Item> */}
                { OTP.length == 6 ? <Link to="/admin" onClick={onClickOtp}>
                  Verify
                </Link>:null }
                
              </div>
            </div>
          )}
        </Form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
