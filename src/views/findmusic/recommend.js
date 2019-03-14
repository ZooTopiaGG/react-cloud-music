import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'components/rightAside/slider';
import List from 'components/rightAside/list';
import { getPersonalized, getDjprogram, getBanner } from 'services/recommend';
import { connect } from 'react-redux';
import {
  fetchBannerList
} from '../../actions/findmusic/recommend'

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalizedList: [],
      djprogramList: [],
      bannerList: []
    }
  }
  _isMounted = false
  async getBannerList() {
    try {
      let res = await getBanner();
      if (res.code === 200) {
        this._isMounted && this.setState({ bannerList: res.banners })
      }
    } catch(e) {
      throw e
    }
  }

  async getPersonalizedList() {
    let res = await getPersonalized();
    if (res && res.code === 200) {
      this._isMounted && this.setState({ personalizedList: res.result })
    }
  }

  async getDjprogramList() {
    let res = await getDjprogram();
    if (res && res.code === 200) {
      this._isMounted && this.setState({ djprogramList: res.result })
    }
  }

  componentDidMount() {
    // this.getBannerList()
    this.getPersonalizedList()
    this.getDjprogramList()
    this._isMounted = true
    // fetchBannerList
    const { dispatch, bannerParam } = this.props
    dispatch(fetchBannerList(bannerParam))
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.bannerParam !== this.props.bannerParam) {
      const { dispatch, bannerParam } = nextProps
      dispatch(fetchBannerList(bannerParam))
    }
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  render () {
    const { personalizedList, djprogramList } = this.state
    const { bannerList } = this.props
    const options = {
      speed: 5000, // default 5000
      bots: true, // show bots default true
      interval: false, // isopen interval
      imgs: bannerList
    }
    return (
      <div className="recommend">
        <Slider options={options}/>
        <div className="category-recommend">
          <div className="recommend-songs flex flex-pack-justify">
            <span>推荐歌单</span>
            <span className="more">更多 ></span>
          </div>
          <List lists={personalizedList} nums="10"/>
        </div>
        <div className="category-recommend">
          <div className="recommend-songs flex flex-pack-justify">
            <span>主播电台</span>
            <span className="more">更多 ></span>
          </div>
          <List lists={djprogramList} nums="5"/>
        </div>
        <div className="category-recommend">
          <div className="recommend-songs flex flex-pack-justify">
            <span>LOOK直播</span>
            <span className="more">更多 ></span>
          </div>
          <List lists={djprogramList} nums="5"/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { requestBannerList, bannerParam }  = state
  const { isFetching, lastUpdated, items: data } = requestBannerList.data || {
    isFetching: true,
    items: [],
    lastUpdated: Date.now()
  }

  return {
    bannerParam,
    bannerList: data.banners,
    isFetching,
    lastUpdated
  }
}

Recommend.propTypes = {
  bannerParam: PropTypes.string.isRequired,
  bannerList: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired
    }).isRequired
  ),
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(Recommend)