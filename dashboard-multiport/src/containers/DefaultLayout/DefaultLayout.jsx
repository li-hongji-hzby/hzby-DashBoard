import React, { Component, Suspense } from 'react'
import { Container, Spinner, Breadcrumb } from 'react-bootstrap'
import { Route, Switch, useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import cookie from 'react-cookies';


import style from './DefaultLayout.module.css'
import SideBarItem from '../../component/SideBarItem'
import _nav from '../../_nav'
import routers from '../../router'
import more from './more.png'
import hide from './hide.png'

import Toast from '../../component/GlobalToast'

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultMobileFooter = React.lazy(() => import('./DefaultMobileFooter'));

const HomeButton= () => {
    let history = useHistory();
    function handleClick() {
        history.push("/Home");
    }
    return (
        <Breadcrumb.Item type="button" style={{"backgroundColor":"transparent"}} onClick={handleClick}>
            Home
        </Breadcrumb.Item>
    );
}


class DefaultLayout extends Component {

    constructor(props){
        super(props)
        this.state={
            clientHeight:0,
            visible:true,
            mobileVisible:false,
            user:cookie.load('user'),
        }
    }

    componentWillMount(){
        this.setState({
            clientHeight:document.body.clientHeight-2*56-49
        })
    }

    loading = () => <div className="h-100 w-100 d-flex justify-content-center align-items-center"><Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></div>

    sideBarEnable = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    mobileSideBarEnable = () => {
        this.setState({
            mobileVisible: !this.state.mobileVisible
        })
    }


    logout = () => {
        // cookie.remove("userMsg",{ path: '/' })
        // cookie.remove("user",{ path: '/' })
        // 
        localStorage.clear();
        this.setState({
            user:undefined,
        })
        Toast.warning("退出登录")
        this.props.history.push('/Login')
        // console.log(cookie.load('user'))
    }

    render() {
        return (
            <Container className={style.appContainer + " element"} fluid >
                <Suspense fallback={this.loading()}>
                    <DefaultHeader user={this.state.user} logout={() => this.logout()} sideBarVisible={() => {this.sideBarEnable()}} mobileSideBarVisible={() => this.mobileSideBarEnable()}></DefaultHeader>
                </Suspense>
                <div className={style.appBody + " d-flex justify-content-center p-0 w-100"}>
                    <div className={`${style.appSidebar} brank-black w-256 self-border-right-dark  ${this.state.visible?"d-block":"d-none"}`}>
                        <Suspense fallback={this.loading()}>
                            { _nav.map((key, index) =>
                            <SideBarItem key={index} menuData={key}></SideBarItem>
                            )}
                        </Suspense>
                    </div>
                    <div className={`${style.mobileAppSidebar} brank-black w-256 self-border-right-dark  ${this.state.mobileVisible?"d-block":""}`}>
                        <Suspense fallback={this.loading()}>
                            { _nav.map((key, index) =>
                                <SideBarItem key={index} menuData={key}></SideBarItem>
                            )}
                        </Suspense>
                    </div>
                    <div className={style.appMain + " dark-black"}>
                        <div className="history-nav" style={{"height":"49px"}}>
                            <Breadcrumb>
                                <HomeButton></HomeButton>
                                <Breadcrumb.Item active>{this.props.location.pathname.substr(6)}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className={style.appMainContent} style={{"height":this.state.clientHeight}}>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    { routers.map((route,index) => {
                                        return route.component ? (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => (
                                            <route.component {...props} />
                                            )} />
                                        ) : (null);
                                    })}
                                </Switch>
                            </Suspense>
                        </div>
                    </div>
                </div>
                <div className={style.appFooter}>
                    <Suspense fallback={this.loading()}>
                        <DefaultFooter></DefaultFooter>
                    </Suspense>
                </div>
                <div className={style.mobileAppFooter}>
                    <Suspense fallback={this.loading()}>
                        <DefaultMobileFooter _nav={_nav} navOn={this.props.location.pathname}></DefaultMobileFooter>
                    </Suspense>
                </div>
                <div onClick={() => this.mobileSideBarEnable()} className={style.mobileSidebarBtn}>
                    { this.state.mobileVisible
                        ?<img src={hide} className={style.mobileHideIcon} alt=""/>
                        :<img src={more} className={style.mobileShowIcon} alt="" />
                    }
                </div>
            </Container>
        )
    }
}

export default DefaultLayout
