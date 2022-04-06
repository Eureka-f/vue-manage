import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}


const Main = () => import('../view/Main.vue');
// const Home = () => import('../view/home/Home.vue');
// const User = () => import('../view/user/User.vue');
// const Mall = () => import('../view/mall/Mall.vue');
// const PageOne = () => import('../view/other/PageOne.vue');
// const PageTwo = () => import('../view/other/PageTwo.vue');
const Login = () => import('../view/login/Login.vue');

const routes = [

  {
    path: '/',
    name: 'Main',
    component: Main,
    // redirect: '/home',
    children: [
      // {
      //   path: 'home',
      //   component: Home
      // },
      //   {
      //     path: 'user',
      //     component: User
      //   },
      //   {
      //     path: 'mall',
      //     component: Mall
      //   },
      //   {
      //     path: 'page1',
      //     component: PageOne
      //   },
      //   {
      //     path: 'page2',
      //     component: PageTwo
      //   }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }


]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;