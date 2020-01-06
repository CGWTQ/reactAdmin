import React, { Component } from 'react'
// 导入ui
import {
    Steps,
    Icon,
    Button,
    Input
} from 'antd';
// 导入编辑器
// import wangeditor from 'wangeditor'
// 步骤方法
// 文本框
const { TextArea } = Input;

const { Step } = Steps;
 class AddContent extends Component {
      // 创建完成
      constructor(props)
      {
          super(props)
          this.state={
            textArea:''
          }
      }
    componentDidMount(){
    }
// 跳转网页方法
    buzhuFn(data){
        this.props.listShow(data)
    }
    // 下一步
    wenbengnrFn(){
        this.props.addconFn(this.state.textArea);
        this.buzhuFn('img')
}
    textAreaFn(e){
        this.setState({textArea: e.target.value});
    }
    render() {

        let {textArea}= this.state
        return (
            <div>
                
            {/* 步骤条 */}
            <Steps >
                    <Step status="finish" title="详细信息"  disabled={true} onClick={this.buzhuFn.bind(this,'xx')} icon={<Icon type="user" />} />
                    <Step status="process" title="描述" icon={<Icon type="solution" />} />
                    <Step status="" title="上传图片" icon={<Icon type="loading" />} />
                    <Step status="" title="完成" icon={<Icon type="smile-o" />} />
                </Steps>
               {/* 文本框 */}
               <TextArea rows={4} 
               value={textArea}
               onChange={this.textAreaFn.bind(this)}
               />
                   <br/>
               <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.wenbengnrFn.bind(this)}>
                   下一步
               </Button>
            </div>
        )
    }
}
export default AddContent