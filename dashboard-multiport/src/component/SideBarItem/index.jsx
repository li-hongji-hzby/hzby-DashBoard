import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./style.css"

const defaultData={
  "name":"测试菜单",
  "url":"/test",
  "children":[
    {
      "name":"测试菜单",
      "url":"/test",
    },
    {
      "name":"测试菜单",
      "url":"/test",
    }
  ]
}

export default class index extends Component {

  constructor(props){
    super(props)
    this.state={
      visiable:false,
      menuData:this.props ? this.props.menuData : defaultData
    }
  }

  setVisiable = () => {
    this.setState({
      visiable:!this.state.visiable
    })
  }

  render() {
    return (
        <div className="menu-color">
          { this.props.menuData.children.length > 0?
            <div>
              <div  onClick={() => this.setVisiable()}
                  className="hover-bule-deep first-icon d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center">
                  <img src={this.props.menuData.icon} alt="" className="sidebar-icon" />
                  {this.state.menuData.name}
                </div>
                {this.state.visiable
                  ?<svg className="bi bi-chevron-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" clipRule="evenodd"/>
                  </svg>
                  :<svg className="bi bi-chevron-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" clipRule="evenodd"/>
                  </svg>
                }
              </div>
              <div style={{"display":this.state.visiable?"block":"none","backgroundColor":this.state.visiable?"rgba(0, 0, 0, 0.2)":"initial"}}>
                { this.state.menuData.children.map((key, index) => 
                    <Link className="a-color" to={key.url} key={index}>
                      <div  className="hover-bule-deep click-black d-flex align-items-center" 
                      style={{"padding":"20px 30px","textAlign":"left"}} 
                      >
                        <img src={this.props.menuData.icon} alt="" className="sidebar-icon" />
                        {key.name}
                      </div>
                    </Link>
                )}
              </div>
            </div>
            :
            <div>
              <Link className="a-color" to={this.state.menuData.url}>
                <div  className="hover-bule-deep click-black first-icon d-flex align-items-center" 
                >
                  <img src={this.props.menuData.icon} alt="" className="sidebar-icon" />
                  {this.state.menuData.name}
                </div>
              </Link>
            </div>
          }
        </div>
    )
  }
}
