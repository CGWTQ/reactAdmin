import React, { Component } from 'react'

// 新手引导
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import driverStep from "../../utils/driver";

// 导入 UI
import { Button } from 'antd';

// 导入组件
import Wel from '../../static/img/welcome.jpg'
 class index extends Component {
    state = { visible: true };
    // 新手引导
    driver = new Driver({
        doneBtnText: '完成', // Text on the final button
        closeBtnText: '关闭', // Text on the close button for this step
        stageBackground: '#fff', // Background color for the staged behind highlighted element
        nextBtnText: '下一步', // Next button text for this step
        prevBtnText: '上一步', // Previous button text for this step
    })
    // 新手引导函数
    start() {
        this.driver.defineSteps(driverStep);
        this.driver.start();
        localStorage.setItem("isYd", false);
    }

    render() {
        return (

            <div style = {
                {textAlign:"center"}
            }>
                <p
                    style = {
                        {fontSize:'40px',textAlign:"center"}
                    } 
                >welcome</p>
                <img src={Wel} alt='wel' />
                <br />
                <Button type="link" onClick={this.yd}>新手引导</Button>
            </div>
        )
    }
    yd(){
        localStorage.removeItem('isYd');
        window.location.reload()
    }

    componentDidMount(){
        // 新手引导
        if(!localStorage.getItem('isYd')){
            this.start()
        }
    }
}
export default index