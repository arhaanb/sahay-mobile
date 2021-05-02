import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import Tabs from '../views/Tabs.vue'

const routes = [
	{
		path: '/',
		component: () => import('@/views/home.vue')
	},
	{
		path: '/info',
		component: () => import('@/views/info.vue')
	},
	{
		path: '/login',
		component: () => import('@/views/login.vue')
	},
	{
		path: '/register',
		component: () => import('@/views/register.vue')
	},
	{
		path: '/dashboard',
		component: () => import('@/views/dashboard.vue')
	},
	{
		path: '/setup',
		component: () => import('@/views/setup.vue')
	},
	{
		path: '/otherdata',
		component: () => import('@/views/otherdata.vue')
	},
	{
		path: '/feed',
		component: () => import('@/views/feed.vue')
	},
	{
		path: '/request',
		component: () => import('@/views/request.vue')
	},
	{
		path: '/notifs',
		component: () => import('@/views/notifs.vue')
	},
	{
		path: '/update',
		component: () => import('@/views/update.vue')
	},
	{
		path: '/tabs/',
		component: Tabs,
		children: [
			{
				path: '',
				redirect: '/tabs/tab1'
			},
			{
				path: 'tab1',
				component: () => import('@/views/Tab1.vue')
			},
			{
				path: 'tab2',
				component: () => import('@/views/Tab2.vue')
			},
			{
				path: 'tab3',
				component: () => import('@/views/Tab3.vue')
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
