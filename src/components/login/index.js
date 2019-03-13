import React, { Component } from 'react';
import {
  Form, Icon, Input, Button, Checkbox
} from 'antd';
import './index.less'

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        delete values['remember']
        this.props.onSubmmit(values)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { show } = this.props;
    console.log('this.props:::::',  this.props)
    return show ? (<div className="login flex flex-v flex-align-center flex-pack-center">
      <div className="logo">
        <Icon type="github" style={{ fontSize: '48px',color: 'rgb(242, 156, 159)' }}/>
      </div>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入手机号" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="输入密码" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a className="login-form-forgot" href="javascrpt:;">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登 录
          </Button>
          <a href="javascrpt:;">立即注册</a>
        </Form.Item>
      </Form>
    </div>) : null;
  }
}

export const LoginForm = Form.create({ name: 'normal_login' })(Login);
