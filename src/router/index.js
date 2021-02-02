import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) // 注册模块

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/Home/hot',
        component: () => import('../views/Home/Hot.vue')
      },
      {
        path: '/Home/coming',
        component: () => import('../views/Home/Coming.vue')
      },
      {
        path: '',
        redirect: '/Home/hot'
      }
    ]
  },
  {
    path: '/information',
    name: 'Information',
    component: () => import('../views/Information.vue')
  },
  {
    path: '/About',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/list.vue')
  },
  {
    path: '/data/:myid',
    name: 'Databb',
    component: () => import('../views/data.vue')
  },
  // {
  //   path: '/data',
  //   component: Data
  // },
  {
    path: '/login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '*',
    redirect: '/Home'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const auth = ['/About']
  if (auth.includes(to.fullPath)) {
    if (!localStorage.getItem('abc')) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
