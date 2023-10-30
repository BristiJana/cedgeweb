import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { AuthWrapper } from './style';
import { verifyOtp } from '../../../../redux/authentication/actionCreator';
import Heading from '../../../../components/heading/heading';

export default function Otp() {
  // const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    OTP: '',
  });
  const { OTP } = formData;
  const onClick = () => {
    dispatch(verifyOtp(OTP));
  };
  const isLoading = useSelector((state) => state.auth.loading);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log('e.target.value : ', e.target.value,e.target.name );
  };
  // const handleSubmit = useCallback(() => {
  //   // dispatch(login(userNumber, password));
  //   history.push('/admin');
  // }, );
  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form layout="vertical">
          <Heading as="h3">
            Please Verify your <span className="color-secondary">OTP</span>
          </Heading>
          <div>
            <Form.Item
              rules={[{ message: 'Please input your OTP', required: true }]}
              initialValue="name@example.com"
              label="OTP"
            >
              <Input name="OTP" value={OTP} onChange={(e) => onChange(e)} />
            </Form.Item>
            <Form.Item>
              <Button className="btn-signin" htmlType="submit" type="primary" size="large" onClick={onClick}>
                {isLoading ? 'Loading...' : 'Verify '}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </AuthWrapper>
  );
}
