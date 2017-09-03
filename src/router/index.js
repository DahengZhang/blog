import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/login'
import Register from '@/views/Register/register'
import Main from '@/views/Main/main'
import Detail from '@/views/Detail/detail'
import Publish from '@/views/Publish/publish'
import Mine from '@/views/Mine/mine'
import Music from '@/views/Music/music'
import NotFound from '@/views/NotFound/not-found'

Vue.use(Router)

const routes = [{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    back: true
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
