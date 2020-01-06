import React, { Component } from 'react'
import {
     Icon, 
     Steps,
} from 'antd';

const { Step } = Steps;
    class Addwanc extends Component {
        // componentDidMount(){
        //     setTimeout(()=>{
        //        this.props.listFn.bind('list')
        // },3000);
        // }
       render() {
           return (
               <div>
                    {/* 步骤条 */}
                    <Steps >
                        <Step status="finish" title="详细信息"   icon={<Icon type="user" />} />
                        <Step status="finish" title="描述" icon={<Icon type="solution" />} />
                        <Step status="finish" title="上传图片"  icon={<Icon type="loading" />} />
                        <Step status="process" title="完成" icon={<Icon type="smile-o" />} />
                    </Steps>
               </div>
           )
       }
   }
export default Addwanc