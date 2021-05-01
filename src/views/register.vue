<template>
	<ion-page>
		<div>
			<div class="card-header">Register</div>
			<router-link to="/login">already have an account?</router-link>
			<div class="card-body">
				<div v-if="error">{{ error }}</div>
				<form action="#" @submit.prevent="submit">
					<label for="name">Name</label>
					<input type="name" required v-model="form.name" />

					<br />

					<label for="email">Email</label>
					<input type="email" required v-model="form.email" />

					<br />

					<label for="password">Password</label>
					<input type="password" required v-model="form.password" />

					<br />

					<button type="submit" class="btn btn-primary">Register</button>
				</form>
			</div>
		</div>
	</ion-page>
</template>


<script>
import firebase from 'firebase'
import { IonPage } from '@ionic/vue'

export default {
	name: 'Register',
	components: {
		IonPage,
	},
	data() {
		return {
			form: {
				name: '',
				email: '',
				password: '',
			},
			error: null,
		}
	},
	methods: {
		submit() {
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.form.email, this.form.password)
				.then((data) => {
					data.user
						.updateProfile({
							displayName: this.form.name,
						})
						.then(() => {})
				})
				.catch((err) => {
					this.error = err.message
				})
		},
	},
}
</script>