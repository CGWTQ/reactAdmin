import React, { Component } from 'react'
// 上传图片
import {
   Upload,
    Icon, 
    Modal,
    Steps,
    Button,
    message
   } from 'antd';
// 异步请求
import {postGoods}from '../../../../api/index'

// import {
//   HashRouter as Router,
// } from 'react-router-dom';
// import { fromJS } from 'immutable';
const { Step } = Steps;
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
 class AddImg extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
        //   {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //   },
        //   {
        //     uid: '-2',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //   },
        //   {
        //     uid: '-3',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //   },
        //   {
        //     uid: '-4',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //   },
        ],
      };
    
      handleCancel = () => this.setState({ previewVisible: false });
    
      handlePreview = async file => {
        console.log(file)
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
      };
      buzhuFn(data){
        this.props.listShow(data)
      }
      handleChange = ({ fileList }) => {
        console.log(fileList)
        return this.setState({ fileList })
      };
      // 跳转方法
      buzhuFn(data){
        this.props.listShow(data)
      }
      // 图片地址
      actionFn(c){
        console.log(c)
      }
      // 异步请求
      addpostGoodsFn(){
        postGoods(this.props.addgoods).then((res) => {
          if(res.meta.status===201){
            // this.props.history.push('admin/goodsList')
            message.success(res.meta.msg)
            this.props.listShow('wanc')
        }else{
            message.error(res.meta.msg)
        }
        })
      }
      componentDidMount(){
        // 传数据
        
      }
            render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        );
        return (
          <div className="clearfix">
            {/* 步骤条 */}
            <Steps >
                    <Step status="finish" title="详细信息" disabled={true} onClick={this.buzhuFn.bind(this,'xx')} icon={<Icon type="user" />} />
                    <Step status="finish" title="描述" disabled={true} onClick={this.buzhuFn.bind(this,'content')} icon={<Icon type="solution" />} />
                    <Step status="process" title="上传图片" disabled={true} icon={<Icon type="loading" />} />
                    <Step status="wait" title="完成" icon={<Icon type="smile-o" />} />
                </Steps>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} action={this.actionFn}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <Button type="dashed" style={{marginBottom:'10px'}} onClick={this.addpostGoodsFn.bind(this)} >提交</Button>
          </div>
        );
      }
    }
    
//     render() {
//         return (
//             <div></div>
//         )
//     }
// }
export default AddImg