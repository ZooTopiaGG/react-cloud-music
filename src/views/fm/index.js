import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash'
import './index.less'
import { fetchFmList } from '../../actions/fm'
class FM extends Component {
  constructor() {
    super();
    this.state = {}
  }
  // async getBannerList() {
  //   try {
  //     let res = await getPersonalFm();
  //     if (res.code === 200) {
  //       this._isMounted && this.setState({ bannerList: res.banners })
  //     }
  //   } catch(e) {
  //     throw e
  //   }
  // }
  componentDidMount() {
    const { dispatch, fmParam } = this.props
    dispatch(fetchFmList(fmParam))
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, fmParam } = nextProps
    if (this.props.fmParam !== nextProps.fmParam) {
      dispatch(fetchFmList(fmParam))
    }
  }
  shouldComponentUpdate(nextProps) {
    return !(_.isEqual(nextProps, this.props))
  }
  render () {
    const { data=[] } = this.props
    console.log('data:::::::::::', data)
    return (
      <div className="box fm-box">
        This is fm page
        {
          data.map(x => (
            <div key={x.name}>{x.name}</div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { requestFmList } = state
  console.log('state:', state)
  const { isFetching, lastUpdateAt, items: data } = requestFmList.data || {
    isFetching: true,
    lastUpdateAt: '',
    items: {}
  }
  console.log('data:', data.data)
  return {
    isFetching,
    lastUpdateAt,
    data: data.data
  }
}

export default connect(mapStateToProps)(FM)