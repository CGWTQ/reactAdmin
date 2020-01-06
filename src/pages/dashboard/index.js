import React, { Component } from 'react'

import { Row, Col, Statistic, Icon  } from 'antd';

import {connect} from 'react-redux'
// 引入Echarts
import Echarts from './compoents/echarts'

// 导入 redux action
import { getDataNum } from './store/actionCreators'

// 导入接口
import { getHot } from '../../api/index'
// 样式
import {GutterDiv} from './style'

 class index extends Component {
     state = {
        hotData:[]
     }
    componentDidMount(){
        this.props.get()
        getHot().then(res => {
            if(res.meta.status === 200){
                this.setState({
                    hotData:res.data['2017-12-1']
                })
            }
        })
    }
    render() {
        let {
            hotData
        } = this.state
        console.log(hotData)
        let hotHtml = hotData.map((item, index)=>{
            return (<Col className="gutter-row" span={6} key = {index}>
                        <div className="gutter-box">
                            {/* <Statistic title={item.rp2_page} value={item.rp2_count} /> */}
                            <Statistic
                                title={item.rp2_page}
                                value={item.rp2_count}
                                precision={2}
                                style={{lineHeight:"50px"}}
                                valueStyle={{ color: '#fff' }}
                                prefix={<Icon type="arrow-up" />}
                            />
                        </div>
            </Col>)
        })


        return (
            <div id='dashboard'>
                <p>概览</p>
                <GutterDiv>
                <Row gutter={16}>
                    {hotHtml}
                    {/* <Col className="gutter-row" span={6}>
                        <div className="gutter-box">col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">col-6</div>
                    </Col> */}
                </Row>
                </GutterDiv>
                <p style={{marginTop:'30px'}}>最近浏览量</p>
                {/* 图表 */}
                <Echarts status={this.props.status}></Echarts>
            </div>
        )
    }
}


const mapStateToProps = state => { // state就是仓库store数据
    return { 
        status:state.toJS().dashBoard
    }
}
const mapDispatchToProps= dispatch => {
    return { 
        get:() => dispatch(getDataNum())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)