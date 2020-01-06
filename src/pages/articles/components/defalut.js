import React, { Component } from 'react'
// 导入UI
import {
    Card,
    Button,
    Table,
    Divider,
    Tag,
    Pagination
} from 'antd';


// 样式
import {FenYe} from '../style'


class index extends Component {
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
                title: '标题',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '作者',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '阅读量',
                key: 'reading',
                dataIndex: 'reading',
                render: tags => (
                    <Tag color="#2db7f5">{tags}</Tag>
                ),
            },
            {
                title: '创建于',
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
                create:'2019-10-25'
            },
            {
                key: '2',
                name: 'Jim Green',
                title: 'London No. 1 Lake Park',
                reading: 45,
                create:'2019-10-25'
            },
            {
                key: '3',
                name: 'Joe Black',
                title: 'Sidney No. 1 Lake Park',
                reading: 69,
                create:'2019-10-25'
            },
        ];
        return (
            <div id='defalut'>
                <Card title="文章列表" extra={<Button type="dashed">导出 Excel</Button>} style={{height:'100%'}}>
                    {/* 表格 */}
                    <Button type="dashed" style={{marginBottom:'10px'}} onClick = {this.addFn.bind(this)}>添加文章</Button>
                    <Table columns={columns} dataSource={data} pagination={false} />
                    {/* 分页 */}
                    <FenYe>
                        <Pagination defaultCurrent={6} total={50} />
                    </FenYe>
                </Card>
            </div>
        )
    }

    // 添加方法
    addFn(){
        this.props.sendShow(false)
    }
}
export default index