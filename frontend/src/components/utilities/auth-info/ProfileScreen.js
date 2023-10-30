import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { AuthWrapper } from '../../../container/profile/authentication/overview/style';
import Heading from '../../heading/heading';

export default function ProfileScreen() {
  const [formData] = useState({
    username: '',
    password: '',
  });
  const { username } = formData;
  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="login" layout="vertical">
          <Heading as="h3">
            Sign in to <span className="color-secondary">MIS Dashboard</span>
          </Heading>
          <Form.Item
            rules={[{ message: 'Please input your username or Email!', required: true }]}
            initialValue="name@example.com"
            label="Username or Email Address"
          >
            <Input name="username" value={username} />
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
}
