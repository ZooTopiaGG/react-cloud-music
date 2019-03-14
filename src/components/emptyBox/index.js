import React, { Component } from 'react'
import './index.less'
import { Button } from 'antd';
export default class EmptyBox extends Component {
  render() {
    return (
      <div className="empty-box">
        <img src="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original" alt=""/>
        <div className="desc">
          <span>
            Customize <a href="#API">Description</a>
          </span>
        </div>
        <Button type="primary">Don`t Click Me</Button>
      </div>
    )
  }
}