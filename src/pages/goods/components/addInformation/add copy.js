import React, { Component } from 'react'

// 导入 UI
import { 
    Form,
    Steps, 
    Icon,
    Input,
    Button,
    Cascader, 
    Card, 
} from 'antd';

// 导入ui
import { 
    Steps, 
} from 'antd';

const { Step } = Steps;

// 三级数据
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

function onChange(value) {
  console.log(value);
}
const { Step } = Steps;

class Add extends Component {
    constructor(props)
    {
        super(props)
    }

     // 提交事件
     handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    // // 返回方法
    addFn(){
        this.props.sendShow('list')
    }
    // // 创建完成
    // componentDidMount(){
    //     var E = wangeditor;
    //     var editor = new E(this.refs.editor);
    //     editor.create()
    // }
    render() {
        // 表格数据
        const { getFieldDecorator } = this.props.form;
        function onOk(value) {
            console.log('onOk: ', value);
        }
        return (
            <div id='add'>
                {/* 卡片 */}
                 <Card title={ <Button type="dashed" style={{marginBottom:'10px'}} onClick = {this.addFn.bind(this)}>返回</Button>} extra={<Button type="dashed">导出 Excel</Button>} style={{height:'100%'}}>
                 <Steps >
                    <Step status="finish" title="Login" icon={<Icon type="user" />} />
                    <Step status="finish" title="Verification" icon={<Icon type="solution" />} />
                    <Step status="process" title="Pay" icon={<Icon type="loading" />} />
                    <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
                </Steps>
                {/*表单  */}
                <Form onSubmit={this.handleSubmit} className="login-form">
               
                    <Form.Item>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题' }],
                        })(
                            <Input
                            placeholder="商品名称"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('shuliang', {
                            rules: [{ required: true, message: '商品数量？' }],
                        })(
                            <Input
                            placeholder="商品数量"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('jiage', {
                            rules: [{ required: true, message: '商品价格？' }],
                        })(
                            <Input
                            placeholder="商品价格"
                            />,
                        )}
                    </Form.Item>                    

                    <Form.Item>
                        {getFieldDecorator('num', {
                            rules: [{ required: true, message: '商品重量？' }],
                        })(
                            <Input
                            placeholder="商品重量"
                            />,
                        )}
                    </Form.Item>
                    
                    <Cascader options={options} onChange={onChange} placeholder="Please select" />
 
                    
                    <Form.Item>
                        <br/>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        提交
                    </Button>
                    </Form.Item>
                </Form>
                 </Card>
                {/* 进度条 */}
               
            </div>
        )
    }

    // 添加方法
}
 

export default Form.create({ name: 'normal_login' })(Add);