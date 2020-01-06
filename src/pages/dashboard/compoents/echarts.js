import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入折线图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Echarts extends Component {
    componentDidMount() {
        let option;
        setTimeout(() => {
            // console.log(this.props.status.status)
            option =  this.props.status.status
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption(option);
    },1000)
    }
    render() {
        return (
            <div id="main" style={{ width: '100%', height:' 300px' }}></div>
        );
    }
}

export default Echarts;