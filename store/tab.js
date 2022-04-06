import Cookies from 'js-cookie'
export default {
  state: {
    isCollapse: false,
    tabList: [
      {
        path: '/home',
        label: '首页'
      }
    ],
    currentMenu: null,
    menu: []
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },

    selectMenu(state, val) {
      //如果不是首页
      if (val.path !== '/home') {
        state.currentMenu = val;
        let result = state.tabList.findIndex(item => item.path === val.path);
        if (result === -1) {
          state.tabList.push(val)
        }
      } else {
        state.currentMenu = null
      }
    },
    deleteMenu(state, val) {
      let result = state.tabList.findIndex(item => item.path === val.path);
      state.tabList.splice(result, 1)
    },
    setMenu(state, val) {
      state.menu = val
      Cookies.set('menu', JSON.stringify(val))
    },
    clearMenu(state) {
      state.menu = []
      Cookies.remove('menu')
    },
    addMenu(state, router) {
      if (!Cookies.get('menu')) {
        return
      }
      const menu = JSON.parse(Cookies.get('menu'))
      state.menu = menu;
      const menuArray = [];
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`../view/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`../view/${item.url}`)

          menuArray.push(item)
        }
      });

      //添加动态路由
      menuArray.forEach(item => {
        router.addRoute('Main', item)//Main为父路由，添加在Main下面
      })
      // router.addRoutes(menuArray)

    }

  },
  actions: {

  }
}