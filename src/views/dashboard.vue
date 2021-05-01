<template>
	<ion-page>
		<div>
			<!-- <h1>Hello man.. {{ user.data.displayName }}</h1> -->
			<a class="nav-link" @click.prevent="signOut">Sign out</a>
			{{ user }}
		</div>
	</ion-page>
</template>

<script>
import { IonPage, onIonViewDidEnter } from '@ionic/vue'
import firebase from 'firebase'

export default {
	name: 'Dashboard',
	components: {
		IonPage,
	},

	data() {
		return {
			user: null,
		}
	},
	created: function () {
		this.user = this.$store.getters.user

		if (!this.user.loggedIn) {
			this.$router.push('/login')
		}
	},

	methods: {
		signOut() {
			firebase
				.auth()
				.signOut()
				.then(() => {
					this.$router.push('/login')
				})
		},
	},
}
</script>