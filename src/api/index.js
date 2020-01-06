//1.引入axios模块
import axios from 'axios'
import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css'
//2.全局配置
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
// axios.defaults.baseURL = 'http://http://106.13.181.2/:8888/api/private/v1'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    NProgress.start()
    //1.获取token
    var token = localStorage.getItem('token') || sessionStorage.getItem('token')
    //2.判断
    if (token) {
        //设置请求头（后期请求接口 http请求头携带Authorization参数）
        config.headers['Authorization'] = token
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
    NProgress.done()
    return config
})

// let token = localStorage.getItem('token') || sessionStorage.getItem('token') || 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1NzY1NTIzNjAsImV4cCI6MTU3NjYzODc2MH0.oKpHuKgUxCEE9r5-AlKBZg04I7DTlCUtdd4r2yEpguY'
// axios.defaults.headers.common['Authorization'] = token


// 语法
// GET      axios.get(请求路径，{params: 数据对象})   
//          axios.get(请求路径，{params: {uname:'aaa', pwd:'bbb'}})   
// POST     axios.post(请求路径，数据对象)   
// PUT      axios.put(请求路径，数据对象)   
// DELETE   axios.delete(`请求路径/${id}`)   

// 登录
export const postLogin = (params) => {
    return axios.post('login', params)
        .then(result => result.data)
}
// 左侧菜单权限
export const getMenus = () => {
    return axios.get('menus')
        .then(result => result.data)
}
// 用户列表
export const getUsers = (params) => {
    return axios.get('users', {
            params
        })
        .then(result => result.data)
}
// 新增用户
export const postUsers = (params) => {
    return axios.post('users', params)
        .then(result => result.data)
}
// 删除用户
export const delUsers = (id) => {
    return axios.delete(`users/${id}`)
        .then(result => result.data)
}
// 编辑用户
export const putUsers = (params) => {
    return axios.put(`users/${params.id}`, params)
        .then(result => result.data)
}
// 用户状态
export const putUsersState = (id, state) => {
    return axios.put(`users/${id}/state/${state}`)
        .then(result => result.data)
}
// 数据统计
export const getData = () => {
    return axios.get('reports/type/1').then(res => res.data)
}

//获取权限列表 tree/list
export const getRightsList= (params)=>{
    return axios.get(`rights/${params.type}`).then(res=>res.data)
}

//获取角色&权限列表 
export const getRolesList= ()=>{
    return axios.get(`roles`).then(res=>res.data)
}

//修改权限  roles/:roleId/rights 
export const postUpdataManage= params=>{
    return axios.post(`roles/${params.roleId}/rights`,{rids:params.manageId}).then(res=>res.data)
}

//删除单个权限
export const deleteDeleteManage= params=>{
    return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`).then(res=>res.data)
}

//角色列表查找
export const getRolesSearch= params=>{
    return axios.get(`roles/${params.id}`).then(res=>res.data)
}

//角色添加
export const postAddRoles= params=>{
    return axios.post(`roles`,params).then(res=>res.data)
}

//角色编辑
export const putUpdataRoles= params=>{
    return axios.put(`roles/${params.id}`,{roleName:params.roleName,roleDesc:params.roleDesc}).then(res=>res.data)
}
//角色删除
export const deleteDeleteRoles= params=>{
    return axios.delete(`roles/${params.id}`).then(res=>res.data)
}

// 热度数据
export const getHot = () => {
    return axios.get('reports/type/2').then(res => res.data)
}
// 订单列表
export const getOrder = params => {
    return axios.get('orders',{params}).then(res => res.data)
}
//修改订单状态
export const putOrder = params => {
    return axios.put(`orders/${params.id}`, params).then(res => res.data)
}
//查看订单状态
export const getBrowOrder = id => {
    return axios.get(`orders/${id}`).then(res => res.data)
}
//商品列表接口
export const getGoodsListApi = getData => {
    return axios.get('goods', {
        params: getData
    }).then(res => res.data)
}
//商品修改
export const putGoodsList=(id,putData)=>{
    return axios.put(`goods/${id}`,putData).then(res=>res.data)
}
//商品删除
export const deleteGoodsListApi=id=>{
    return axios.delete(`goods/${id}`).then(res=>res.data)
}
//商品添加
export const postGoods=postData=>{
    return axios.post('goods',postData).then(res=>res.data)
}
//上传图片
// export const postFile=postData=>{
//     return axios.post('upload',postData).then(res=>res.data)
// }
//分类列表渲染
export const getGoodsfl = params => { //{query,pagesize,pagenum}
    return axios({
        method: 'get',
        url: 'categories',
        params: params
    }).then(res => res.data)
}
// 商品分类列表
export const getGoodsCateList = params => {
    return axios.get('categories', {
        params: params
    }).then(res => res.data)
}
// 商品分类添加
export const addGoodsCate = params => {
    return axios.post('categories', params).then(res => res.data)
}
// 商品分类删除
export const deleteGoodsCate = catId => {
    return axios.delete(`categories/${catId}`).then(res => res.data)
}
// 商品分类修改
export const setGoodsCate = (catId, params) => {
    return axios.put(`categories/${catId}`, params).then(res => res.data)
}
// id搜索商品分类
export const cateSearch = params => {
    return axios.get(`categories/${params}`).then(res => res.data)
}

// 角色分配
export const setRoles = (id, params) => {
    return axios.put(`users/${id}/role`, params).then(res => res.data)
}

// 获取分类参数
export const getParams = (id,params) => {
    return axios.get(`categories/${id}/attributes`,{ params }).then(res => res.data)
}
// 添加相应分类参数
export const addParams = (id,params) => {
    return axios.post(`categories/${id}/attributes`, params).then(res => res.data)
}
// 修改分类参数
export const editParams = (id,attrId,params) => {
    return axios.put(`categories/${id}/attributes/${attrId}`, params).then(res => res.data)
}
// 删除分类参数
export const removeParams = (id,attrId) => {
    return axios.delete(`categories/${id}/attributes/${attrId}`).then(res => res.data)
}