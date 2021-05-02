<template>
	<ion-page>
		<div class="container">
			<h1 class="yellow login"><strong>Sign up</strong></h1>
			<div v-if="error">{{ error }}</div>
			<form action="#" @submit.prevent="submit">
				<input
					type="name"
					placeholder="Hospital/Entity Name"
					required
					v-model="form.name"
				/>

				<input type="email" placeholder="Email" required v-model="form.email" />

				<br />

				<input type="text" placeholder="Phone" required v-model="form.phone" />

				<br />

				<input
					type="text"
					placeholder="Address"
					required
					v-model="form.address"
				/>
				<br />
				<input
					type="password"
					placeholder="Password"
					required
					v-model="form.password"
				/>

				<br />

				<button type="submit" class="btn">Create account</button>
				<p class="thing">
					<router-link to="/login" class="link"
						>Or login to existing account</router-link
					>
				</p>
			</form>
		</div>
	</ion-page>
</template>


<script>
import firebase from 'firebase'
import { IonPage } from '@ionic/vue'
import UserService from '../services.js'

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
				phone: '',
				address: '',
			},
			error: null,
			response: null,
		}
	},
	methods: {
		extAPI() {
			UserService.regUser({
				name: this.form.name,
				email: this.form.email,
				address: this.form.address,
				password: this.form.password,
				phone: this.form.phone,
			}).then(
				(response) => {
					this.response = response.data
					console.log(response.data)
					this.$router.push('/login')
				},
				(error) => {
					this.error =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString()
				}
			)
		},
		submit() {
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.form.email, this.form.password)
				.then((data) => {
					this.extAPI()
				})
				.catch((err) => {
					this.error = err.message
				})
		},
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
	margin-top: 1.5em;
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
	font-family: 'luf-semi';
}

.link {
	font-size: 1.1em;
	color: #f9ca23;
}

p.thing {
	margin-top: 2em;
}
</style>