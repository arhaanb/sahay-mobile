<template>
	<ion-page>
		<div class="container">
			<h1 class="yellow login"><strong>Login</strong></h1>
			<div v-if="error">{{ error }}</div>
			<form action="#" @submit.prevent="submit">
				<input
					type="email"
					placeholder="Email/Hospital ID"
					required
					v-model="form.email"
				/>

				<br />

				<input
					type="password"
					placeholder="Password"
					required
					v-model="form.password"
				/>
				<br />

				<button type="submit" class="btn">
					<span class="med">Login</span>
				</button>
			</form>

			<p class="thing">
				<router-link to="/info" class="link"
					>Or create a new account</router-link
				>
			</p>
		</div>
	</ion-page>
</template>

<script>
import firebase from 'firebase'
import { IonPage } from '@ionic/vue'
import UserService from '../services.js'

export default {
	name: 'Login',
	components: {
		IonPage,
	},
	data() {
		return {
			form: {
				email: '',
				password: '',
			},
			yo: false,
			error: null,
		}
	},
	methods: {
		submit() {
			firebase
				.auth()
				.signInWithEmailAndPassword(this.form.email, this.form.password)
				.then((data) => {
					this.$router.push('/dashboard')
				})
				.catch((err) => {
					this.error = err.message
				})
		},
	},
	mounted() {
		// this.getData()
	},
}
</script>

<style scoped>
.yellow {
	color: #f9ca23;
}

.login {
	font-size: 62px;
	margin-bottom: 0.4em;
	margin-top: 3em;
}

input {
	width: 100%;
	padding: 1.4em 1em;
	border: none;
	background-color: rgba(249, 202, 35, 0.1);
	border-radius: 0.75em;
	margin-bottom: 0.5em;
	border: solid 2px rgba(249, 202, 35, 0);
}
input:focus {
	border: solid 2px rgba(249, 202, 35, 0.8);
}

input::placeholder {
	color: rgba(249, 202, 35, 0.4);
}

.btn {
	padding: 1em;
	width: 100%;
	background-color: #f9ca23;
	color: #4a2c81;
	font-size: 23px;
	margin-top: 1.5em;
	border-radius: 0.75em;
}

.link {
	font-size: 1.1em;
	color: #f9ca23;
}

p.thing {
	margin-top: 2em;
}
</style>