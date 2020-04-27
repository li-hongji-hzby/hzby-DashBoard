import React, { Component, Suspense } from 'react'
import { Container, Spinner, Breadcrumb } from 'react-bootstrap'
import { Route, Switch, useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './DefaultLayout.css'
import cookie from 'react-cookies';


import SideBarItem from '../../component/SideBarItem'
import _nav from '../../_nav'
import routers from '../../router'

const DefaultHeader = React.lazy(() => import('./DefaultHeader/DefaultHeader'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter/DefaultFooter'));

const HomeButton= () => {
    let history = useHistory();
    function handleClick() {
        history.push("/Home");
    }
    return (
        <Breadcrumb.Item type="button" onClick={handleClick}>
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
        cookie.remove("userMsg",{ path: '/' })
        cookie.remove("user",{ path: '/' })
        this.setState({
            user:undefined,
        })
        this.props.history.push('/Login')
        // console.log(cookie.load('user'))
    }

    render() {
        return (
            <Container className="app-container element" fluid >
                <Suspense fallback={this.loading()}>
                    <DefaultHeader user={this.state.user} logout={() => this.logout()} sideBarVisible={() => {this.sideBarEnable()}} mobileSideBarVisible={() => this.mobileSideBarEnable()}></DefaultHeader>
                </Suspense>
                <div className="app-body d-flex justify-content-center p-0 w-100">
                    <div className={`app-sidebar brank-black w-256 self-border-right-dark  ${this.state.visible?"d-block":"d-none"}`}>
                        <Suspense fallback={this.loading()}>
                            { _nav.map((key, index) =>
                            <SideBarItem key={index} menuData={key}></SideBarItem>
                            )}
                        </Suspense>
                    </div>
                    <div className={`mobile-app-sidebar brank-black w-256 self-border-right-dark  ${this.state.mobileVisible?"d-block":""}`}>
                        <Suspense fallback={this.loading()}>
                            { _nav.map((key, index) =>
                                <SideBarItem key={index} menuData={key}></SideBarItem>
                            )}
                        </Suspense>
                    </div>
                    <div className="app-main dark-black">
                        <div className="history-nav" style={{"height":"49px"}}>
                            <Breadcrumb>
                                <HomeButton></HomeButton>
                                <Breadcrumb.Item active>{this.props.location.pathname.substr(6)}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="app-main-content" style={{"height":this.state.clientHeight}}>
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
                <Suspense fallback={this.loading()}>
                    <DefaultFooter></DefaultFooter>
                </Suspense>
            </Container>
        )
    }
}

export default DefaultLayout
