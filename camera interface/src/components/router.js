import Vue
from 'vue'
import VueRouter
from 'vue-router'
import PTZVideoScreen
from './PTZVideoScreen/PTZVideoScreen.vue'
import Settings
from './Settings/Settings.vue'

Vue.use( VueRouter )

export function createRouter() {
	return new VueRouter( {
		routes: [
			{
				path: '/',
				name: 'PTZVideoScreen',
				component: PTZVideoScreen,
				props: true,
      },
			{
				path: '/settings',
				name: 'Settings',
				component: Settings,
				props: true
      }
    ],
		mode: 'history'
	} )
}
