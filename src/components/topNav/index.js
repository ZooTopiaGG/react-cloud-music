import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Input, Avatar } from 'antd';
// import { getSongUrl } from 'services/api';
import './index.less';
import { LoginForm } from '../login';
import {
  fetchLogin
} from '../../actions'
const Search = Input.Search;

// const ipcRenderer = window.require('electron').ipcRenderer;

let ipcRenderer;
let isFullScreen = false;
class TopNav extends Component {
  constructor() {
    super();
    this.state = {
      appName: '网易云音乐',
      show: false
    };
  }
  handleClick() {
    this.setState({
      show: true
    })
  }
  async handleSubmmit(values) {
    const { dispatch } = this.props
    await dispatch(fetchLogin(values))
    localStorage.setItem('userInfo', JSON.stringify(this.props.data))
    this.setState({
      show: !this.props.isShow
    })
  }
  componentDidMount() {
    this.handleMinus()
    this.handleFullScreen()
    this.handleClose()
  }

  handleMinus() {
    document.querySelector('.win-minus').addEventListener('click', function() {
      ipcRenderer.send('hide-window', 'hide');
    })
  }
  handleFullScreen() {
    document.querySelector('.win-fullscreen').addEventListener('click', function() {
      if (isFullScreen) {
        ipcRenderer.send('original-window', 'full-screen');
        ipcRenderer.once('original-reply', function(event, arg) {
          isFullScreen = arg
        });
      } else {
        ipcRenderer.send('fullscreen-window', 'full-screen');
        ipcRenderer.once('fullscreen-reply', function(event, arg) {
          isFullScreen = arg
        });
      }
    })
  }
  handleClose() {
    document.querySelector('.win-close').addEventListener('click', function() {
      ipcRenderer.send('window-all-closed', 'closed');
    })
  }
  render() {
    var noDrag = {
      WebkitAppRegion: 'no-drag'
    }
    let local = localStorage.getItem('userInfo')
    let userInfo = JSON.parse(local)
    let user = null;
    if (local !== '{}' && userInfo.profile) {
      user = <div className="info-login pointer info-hover flex flex-align-center flex-pack-center">
        <Avatar size={26} src={userInfo.profile.avatarUrl} style={{ marginRight: 5 }}/>
        <span>{ userInfo.profile.nickname }</span>
      </div>
    } else {
      user = <div className="info-login pointer info-hover flex flex-align-center flex-pack-center" onClick={this.handleClick.bind(this)}>
        <Avatar size={26} icon="user" style={{ marginRight: 5 }}/>
        <span>未登录</span>
      </div>
    }
    return (
      <div className="top-nav flex">
        {/* 头部左边 */}
        <div className="header-logo pointer flex flex-align-center">
          <Icon type="google" className="google-icon" />
          <span>{ this.state.appName }</span>
        </div>
        {/* 头部中间偏左 */}
        <div className="header-search" style={noDrag}>
          <Search
            placeholder="搜索音乐，电台，歌单，明星"
            onSearch={value => console.log(value)}
            style={{ width: 300 }}
          />
        </div>
        <div className="flex-1"></div>
        {/* 头部右边 */}
        <div className="header-info flex flex-align-center" style={noDrag}>
          { user }
          <div className="info-link flex flex-pack-justify">
            <Icon type="skin" className="pointer info-hover"/>
            <Icon type="heart" className="pointer info-hover"/>
            <Icon type="desktop" className="pointer info-hover"/>
            <Icon type="download" className="pointer info-hover"/>
          </div>
          <span style={{ color: '#aaa', marginLeft: 20, marginRight: 20, fontSize: 14 }}>|</span>
          <div className="info-link flex flex-pack-justify">
            <Icon type="fork" className="pointer info-hover"/>
            <Icon type="minus" className="pointer win-minus info-hover" onClick={this.handleMinus}/>
            <Icon type="fullscreen" className="pointer win-fullscreen info-hover" onClick={this.handleFullScreen}/>
            <Icon type="close" className="pointer win-close info-hover" onClick={this.handleClose}/>
          </div>
        </div>
        <LoginForm show={this.state.show} onSubmmit={ (values) => this.handleSubmmit(values) }/>
      </div>
    )
  } 
}

const mapStateToProps = state => {
  const { userLoginParam, requestInfo } = state
  const { isShow, lastUpdated, items: data } = requestInfo.data || {
    isShow: true,
    items: {},
    lastUpdated: Date.now()
  }
  return {
    userLoginParam,
    isShow,
    data,
    lastUpdated
  }
}

export default connect(mapStateToProps)(TopNav)