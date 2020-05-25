import React, { Component } from 'react'

import style from './DefaultMobileFooter.module.css'
import { Link } from 'react-router-dom'

export class index extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    return (
      <div className={style.mobileFooterBox}>
        { this.props._nav.map((key, index) =>
          key.mainNav ? 
          <Link key={index} to={key.url}>
            <img src={this.props.navOn === key.url ? key.iconOn : key.icon } alt="" className={style.mobileNavIcon} />
          </Link>
          :null
        )}
      </div>
    )
  }
}

export default index
