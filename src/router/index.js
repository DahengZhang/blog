import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/login'
import Register from '@/components/Register/register'
import Main from '@/components/Main/main'
import Detail from '@/components/Detail/detail'
import Publish from '@/components/Publish/publish'
import Mine from '@/components/Mine/mine'
import Music from '@/components/Music/music'
import NotFound from '@/components/NotFound/not-found'

Vue.use(Router)

const routes = [{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    back: false
  }
}, {
  path: '/register',
  name: 'Register',
  component: Register,
  meta: {
    back: false
  }
}, {
  path: '/index',
  name: 'Index',
  component: Main,
  meta: {
    keepAlive: true,
    back: false
  }
}, {
  path: '/detail',
  name: 'Detail',
  component: Detail,
  meta: {
    back: true
  }
}, {
  path: '/publish',
  name: 'Publish',
  component: Publish,
  meta: {
    back: true
  }
}, {
  path: '/mine',
  name: 'Mine',
  component: Mine,
  meta: {
    back: true
  }
}, {
  path: '/music',
  name: 'Music',
  component: Music,
  meta: {
    back: true
  }
}, {
  path: '/',
  redirect: '/index'
}, {
  path: '*',
  name: 'Error',
  component: NotFound,
  meta: {
    keepAlive: true,
    back: false
  }
}]

const router = new Router({
  routes
})

export default router
