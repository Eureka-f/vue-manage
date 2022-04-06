import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import {
  Button,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Dialog,
  Form,
  FormItem,
  Input,
  RadioGroup,
  Radio,
  Select,
  Option,
  DatePicker,
  Pagination,
  MessageBox,
  Message
} from 'element-ui';

import router from '../router'
import store from '../store'
import axios from 'axios'
import '../api/mock'

Vue.config.productionTip = false

// Vue.use(ElementUI); 全局引入
Vue.use(Button);

Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);

Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.use(Row);
Vue.use(Col);
Vue.use(Card);

Vue.use(Table);
Vue.use(TableColumn);

Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);

Vue.use(Tag);

Vue.use(Dialog);

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Pagination);

//全局使用axios
Vue.prototype.$http = axios;
//全局挂载confirm
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

//导航守卫
router.beforeEach((to, from, next) => {
  store.commit('getToken')//防止页面刷新丢失Token
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next('/home')
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),//给绑定节点（app）渲染一个vue组件/使用App.vue作为这个Vue实例的template
  created() {
    store.commit("addMenu", router);
  }
}).$mount('#app')//创建并挂载到 #app (会替换 #app) index.html里的app
