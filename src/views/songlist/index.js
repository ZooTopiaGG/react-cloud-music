import React, { Component } from 'react'
import EmptyBox from 'components/emptyBox'

export default class SongList extends Component {
  constructor() {
    super();
    this.state = {}
  }
  render () {
    return (
      <div>
        <EmptyBox/>
      </div>
    )
  }
}
