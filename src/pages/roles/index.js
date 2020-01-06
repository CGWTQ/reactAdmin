import React, { Component } from 'react'
// import {PageDiv} from './style'
import { Table , Button, 
    Card , Input ,
    Modal, Form,Icon,
    Message,Tree} from 'antd';
import {connect} from 'react-redux'
// import RolesRightList from "./components/index"
import {
    deleteDeleteRoles,//引入删除角色
    putUpdataRoles,//引入修改角色
    getRolesSearch,//引入角色查找
    getRightsList,//树形权限 tree
    postUpdataManage,//修改权限
} from "./../../api/index"
import {
    usersList,
    addUsers,
} from './store/action/roles';
const {Search}= Input;
const { TreeNode } = Tree;

// const formItemLayout = {
//     labelCol: { span: 4 },
//     wrapperCol: { span: 8 },
//   };

 class RolesList extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            total: 60,
            // show:"createPage",
            nowrow:null,//当前行数据
            updateVisible: false ,
            addVisible: false ,
            setRightsVisible: false ,
            delVisible: false ,
            addRolename:"",//添加框数据
            addRoledesc:"",
            data:[],
            newRoleName:"",
            newRoleDesc:"",

            //树形控件
            // expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            // checkedKeys: {checked:[], halfChecked:[]},
            checkedKeys: [],
            selectedKeys: [],
            //树形权限数据
            treeData:[],
            manageIdArr:[],//权限管理所有全选中和半选中的id
        }
    }
    
    // 树形控件方法
    onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
          expandedKeys,
          autoExpandParent: false,
        });
      };
    
      onCheck = (checkedKeys,info) => {
        console.log('onCheck', checkedKeys,info);
        let manageIdArr=checkedKeys.concat(info.halfCheckedKeys)
        // console.log(manageIdArr)
        // console.log(this.state.nowrow)
        // postUpdataManage({roleId:newrow.id,manageId:manageIdArr})
            this.setState({ checkedKeys,
                manageIdArr
            },()=>{console.log(this.state.manageIdArr)});
        
      };
    
      onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
      };
    
      renderTreeNodes = data =>
        data.map(item => {
          if (item.children) {
            return (
              <TreeNode title={item.authName} key={item.id} dataRef={item}>
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode key={item.id} title={item.authName} {...item} />;
        });
    
    
    //钩子函数获取数据
    componentDidMount(){
      this.props.get()
      setTimeout(()=>{
        
        // this.props.rolesListData.forEach((value,index) => {
        //     value.key = index
        // })
        console.log(this.props.rolesListData)
          this.setState({
            data:this.props.rolesListData
          })
      },1000)

      //获取树形权限列表
      getRightsList({type:'tree'}).then(res=>{
        if(res.meta.status===200){
            this.setState({
                treeData:res.data
            })
        }
      })
    }

    
    render() {
        // const data=this.props.rolesListData
        
        let {
            newRoleDesc,
            newRoleName,
        }=this.state
        const columns = [
            {
              title: '角色名称',
              dataIndex: 'roleName',
              key: 'key',
              render: text => <em>{text}</em>,
            },
            {
              title: '角色描述',
              dataIndex: 'roleDesc',
              key: 'roleDesc',
            },
            {
              title: '操作',
              render: (text,row) => (
                <span>
                     <Button type="primary" style={{marginBottom:'10px',marginLeft:"10px"}} onClick={this.updataRole.bind(this,row)}>编辑</Button>
                     <Button type="dashed" style={{marginBottom:'10px',marginLeft:"10px"}} onClick={this.delRole.bind(this,row)}>删除</Button>
                     <Button type="dashed" style={{marginBottom:'10px',marginLeft:"10px"}} onClick={this.setRights.bind(this,row)}>分配权限</Button>
                </span>
              ),
            },
          ];
        //   const data = this.props.rolesListData 

        
          const { getFieldDecorator } = this.props.form;
            return (
                <div>
                <Card>
                    <Search
                    placeholder="input search text"
                    // onSearch={this.searchRole.bind(this,value)}
                    onSearch={value=> this.searchRole(value)}
                    style={{ width: 200 }}
                    />
                    <Button type="primary" style={{marginLeft:'20px'}} onClick={this.addRole.bind(this)}>添加</Button>
                    <Table columns={columns} dataSource={ this.state.data } 
                    // expandedRowRender={() => <div></div>}
                    childrenColumnName='cgw'
                    pagination={false} rowKey={()=>Math.random()*1000000}/>
                     {/* <Table columns={columns} ></Table> */}
                {/* 修改对话框 */}
                    <Modal
                    title="更新"
                    visible={this.state.updateVisible}
                    onOk={this.updateOk}
                    onCancel={this.updateCancel}
                    >
                    <Form>
                    <Form.Item>
                        <Input value={newRoleName} flag='newRoleName' onChange={this.updateModel.bind(this)}
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder=""
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input value={newRoleDesc} flag='newRoleDesc' onChange={this.updateModel.bind(this)}
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="描述" />
                    </Form.Item>
                    </Form>
                    </Modal>
                {/* 添加对话框 */}
                    <Modal
                    title="添加"
                    visible={this.state.addVisible}
                    onOk={this.addOk}
                    onCancel={this.addCancel}
                    >
                    <Form  className="login-form">
                    <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, message: '请输入用户名' },
                                    { min: 3, message: '至少3个字符' },
                                    { max: 8, message: '最多8个字符' },
                                    // {validator: this.checkUsernameFn}
                                ],
                            })(
                                <Input //value={addRolename} onChange={this.addModel.bind(this)}
                                // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="roleName"
                                />,
                            )}
                    </Form.Item>
                    <Form.Item>
                     {getFieldDecorator('password', {
                                rules: [
                                // {validator: this.checkUsernameFn}
                            ],
                            })(
                                <Input 
                                // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="描述"
                                />
                            )}
                            
                    </Form.Item> 
                    </Form>
                    </Modal>   
                {/* 删除对话框 */}
                    <Modal
                    title="删除"
                    visible={this.state.delVisible}
                    onOk={this.delOk.bind(this,this.state.nowrow)}
                    onCancel={this.delCancel}
                    >
                    是否确定删除？
                    </Modal>  

                    <Modal
                    title="分配权限"
                    visible={this.state.setRightsVisible}
                    onOk={this.setRightsOk}
                    onCancel={this.setRightsCancel}
                    >
                     <Tree
                        checkable
                        // checkStrictly
                        // defaultSelectedKeys={this}
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys}
                        autoExpandParent={this.state.autoExpandParent}
                        onCheck={this.onCheck}
                        checkedKeys={this.state.checkedKeys}
                        onSelect={this.onSelect}
                        selectedKeys={this.state.selectedKeys}
                    >
                        {this.renderTreeNodes(this.state.treeData)}
                    </Tree>
                    </Modal>   
                </Card>
                </div>
            )
        }

    // checkUsernameFn = (rule, value, callback) => {
    //     if (value.length < 3)
    //     {
    //         callback('至少3个字符') 
    //     }
    //     // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    //     return callback()
    //  }
    
    //关闭 修改对话框
    updateCancel = e => {
            // console.log(e);
            this.setState({
                updateVisible: false,
            });
        };
    //修改 双向绑定
    updateModel(e){
       if(e.target.getAttribute('flag')==='newRoleName'){
           console.log(321)
        this.setState({
            newRoleName:e.target.value,
        })
       }else if(e.target.getAttribute('flag')==='newRoleDesc'){
        this.setState({
            newRoleDesc:e.target.value
        })
       }
        
    }
    //修改对话框确认
    updateOk = e => {
            console.log(e);
            console.log(this.state);
            putUpdataRoles({
                id:this.state.nowrow.id,
                roleName:this.state.newRoleName,
                roleDesc:this.state.newRoleDesc
            }).then(res=>{
                if(res.meta.status===200){
                    this.props.get()
                    setTimeout(()=>{
                        this.setState({
                          data:this.props.rolesListData,
                          addVisible: false,
                        })
                    },1000)
                }
            })
            this.setState({
                updateVisible: false,
            });
          };
    //修改对话框弹出
    updataRole(row){
        console.log(row)
        this.setState({
            nowrow:row,
            newRoleDesc:row.roleDesc,
            newRoleName:row.roleName,
            updateVisible: true,
        })
        setTimeout(()=>{
            console.log(this.state)
        },1000)
       
    }

    //关闭 添加对话框
    addCancel = e => {
        console.log(e);
        this.setState({
            addVisible: false,
        });
    };
    //添加对话框确认
    addOk = e=> {
        e.preventDefault();
    this.props.form.validateFields((err, values) => {
        // console.log(values)
      if (!err) {
        this.props.addrole(
            {roleName:values.username,
            roleDesc:values.password,
          })
            //  this.setState({
            //     data:this.props.rolesListData,
            //     addVisible: false,
            // },()=>{
            //     console.log(this.props)
            //     console.log("aaaaaaaaaaaaaq")
            //     this.props.get()
            // })
        this.props.get()
        setTimeout(()=>{
              this.setState({
                data:this.props.rolesListData,
                addVisible: false,
              })
          },1000)
        
        
      }
    });
 };
    //添加对话框弹出
    addRole(){
        this.setState({
            addVisible: true,
        })
    }
    //添加模型的双向绑定
    addModel(e){
        this.setState({
            addRolename:e.target.value
        })
    }
    //关闭 删除对话框
   delCancel = e => {
        console.log(e);
        this.setState({
            delVisible: false,
        });
    };
    //删除对话框确认
    delOk = row => {
        // console.log(row)
        deleteDeleteRoles({id:row.id}).then(res=>{
            console.log(11)
            if(res.meta.status===200){
                this.props.get()
            setTimeout(()=>{
              this.setState({
                data:this.props.rolesListData,
                delVisible: false,
              })
          },500)
            }
        })
        
      };
    //删除对话框弹出
    delRole(row){
        this.setState({
            nowrow:row,
            delVisible: true,
        })
    }

    //关闭 分配权限对话框
    setRightsCancel = e => {
        console.log(e);
        this.setState({
            setRightsVisible: false,
        });
    };
    //分配权限对话框确认
    setRightsOk = e => {
        console.log(e);
        // console.log({roleId:this.state.nowrow.id,manageId:this.state.manageIdArr});
        let manageIdStr=this.state.manageIdArr.join(',')
        postUpdataManage({roleId:this.state.nowrow.id,manageId:manageIdStr})
        .then(res=>{
            if(res.meta.status===200){
                //todo
                this.props.get()
                setTimeout(()=>{
                    this.setState({
                        data:this.props.rolesListData,
                        setRightsVisible: false,
                    })
                },1000)
                Message.success("权限修改成功")
            }else{
                this.setState({
                    setRightsVisible: false,
                });
                Message.error("权限修改失败")
            }
            console.log(res)
        })
        
      };
    //分配权限对话框弹出
    setRights(row){
        console.log(row.children)
        let defaultCheckedKeysArr=[]
        row.children.forEach(first => {
            if (first.children && first.children.length > 0) 
            {
                first.children.forEach(two => {
                    if (two.children && two.children.length > 0) 
                    {
                        two.children.forEach(three => {
                            defaultCheckedKeysArr.push(three.id)
                        })
                        // if(defaultCheckedKeysObj.checked.length===two.children.length){
                        //     defaultCheckedKeysObj.checked.push(two.id)
                        // }else(
                        //     defaultCheckedKeysObj.halfChecked.push(two.id)
                        // )
                    }
                }) 
                // if(defaultCheckedKeysObj.checked.length===two.children.length){
                //     defaultCheckedKeysObj.checked.push(first.id)
                // }else(
                //     defaultCheckedKeysObj.halfChecked.push(first.id)
                // )
            }
        })
        this.setState({
            checkedKeys:defaultCheckedKeysArr,//给树默认选中
            setRightsVisible: true,
            manageIdArr:[],//打开对话框时 权限修改id的数组置空
            nowrow:row,
        })
    }
    //searchRole搜索
    searchRole(value){
        getRolesSearch({id:parseInt(value)}).then(res=>{
            if(res.meta.status===200){
                this.setState({
                    data:[res.data]
                })
            }else{
                Message.error("error")
            }
        })
    }

}
const RolesListForm = Form.create({ name: 'roleslist' })(RolesList);

const mapStateToProps = state => { // state就是仓库store数据
    console.log(state.toJS())
    return { 
        rolesListData:state.toJS().roles.rolesList
        // status:state.toJS().dashBoard
    }
}
const mapDispatchToProps= dispatch => {
    return { 
        get:() => dispatch(usersList()),
        addrole:params => dispatch(addUsers(params))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RolesListForm)

// export default RolesListForm
