import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

import brand from './brand.png'
import style from './DefaultFooter.module.css'

export class index extends Component {

  render() {
    return (
      <Row lg={12} md={12} sm={12} className="h-56 m-0 d-flex justify-content-center align-items-center">
        <div className={style.footerLogoBox + " d-flex justify-content-center align-items-center self-border-top-dark self-border-right-dark"}>
          <img src={brand} style={{"width":"80%"}} alt=""/>
        </div>
        <Col className={style.footerBox + " h-56 d-flex justify-content-start align-items-center pt-2 pb-2 pl-3 pr-3 self-border-top-dark"}>
        </Col>
      </Row>
    )
  }
}

export default index
