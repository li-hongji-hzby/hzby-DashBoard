import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const defaultData={
  "name":"测试菜单",
  "url":"/",
  "children":[
  ]
}

export default class MySideBar extends Component {

  constructor(props){
    super(props)
    this.state={
      visiable:"block",
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
        <div>
          { this.state.menuData.children.length > 0?
            <div>
              <div  onClick={() => this.setVisiable()}
                  style={{"padding":"20px","textAlign":"left"}} 
                  className="hover-bule-deep"
              >
                <Icon name="desktop" style={{"marginRight":"10px"}} />
                {this.state.menuData.name}
                <Icon name={this.state.visiable?"angle down":"angle left"} style={{"float":"right"}} />
              </div>
              <div style={{"display":this.state.visiable?"block":"none","backgroundColor":this.state.visiable?"rgba(0, 0, 0, 0.2)":"initial"}}>
                { this.state.menuData.children.map((key, index) => 
                    <Link className="a-color" to={key.url} key={index}>
                      <div  className="hover-bule-deep click-black" 
                      style={{"padding":"20px 30px","textAlign":"left"}} 
                      >
                        <Icon name="desktop" style={{"marginRight":"10px"}} />
                        {key.name}
                      </div>
                    </Link>
                )}
              </div>
            </div>
            :
            <div>
              <Link className="a-color" to={this.state.menuData.url}>
                <div  className="hover-bule-deep click-black" 
                style={{"padding":"20px","textAlign":"left"}} 
                >
                  <Icon name="desktop" style={{"marginRight":"10px"}} />
                  {this.state.menuData.name}
                </div>
              </Link>
            </div>
          }
        </div>
    )
  }
}
