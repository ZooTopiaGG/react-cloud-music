import React, { Component } from 'react'
import EmptyBox from 'components/emptyBox'

class Songs extends Component {
  constructor() {
    super();
    this.state = {}
  }
  render () {
    return (
      <div className="recommend">
        <EmptyBox/>
      </div>
    )
  }
}

export default Songs