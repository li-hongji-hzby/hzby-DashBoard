import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import './DefaultFooter.css'

export class DefaultFooter extends Component {

  render() {
    return (
      <Row lg={12} md={12} sm={12} className="h-56 m-0 d-flex justify-content-center align-items-center">
        <div className="footer-logo-box d-flex justify-content-center align-items-center dark-black">
          Footer
        </div>
        <Col className="footer-box h-56 d-flex justify-content-start align-items-center pt-2 pb-2 pl-3 pr-3 self-border-top-dark">
          涵智博雅 © 2020 creativeLabs.
        </Col>
      </Row>
    )
  }
}

export default DefaultFooter