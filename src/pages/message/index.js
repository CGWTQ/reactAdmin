import React, { Component } from 'react'

// 导入UI
import { Card, Avatar, Button  } from 'antd';

const { Meta } = Card;
class index extends Component {
    render() {
        return (
            <div id='message'>
                 <Card title="通知中心" extra={<Button type="dashed">全部标为已读</Button>} bordered={false}>
                 <Card style={{  marginTop: 16 ,borderBottom:'1px solid #ccc'}} bordered={false}>
                    <Meta
                        avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Card title"
                        description="This is the description"
                        style={{float:'left'}}
                    />
                    <Button type="dashed" style={{float:'right'}}>标为已读</Button>
                 </Card>
                 <Card style={{  marginTop: 16 ,borderBottom:'1px solid #ccc'}} bordered={false}>
                    <Meta
                        avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Card title"
                        description="This is the description"
                        style={{float:'left'}}
                    />
                    <Button type="dashed" style={{float:'right'}}>标为已读</Button>
                 </Card>
                 <Card style={{  marginTop: 16 ,borderBottom:'1px solid #ccc'}} bordered={false}>
                    <Meta
                        avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Card title"
                        description="This is the description"
                        style={{float:'left'}}
                    />
                    <Button type="dashed" style={{float:'right'}}>标为已读</Button>
                 </Card>
                </Card>
            </div>
        )
    }
}


export default index