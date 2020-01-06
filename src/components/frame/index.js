import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Button, Badge, message } from 'antd';

// 导入路由
import {Link} from 'react-router-dom'

// 导入logo
import Logo from '../../static/img/logo.png'

// 导入全屏
import screenfull from "screenfull"

// 导入样式
import {UserInfo} from './style'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class index extends Component {
    state = {
        bread1:'welcome',
        bread2:'welcome',
    }

    render() {
        const menu = (
            <Menu>
              <Menu.Item key="0">
                <Link to='/admin/message'>
                    <Button type="link">通知</Button>
                </Link>
              </Menu.Item>
              <Menu.Item key="1">
                <Link to='/admin/settings'>
                    <Button type="link">设置</Button>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to='/' >
                    <Button type="link" onClick={this.logOut.bind(this)}>退出</Button>
                </Link>
              </Menu.Item>
            </Menu>
          );

        return (
            <Layout style={{height:'100%'}} >
                <Header className="header" id='grid'>
                    <img src={Logo} alt='logo' style={{height:'64px'}}/>
                    <UserInfo> 
                        <Dropdown overlay={menu} trigger={['click']}>
                            <span className="ant-dropdown-link">
                            <Badge dot={true}>
                            欢迎，{localStorage.getItem('username')}
                            </Badge>
                            <Icon type="down" />
                            </span>
                        </Dropdown>
                        <Button
                            type="link"
                            shape="circle" 
                            icon="fullscreen" 
                            onClick = {this.fullScreen}
                            style={
                                {marginLeft:10}
                            }
                        />
                    </UserInfo>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }} id='root1'>
                        <Menu
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                        >
                        <SubMenu
                            key="sub1"
                            title={
                            <span>
                                <Icon type="user" />
                                用户管理
                            </span>
                            }
                        >
                            <Menu.Item key="1" onClick = {this.bread.bind(this,'b')}><Link to='/admin/user'>用户列表</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                            <span>
                                <Icon type="laptop" />
                                权限管理
                            </span>
                            }
                        >
                            <Menu.Item key="5" onClick = {this.bread.bind(this,'d')}><Link to='/admin/rights'>权限列表</Link></Menu.Item>
                            <Menu.Item key="6" onClick = {this.bread.bind(this,'c')}><Link to='/admin/roles'>角色列表</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub4"
                            title={
                            <span>
                                <Icon type="notification" />
                                商品管理
                            </span>
                            }
                        >
                            <Menu.Item key="14" onClick = {this.bread.bind(this,'f')}><Link to='/admin/orderFenlei'>商品分类</Link></Menu.Item>
                            <Menu.Item key="13" onClick = {this.bread.bind(this,'e')}><Link to='/admin/goodsList'>商品列表</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={
                            <span>
                                <Icon type="notification" />
                                订单管理
                            </span>
                            }
                        >
                            <Menu.Item key="9" onClick = {this.bread.bind(this,'g')}><Link to='/admin/order'>订单列表</Link></Menu.Item>
                        </SubMenu>
                        
                        <SubMenu
                            key="sub5"
                            title={
                            <span>
                                <Icon type="notification" />
                                数据统计
                            </span>
                            }
                        >
                            <Menu.Item key="17" onClick = {this.bread.bind(this,'h')}><Link to='/admin/dashboard'>数据报表</Link></Menu.Item>
                        </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item onClick = {this.bread.bind(this,'a')}><Link to='/admin' >首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.bread1}</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.bread2}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                overflowY:'AUTO'
                            }}
                            id='content'
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
    // 全屏
    fullScreen = () => {
        screenfull.toggle();
    }
    // 面包屑方法
    bread(option){
        switch(option){
            case 'a':
                this.setState({
                    bread1:'welcome',
                    bread2:'welcome'
                })
                break;
            case 'b':
                this.setState({
                    bread1:'用户管理',
                    bread2:'用户列表'
                })
                break;
            case 'c':
                this.setState({
                    bread1:'权限管理',
                    bread2:'角色列表'
                })
                break;
            case 'd':
                this.setState({
                    bread1:'权限管理',
                    bread2:'权限列表'
                })
                break;
            case 'e':
                this.setState({
                    bread1:'商品管理',
                    bread2:'商品列表'
                })
                break;
            case 'f':
                this.setState({
                    bread1:'商品管理',
                    bread2:'商品分类'
                })
                break;
            case 'g':
                this.setState({
                    bread1:'订单管理',
                    bread2:'订单列表'
                })
                break;
            case 'h':
                this.setState({
                    bread1:'数据管理',
                    bread2:'数据统计'
                })
                break;
            default:
                break;
        }
        // 数据持久化
        setTimeout(() => {
            sessionStorage.setItem('bread1',this.state.bread1)
            sessionStorage.setItem('bread2',this.state.bread2)
        },500)
    } 组件加载
    componentDidMount(){
        let bread1=sessionStorage.getItem('bread1')
        let bread2=sessionStorage.getItem('bread2')
        if(bread1&&bread2){
            this.setState({
                bread1,
                bread2
            })
        }
        if(!localStorage.getItem('token')){
            window.location.href='/login'
            return;
        }
    }

    // 退出
    logOut(){
        // 清除信息
        sessionStorage.clear()
        localStorage.clear()
        return message.success('退出成功')
    }
}
export default index
