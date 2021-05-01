<template>
	<ion-page>
		<div class="container">
			<h1 class="med" v-if="user">Hello, {{ user.data.displayName }}</h1>
			<p>Please complete your details below</p>
			<a class="nav-link" @click.prevent="signOut">Sign out</a>
			{{ user }}
		</div>
	</ion-page>
</template>

<script>
import { IonPage } from '@ionic/vue'
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

<style scoped>
h1.med {
	text-transform: capitalize;
}
</style>