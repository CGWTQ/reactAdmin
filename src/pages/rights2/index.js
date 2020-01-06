import React, { Component } from 'react'
import RolesManage from "./components/roles/index"
import RightsManage from "./components/rights/index"
class Rights extends Component {
    constructor(props){
        super(props)
        this.isShowFn = this.isShowFn.bind(this);
        this.state={
            show:"rightsPage"
        }
    }
    render() {
        if(this.state.show=== "rolesPage"){
            return (
                <div>
                    <RolesManage isShowFn={this.isShowFn}/>
                </div>
            )
        }else if(this.state.show=== "rightsPage"){
            return (
                <div>
                    <RightsManage isShowFn={this.isShowFn}/>
                </div>
            )
        }
            
        }

    isShowFn(params){
        this.setState({
            show:params
        })
    }
}

export default Rights