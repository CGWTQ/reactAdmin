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
import {FenYe} from './style'


// 导入组件

class index extends Component {
    render() {
        // 表格数据
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <span>{text}</span>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>
                ),
            },
            {
                title: 'Action',
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
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
        ];
        return (
            <div id='articles'>
                <Card title="文章列表" extra={<Button type="dashed">导出 Excel</Button>} style={{height:'100%'}}>
                    {/* 表格 */}
                    <Table columns={columns} dataSource={data} pagination={false} />
                    {/* 分页 */}
                    <FenYe>
                        <Pagination defaultCurrent={6} total={50} />
                    </FenYe>
                </Card>
            </div>
        )
    }
}
export default index