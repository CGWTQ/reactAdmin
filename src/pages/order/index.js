import React, {
    Component,
    // PureComponent ,
} from 'react'
//引入ui组件
import {
    Card,
    Input,
    Button,
    Table,
    Divider, 
    // Spin,
    Tag,
    Pagination,
    Modal,
    Form,
    message,
    Drawer
    // Icon
} from 'antd';
import { connect } from 'react-redux'
import {
    getDataNum,

} from './store/actionCreators'
// 方法
import {
    putOrder,
} from '../../api/index'
// import { from } from 'rxjs';
//导入excel
import FileSaver from "file-saver";
import XLSX from "xlsx";

//引入样式

class Index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            drawervisible: false,
            visible: false,
            loading: true,
            iconLoading: false,
            pagenum: 1,
            pagesize: 5,
            query: "",
            user_id: "",
            // 编辑数据
            edt: {
                order_id: '',
                is_send: '',
                order_number: '',
                order_price: '',
                order_pay: ''
            },
            // 查看数据
            showDate: {}
        }
    }
    //编辑  获取当前行想要的数据
    changeFnStatusFn(data) {
        let value = Object.assign({}, this.state.edt,
            {
                order_id: data.order_id,
                is_send: data.is_send,
                order_number: data.order_number,
                order_pay: data.order_pay,
                order_price: data.order_price
            }
        )
        this.setState({
            edt: value,
            visible: true
        }, () => {
            // console.log(this.state.edt)
        })
    }
    //导出excel
    exportExcel() {
        let wb = XLSX.utils.table_to_book(document.querySelector('#table'));   // 这里就是表格
        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
            FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'table.xlsx');  //table是自己导出文件时的命名，随意
        } catch (e) {
            if (typeof console !== 'undefined')
                console.log(e, wbout)
        }
        return wbout
    }
    componentDidMount() {
        this.props.get({
            pagenum: this.state.pagenum,
            pagesize: this.state.pagesize,
        })
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000);


    }
    //按钮的确定按钮和取消按钮
    handleOk = () => {
        let send;
        if (this.state.edt.is_send === '是') {
            send = 1
        } else {
            send = 0
        }
        putOrder({
            id: parseInt(this.state.edt.order_id),
            order_price: this.state.edt.order_price,
            is_send: send,
            order_pay: this.state.edt.order_pay,
        }).then(res => {
            if (res.meta.status === 201) {
                this.setState({
                    visible: false
                }, () => {
                    this.props.get({
                        pagenum: this.state.pagenum,
                        pagesize: this.state.pagesize
                    })
                })
                return message.success('更新成功')
            }
        })
    };

    handleCancel = e => {
        //// console.log(e);
        this.setState({
            visible: false,
        });
    };

    // 表单提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.add(values)
                setTimeout(() => {
                    console.log(this.props)
                    // this.props.get(this.state.getUser)
                })
                this.setState({
                    visible: false,
                });
            }
        });
    };
    // 双向绑定
    editorChangeFn = (e) => {
        if (e.target.getAttribute('flag') === 'send') {
            let data = Object.assign({}, this.state.edt, { is_send: e.target.value })
            this.setState({
                edt: data
            })
        } else {
            let data = Object.assign({}, this.state.edt, { order_pay: e.target.value })
            this.setState({
                edt: data
            })
        }
    }
    // 详情抽屉框
    showDrawer(data) {
        this.setState({
            drawervisible: true,
        });
        this.setState({
            showDate: data
        }, () => {
            console.log(this.state.showDate)
        })
    }
    // 详情框关闭
    onClose = () => {
        this.setState({
            drawervisible: false,
        });
    };
    render() {
        //列表渲染的数据
        const columns = [
            {
                title: '订单号',
                dataIndex: 'order_number',
                key: 'order_number',
                render: text => <span>{text}</span>,
            },
            {
                title: 'id',
                dataIndex: 'user_id',
                key: 'user_id',
            },
            {
                title: '订单编号',
                dataIndex: 'order_id',
                key: 'order_id',
                // render: text => <span>{text}</span>,
            },
            {
                title: '价格',
                dataIndex: 'order_price',
                key: 'order_price',
            },
            {
                title: '是否支付',
                key: 'order_pay',
                dataIndex: 'order_pay',
                render: (order_pay) => {
                    if (order_pay === "0") {
                        return (
                            <Tag color="red">未支付</Tag>
                        )
                    } else {
                        return (
                            <Tag color="green">已支付</Tag>
                        )
                    }
                }
            },
            {
                title: '是否发货',
                dataIndex: 'is_send',
                key: 'is_send',
            },
            {
                title: '操作',
                key: 'action',
                
                render: (text, record) => (
                    
                    <span>
                        <Button type="primary" loading={this.state.loading} onClick={this.changeFnStatusFn.bind(this, record)}  size="small">编辑</Button>
                        <Divider type="vertical" />
                        <Button loading={this.state.loading} onClick={this.showDrawer.bind(this, record)}  size="small">查看</Button>
                    </span>
                ),
            },
        ];
        // 页码
        function pageChange(page) {
            this.setState({
                pagenum: page
            }, () => {
                this.props.get({
                    pagenum: this.state.pagenum,
                    pagesize: this.state.pagesize
                })
            })
        }
        // 判断是否支付
        function isPay(data) {
            if (data === '0') {
                return (<Tag color="red">未支付</Tag>)
            }
            return (<Tag color="blue">已支付</Tag>)
        }

        const data = this.props.data.goods
        // const xqdata = [this.state.currentdata]
        return (

            <div>
                {/* 订单详情 */}
                <Drawer
                    title="订单详情"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.drawervisible}
                >
                    <p>订单号：{this.state.showDate.order_id}</p>
                    <p>是否支付：{isPay(this.state.showDate.order_pay)}</p>
                    <p>订单价格：{this.state.showDate.order_price} 元</p>
                    <p>订单编号：{this.state.showDate.order_number}</p>
                    <p>是否发货：{this.state.showDate.is_send}</p>
                </Drawer>
                {/* 卡片 */}
                <Card >
                    <div style={{ position: 'relative' }}>
                        <Button type="primary" style={{ marginLeft: 10, }} onClick={this.handlePrint}>打印表格</Button>
                        <Button
                            onClick={this.exportExcel.bind(this)}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 100,
                                // width:100
                            }}>导出ecext
                            </Button>
                    </div>
                    {/* 表格 */}
                    <Table columns={columns} dataSource={data} pagination={false} id='table' ref='table'
                        loading={this.state.loading} />
                    {/* 分页 */}
                    <Pagination
                        defaultCurrent={this.state.pagenum}
                        total={this.props.data.total}
                        pageSize={this.state.pagesize}
                        onChange={pageChange.bind(this)}
                    />
                </Card>,
                {/* 编辑对话框 */}
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {/* 编辑对话框中的表单 */}
                    <Form onSubmit={this.handleSubmit}  className="login-form">
                        <Form.Item>
                            订单编号：
                            <Input
                                flag='id'
                                placeholder="order_id"
                                value={this.state.edt.order_id}
                                disabled={true}
                            />
                        </Form.Item>
                        <Form.Item>
                            是否发货：
                                <Input
                                flag='send'
                                placeholder="is_send"
                                value={this.state.edt.is_send}
                                onChange={this.editorChangeFn}
                            />
                        </Form.Item>
                        <Form.Item>
                            支付状态（0 - 未支付， 1 - 已支付）：
                                <Input
                                flag='pay'
                                placeholder="order_pay"
                                value={this.state.edt.order_pay}
                                onChange={this.editorChangeFn}
                            />
                        </Form.Item>
                        <Form.Item>
                            订单号：
                                <Input
                                flag='number'
                                placeholder="order_number"
                                value={this.state.edt.order_number}
                                disabled={true}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
    //打印
    handlePrint = () => {
        const win = window.open('', 'printwindow');
        win.document.write(window.document.getElementById('table').innerHTML);
        win.print();
        win.close();
    }

}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Index);
const mapStateToProps = state => { // state就是仓库store数据
    ////// console.log(state.toJS().getOrder.status)
    return { // 组件中通过 this.props.键 来获取数据
        // 键: state.数据

        data: state.toJS().getOrder.status
    }
}
const mapDispatchToProps = dispatch => {
    return { // 组件中通过this.props.键()
        // 键: index => dispatch(incrment(index))   // 注：dispatch中传递的是action
        get: params => dispatch(getDataNum(params))   // 注：dispatch中传递的是action
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)