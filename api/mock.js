import Mock from 'mockjs'
import homeApi from './mockServeData/home.js'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'

Mock.mock('/home/getData', homeApi.getStatisticalData);
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)

Mock.mock(/user\/getuser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/, 'post', userApi.deleteUser)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)

Mock.mock(/mall\/getMallData/, 'get', homeApi.getMallList)
Mock.mock(/mall\/add/, 'post', homeApi.addRecord)
Mock.mock(/mall\/edit/, 'post', homeApi.editRecord)
Mock.mock(/mall\/dele/, 'post', homeApi.deleteRecord)