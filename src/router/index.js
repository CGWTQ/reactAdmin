// 导入库
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

// 导入组件
import Login from '../pages/login/index';
import Admin from '../pages/admin/index';
import Dashboard from '../pages/dashboard/index';
import Articles from '../pages/articles/index';
import Settings from '../pages/settings/index';
import Message from '../pages/message/index';
import Frame from '../components/frame/index';
import Err404 from '../components/err/404';
import Err500 from '../components/err/500';

// orders
import OrderFenlei from '../pages/orders/orderFenlei.js'
import AddFenlei from '../pages/orders/addFenlei.js'
import Order from '../pages/order/index'
// user
import User from '../pages/user/index'
import Rights from '../pages/rights/index'
import Roles from '../pages/roles/index'

// 商品列表
import GoodsList from '../pages/goods/list';
class ReactRouter extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    {/* 默认登录页 */}
                    <Route path="/" component={Login} exact></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/admin">
                        <Frame>
                            <Switch>
                                    {/* 
                                    备注：后期这里有很多很多路由
                                    举例：订单路由、商品路由等
                                    */}
                                    <Route path="/admin" exact component={Admin}></Route>
                                    {/* 权限列表 */}
                                    <Route path="/admin/rights" component={Rights}></Route>
                                    {/* 角色列表 */}
                                    <Route path="/admin/roles" component={Roles}></Route>
                                    <Route path="/admin/dashboard" component={Dashboard}></Route>
                                    <Route path="/admin/articles" component={Articles}></Route>
                                    <Route path="/admin/settings" component={Settings}></Route>
                                    <Route path="/admin/message" component={Message}></Route>
                                   {/* orders */}
                                   <Route path="/admin/order" component={Order}></Route>
                                   
                                    {/* order */}
                                    <Route path="/admin/orderFenlei" component={OrderFenlei}></Route>
                                    <Route path="/admin/addFenlei" component={AddFenlei}></Route>

                                    {/* user */}
                                    <Route path="/admin/user" component={User}></Route>
                                    {/* 商品列表 */}
                                    <Route path="/admin/goodsList" component={GoodsList}></Route>
                            </Switch>
                        </Frame>
                    </Route>
                    <Route path="/404" component={Err404}></Route>
                    <Route path="/500" component={Err500}></Route>
                    <Redirect to="/404" />
                </Switch>
            </Router>
        )
    }
} 

export default ReactRouter;