import React, { Component } from 'react';
import './index.less';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      lists: nextProps.lists.slice(0, nextProps.nums)
    })
  }
  render() {
    let { lists } = this.state
    return (
      <div className="list flex flex-align-center flex-wrap">
        {
          lists.map(x => {
            return (
              <div className="list-cell" key={x.id}>
                <div className="list-box">
                  <div className="cell-number">{x.playCount && parseInt(x.playCount)}</div>
                  <div className="cell-box">
                    <img src={x.picUrl} alt="logo" />
                  </div>
                </div>
                <div className="cell-title">{x.name}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default List
