import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import Vuex from 'vuex'
import axios from 'axios'

import { IonicVue } from '@ionic/vue'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

import './theme/global.css'

/* Optional CSS utils that can be commented out */
// import '@ionic/vue/css/padding.css'
// import '@ionic/vue/css/float-elements.css'
// import '@ionic/vue/css/text-alignment.css'
// import '@ionic/vue/css/text-transformation.css'
// import '@ionic/vue/css/flex-utils.css'
// import '@ionic/vue/css/display.css'

/* Theme variables */
// import './theme/variables.css'

// Firebase
import { firebase } from '@firebase/app'
import '@firebase/auth'

var firebaseConfig = {
	apiKey: 'AIzaSyDM2-tXLYMN3MF4VbD6suTSte3ZQgGgpzc',
	authDomain: 'sahay-c46a5.firebaseapp.com',
	projectId: 'sahay-c46a5',
	storageBucket: 'sahay-c46a5.appspot.com',
	messagingSenderId: '359582059676',
	appId: '1:359582059676:web:6f47c40a7e39edc138b159'
}

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(async user => {
	store.dispatch('fetchUser', user)
})

axios.defaults.baseURL = 'https://localhost:5000'

const app = createApp(App)
	.use(IonicVue)
	.use(router)
	.use(Vuex)
	.use(store)

router.isReady().then(() => {
	app.mount('#app')
})
