import React, { Component } from 'react'
import styled from 'styled-components'
// 导入 图片

import Err404 from '../../static/img/404.jpg'

 class index extends Component {
    render() {
        return (
            <UserInfo>
                <img src={Err404} alt='404'/>
            </UserInfo>
        )
    }
}



export const UserInfo = styled.div`
    position: absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%); 
`
export default index