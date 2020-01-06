import React, { Component } from 'react'
// 导入UI
import {
    Card,
    Button,
    Table,
    Divider,
    Tag,
    Pagination,
    Input, 
} from 'antd';


// 样式
import {FenYe} from '../../style'

const { Search } = Input;
class List extends Component {
    constructor(props)
    {
        super(props)
    }
    render() {
        // 表格数据
        const columns = [
            {
                title: '编号',
                dataIndex: 'key',
                key: 'key',
                render: text => <span>{text}</span>,
            },
            {
                title: '名称',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '商品价格',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品重量',
                key: 'reading',
                dataIndex: 'reading',
                render: tags => (
                    <Tag color="#2db7f5">{tags}</Tag>
                ),
            },
            {
                title: '商品数量',
                dataIndex: 'num',
                key: 'num',
            },
            {
                title: '创建时间',
                dataIndex: 'create',
                key: 'create',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <Button type="primary" size="small">编辑</Button>
                        <Divider type="vertical" />
                        <Button type="danger" size="small">删除</Button>
                    </div>
                ),
            },
        ];

        const data = [
            {
                key: '1',
                name: 'John Brown',
                title: 'New York No. 1 Lake Park',
                reading: 55,
                num: 55,
                create:'2019-10-25'
            },
            {
                key: '2',
                name: 'Jim Green',
                title: 'London No. 1 Lake Park',
                reading: 45,
                num: 55,
                create:'2019-10-25'
            },
            {
                key: '3',
                name: 'Joe Black',
                title: 'Sidney No. 1 Lake Park',
                reading: 69,
                num: 55,
                create:'2019-10-25'
            },
        ];
        return (
            <div id='list'>
                <Card title={ <div><Search placeholder="input search text"
      style={{ width: 200 }} /><Button type="dashed" style={{marginBottom:'10px'}} onClick = {this.addFn.bind(this)}>添加商品</Button></div>} extra={<Button type="dashed">导出 Excel</Button>} style={{height:'100%'}}>
                    {/* 表格 */}
                   
                    
                    <Table columns={columns} dataSource={data} pagination={false} />
                    {/* 分页 */}
                    <FenYe>
                        <Pagination showQuickJumper defaultCurrent={6} total={50} />
                    </FenYe>
                </Card>
            </div>
        )
    }

    // 添加方法
    addFn(){
        this.props.sendShow('add')
    }
}
export default List