import React, { Component } from 'react'
import {connect} from 'react-redux'

// antd
import {
    Card,
    Input,
    Button,
    DatePicker,
    Table,
    Divider,
    Switch,
    Pagination,
    Modal,
    Form
} from 'antd';

// 样式
import {FenYe} from './style'


// 导入 redux action
import { getUserData, usersState, editorUsers, deleteUsers, addUsers} from './store/actionCreators'

// 控件常量
const { RangePicker } = DatePicker;
const { Search } = Input;


// 组件
class Index extends Component {
    // 弹框
    constructor(props){
        super(props)
        this.state = {
            // 添加
            visible: false,
            // 编辑
            edivisible: false,
            // 添加用户数据
            params:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            // 获取用户数据
            getUser:{
                query:'',
                pagenum:1,
                pagesize:5,
                start_time:'',
                end_time:''
            },
            // 编辑数据
            id:'',
            email:'',
            mobile:'',
            // 表格loading
            loading:true,
        }
    }
    // 添加弹框
    showAddModal = () => {
        this.setState({
          visible: true,
        });
      };
    
    hideAddModal = () => {
        this.setState({
          visible: false,
        });
    };

    // 编辑弹框
    showEdiModal = (data) => {
        this.setState({
            edivisible: true,
            mobile:data.mobile,
            email:data.email,
            id:data.id
        });
    };
    editorCancel =() => {
        this.setState({
            edivisible: false,
        });
    }
    // 编辑
    editorOk =() => {
        this.props.editor({
            id:this.state.id,
            email:this.state.email,
            mobile:this.state.mobile
        })
        setTimeout(() => {
            this.props.get(this.state.getUser)
        },500)
        // message.success('设置成功');
        this.setState({
            edivisible: false,
        });
        
    }

    // 双向绑定
    editorChangeFn = (e) => {
        if(e.target.type === 'email'){
            this.setState({
                email:e.target.value
            })
        }else{
            this.setState({
                mobile:e.target.value
            }) 
        }
    }
    
    // 数据删删除
    deleteUserFn = (id) => {
        this.props.delete(id)
        setTimeout(() => {
            this.props.get(this.state.getUser) 
        },500)
        // message.success('删除成功');
    }
    // 表单提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.add(values)
            setTimeout(() => {
                this.props.get(this.state.getUser)
            },500)
            this.setState({
                visible: false,
            });
          }
        });
    };
    // 打印
    handlePrint = () => {
        // const win = window.open('','printwindow');
        document.write(window.document.getElementById('printArea').innerHTML);
        // window.document.getElementById('printArea')
        window.print();
        window.close();
        window.location.reload()
    }
    // 时间数据格式化
    timeFilter(originVal) {
        const dt = new Date(originVal)
        // //yyy---mm-dd
        var y = dt.getFullYear() //得到年份
        var m = (dt.getMonth() + 1 + '').padStart(2, '0')
        var d = (dt.getDate() + '').padStart(2, '0')
        var hh = (dt.getHours() + '').padStart(2, '0')
        var mm = (dt.getMinutes() + '').padStart(2, '0')
        var ss = (dt.getSeconds() + '').padStart(2, '0')
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }

    render() {
        // 时间筛选
        let onChange=(date, dateString) => {
            let timeVal;
            if(date.length === 0){
                timeVal = Object.assign({}, this.state.getUser, 
                    { start_time: '',end_time:'' }
                )
            }else{
                timeVal = Object.assign({}, this.state.getUser, 
                    { start_time: dateString[0] + ' 00:00:00',end_time:dateString[1] + ' 00:00:00' }
                )
            }
            this.setState({
                getUser:timeVal
            },() => {
                this.props.get(this.state.getUser)
            })
        }

        // 开关
        let statusChange = (checked,value) => {
            this.props.switch(value,checked)
        }
        // 页码
        function pageChange(page){
            let data = Object.assign({}, this.state.getUser, { pagenum: page })
            this.setState({
                getUser:data,
                loading:true
            },() => {
                this.props.get(this.state.getUser)
                setTimeout(() => {
                    this.setState({
                        loading:false
                    })
                },500)
            })
        }

        // 表格数据
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'role_name',
                render: text => <span>{text}</span>,
            },
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '创建时间',
                dataIndex: 'created_time',
                render: (text) => (
                    <span>
                        {this.timeFilter(text)}
                    </span>
                ),
            },
            {
                title: '状态',
                dataIndex: 'mg_state',
                render: (text, record) => (
                    <span>
                        <Switch defaultChecked={text} onChange={(value)=>{statusChange(value,record.id)}} />
                    </span>
                ),
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button type="primary" size='small' onClick={this.showEdiModal.bind(this,record)}>编辑</Button>
                        <Divider type="vertical" />
                        <Button type="danger" size='small' onClick={this.deleteUserFn.bind(this,record.id)}>删除</Button>
                    </span>
                ),
            },
        ];
        // 表格数据
        const data = this.props.userData.users
        // 表单
        const { getFieldDecorator } = this.props.form;
        return (
            <div id='user'>
                <Card>

                    {/* 添加弹框 */}
                    <Modal
                        title="添加用户"
                        visible={this.state.visible}
                        onCancel={this.hideAddModal}
                        footer={false}
                    >
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                            用户名
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, message: '请输入用户名' },
                                    { min: 3, message: '至少3位字符' },
                                    { max: 8, message: '至多8位字符' },
                                    { pattern: '^[a-zA-Z0-9]*$', message: '只支持数字、英文，不区分大小写'}
                                ],
                            })(
                                <Input
                                placeholder="Username"
                                />,
                            )}
                            </Form.Item>
                            <Form.Item>
                            密码
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '请输入密码' },
                                    { pattern: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$', message: '只支持数字、英文，不区分大小写,长度6-20'}
                                ],
                            })(
                                <Input
                                type="password"
                                placeholder="Password"
                                />,
                            )}
                            </Form.Item>
                            <Form.Item>
                            手机号
                            {getFieldDecorator('mobile', {
                                rules: [
                                    { required: true, message: '请输入手机号' },
                                    { pattern: '^1[3456789]\\d{9}$', message: '请输入正确的手机号'}
                                ],
                            })(
                                <Input
                                type="mobile"
                                placeholder="mobile"
                                />,
                            )}
                            </Form.Item>
                            <Form.Item>
                            邮箱
                            {getFieldDecorator('email', {
                                rules: [
                                    { required: true, message: '请输入邮箱' },
                                    { pattern: '^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$', message: '请输入正确的邮箱'}
                                    
                                ],
                            })(
                                <Input
                                type="email"
                                placeholder="email"
                                />,
                            )}
                            </Form.Item>
                            <Form.Item>
                            <Button onClick={this.hideAddModal} style={{marginRight:20}}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                提交
                            </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    {/*     /
                    
                    +++++++++++++弹框 */}
                    <Modal
                        title="用户编辑"
                        visible={this.state.edivisible}
                        onCancel={this.editorCancel}
                        footer={false}
                        >
                        邮箱：    
                        <Input
                            ref='email'
                            type="email"
                            placeholder="email"
                            style={{marginBottom:20}}
                            value = {this.state.email}
                            onChange={this.editorChangeFn}
                        /> 
                        手机号:    
                        <Input
                            ref='phone'
                            type="phone"
                            placeholder="phone"
                            value = {this.state.mobile}
                            onChange={this.editorChangeFn}
                        />
                        <Button onClick={this.editorCancel} style={{marginRight:20,marginTop:20}}>
                            取消
                        </Button>
                        <Button type="primary" onClick={this.editorOk}>
                            提交
                        </Button>
                    </Modal>
                    {/* 顶部控件 */}
                    <p>
                        <Search
                            placeholder="搜索"
                            onSearch={value => {
                                let data = Object.assign({}, this.state.getUser, { query: value })
                                this.setState({
                                    getUser:data
                                })
                                setTimeout(() => {
                                    this.props.get(this.state.getUser)
                                },500)
                            }}
                            style={{ width: 300, marginRight: 20 }}
                            allowClear={true}
                        />
                        <Button type="primary" style={{ marginRight: 20 }} onClick={this.showAddModal}>添加用户</Button>
                        <Button type="primary" onClick = {this.handlePrint}>打印表格</Button>
                        <RangePicker onChange={onChange} style={{ float: "right" }} />
                    </p>
                    {/* 表格 */}
                    <Table 
                        columns={columns} 
                        dataSource={data} 
                        pagination={false} 
                        id='printArea'
                        style={{marginTop:20}}
                        rowKey={()=>Math.random()*1000000}
                        loading={this.state.loading}
                    />
                    {/* 分页 */}
                    <FenYe>
                        <Pagination 
                            defaultCurrent={this.state.getUser.pagenum} 
                            total={this.props.userData.total} 
                            pageSize={this.state.getUser.pagesize}
                            onChange={pageChange.bind(this)}
                        />
                    </FenYe>
                </Card>
            </div>
        )
    }

    // 页面加载完成
    componentDidMount(){
        this.props.get(this.state.getUser)
        setTimeout(() => {
            this.setState({
                loading:false
            })
        },500)
    }
}

const WrappedNormalADDForm = Form.create({ name: 'add_form' })(Index)
// export default WrappedNormalLoginForm

const mapStateToProps = state => { // state就是仓库store数据
    return { 
        userData:state.toJS().user.status
    }
}
const mapDispatchToProps= dispatch => {
    return { 
        get:(params) => dispatch(getUserData(params)),
        switch:(id,state) => dispatch(usersState(id,state)),
        editor:(params) => dispatch(editorUsers(params)),
        delete:(id) => dispatch(deleteUsers(id)),
        add:(params) => dispatch(addUsers(params)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalADDForm)