import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';
var timer = {}, index = 0;
class Slider extends Component {
  constructor(props) {
    super(props);
    const { speed, bots, interval, imgs } = this.props.options;
    var dir = [{name: 'middle'},{name: 'start'},{name: 'end'}];
    
    this.state = {
      dir: dir,
      currentKey: '',
      options: {
        speed: speed || 5000, // default 5000
        bots: bots, // show bots default true
        interval: interval, // isopen interval
        imgs: imgs
      }
    }
  }
  handleSlider(item, key) {
    this.setState({ currentKey: key });
    index = key;
    this.imgArr(item, key);
  }
  async imgArr(item) {
    let dirCopy = this.state.dir;
    if (item.name === 'start') {
      const pop = await dirCopy.pop(); // 从数组尾部弹出一个元素
      dirCopy.unshift(pop); // 尾部元素添加到数组头部
    } else if (item.name === 'end') {
      const pop = await dirCopy.shift(); // 从数组头部弹出一个元素
      dirCopy.push(pop); // 头部元素添加到数组尾部
    }
    this.setState({
      dir: dirCopy
    });  // 保存重新排列的数组 并触发render
  }
  pointFunc(key) { // 按钮点击
    const { currentKey } = this.state;
    const dirCopy = this.state.dir;
    index = key;
    if (key < currentKey) { // 鼠标经过左侧的按钮
      for (let i = 0; i < (currentKey - key); i += 1) { // 判断距离
        const shift = dirCopy.shift(); // 进行数组操作
        dirCopy.push(shift);
      }
    } else if (key > currentKey) { // 鼠标经过右侧的按钮
      for (let i = 0; i < (key - currentKey); i += 1) {
        const pop = dirCopy.pop();
        dirCopy.unshift(pop);
      }
    }
    this.setState({
      dir: dirCopy, // 触发react-render重新渲染页面
      currentKey: key // 记录当前图片节点
    }); 
    this.setState({ }); 
  }
  handleEnterSlider() {
    this.state.options.interval && clearInterval(timer)
  }
  handleLeaveSlider() {
    this.state.options.interval && this.handleSetInterval()
  }
  handleSetInterval() {
    const { speed } = this.state.options;
    timer = setInterval(() => {
      index ++;
      index = index > 5 ? 0 : index;
      this.pointFunc(index)
    }, speed)
  }
  componentDidMount() {
    this.state.options.interval && this.handleSetInterval()
  }
  componentWillUnmount () {
    this.state.options.interval && clearInterval(timer)
  }
  componentWillReceiveProps (nextProps) {
    const { dir } = this.state;
    const _imgs = nextProps.options.imgs
    if (_imgs && _imgs.length > 0) {
      if (_imgs.length > 3 && dir.length < _imgs.length) {
        for(var i = 0, dirLen = _imgs.length - 3; i< dirLen; i++) {
          dir.splice(dir.length-1, 0, { name: 'normal' });
        }
      } 
    }
  }
  render () {
    const { dir } = this.state;
    const { imgs, bots } = this.props.options;
    return imgs && imgs.length > 0 ? (
      <div className="slider"
        onMouseEnter={() => this.handleEnterSlider()}
        onMouseLeave={() => this.handleLeaveSlider()}>
        <div className="slider-box">
          {
            dir.map((item, key) => {
              return (
                <div className={`slider-item slider-${item.name}`} key={key}>
                  <img src={imgs[key].imageUrl} alt="banner"/>
                  <div className={ item.name === 'middle' ? '' : 'masking' } onClick={ () => {this.handleSlider(item, key)} }></div>
                </div>
              )
            })
          }
        </div>
        <div className={ bots ? 'slider-bots' : 'slider-bots slider-bots-hide' }>
          <div className="slider-point">
            {
              dir.map((item, key) => {
                return (
                  <span key={key} className={item.name === 'middle' ? 'point-hover': ''} onMouseEnter={() => this.pointFunc(key)}></span>
                )
              })
            }
          </div>
        </div>
      </div>
    ) : null
  }
}

Slider.propTypes = {
  options: PropTypes.shape({
    speed: PropTypes.number,
    bots: PropTypes.bool,
    interval: PropTypes.bool,
    imgs: PropTypes.array
  })
}

export default Slider
