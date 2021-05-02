<template>
	<ion-content :scroll-events="true">
		<div class="container">
			<h1 class="med" v-if="user">
				Hello<span v-if="response">, {{ response.name }}</span
				><span v-else>!</span>
			</h1>
			<p>Please complete your details below</p>

			<h2 class="sub">Capacity</h2>
			<input type="text" placeholder="Current capacity" />
			<input type="text" placeholder="Maximum capacity" />

			<h2 class="sub">Commodities</h2>
			<div class="grid">
				<div class="obj">
					<img src="../theme/assets/icons/remedesivir.svg" alt="" />
					<input type="text" placeholder="Remedesivir" />
				</div>

				<div class="obj">
					<img src="../theme/assets/icons/remedesivir.svg" alt="" />
					<input type="text" placeholder="Cylinders" />
				</div>

				<div class="obj">
					<img src="../theme/assets/icons/remedesivir.svg" alt="" />
					<input type="text" placeholder="Heart Rate Monitors" />
				</div>

				<div class="obj">
					<img src="../theme/assets/icons/remedesivir.svg" alt="" />
					<input type="text" placeholder="PPE Kits" />
				</div>

				<div class="obj">
					<img src="../theme/assets/icons/remedesivir.svg" alt="" />
					<input type="text" placeholder="Ventilators" />
				</div>

				<div class="obj">
					<img src="../theme/assets/icons/remedesivir.svg" alt="" />
					<input type="text" placeholder="Beds" />
				</div>

				<div class="obj">
					<img src="../theme/assets/icons/remedesivir.svg" alt="" />
					<input type="text" placeholder="Pulse Oximeters" />
				</div>

				<div class="obj">
					<img src="../theme/assets/icons/remedesivir.svg" alt="" />
					<input type="text" placeholder="BP Monitors" />
				</div>

				<div class="obj">
					<img src="../theme/assets/icons/remedesivir.svg" alt="" />
					<input type="text" placeholder="Masks" />
				</div>

				<div class="obj">
					<img src="../theme/assets/icons/remedesivir.svg" alt="" />
					<input type="text" placeholder="Gloves" />
				</div>
			</div>

			<br /><br />
			{{ response }}
			<br /><br />

			<a class="nav-link" @click.prevent="signOut">Sign out</a>
		</div>
	</ion-content>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue'
import firebase from 'firebase'
import UserService from '../services.js'

export default {
	name: 'Dashboard',
	components: {
		IonPage,
		IonContent,
	},

	data() {
		return {
			user: null,
			response: null,
			error: null,
		}
	},
	created: function () {
		this.user = this.$store.getters.user

		if (!this.$store.getters.user) {
			this.$router.push('/login')
		}
		this.getData()
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
		async getData() {
			UserService.specificHospital(this.$store.getters.user.data.email).then(
				(response) => {
					this.response = response.data[0]

					console.log(response.data[0])
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
	},
}
</script>

<style scoped>
h1.med {
	text-transform: capitalize;
}

.grid {
	display: grid;
	grid-gap: 1em;
	grid-template-columns: repeat(2, 1fr);
}

.obj input {
	all: initial;
	width: 100%;
	padding: 1em 0;
	font-family: 'luf-reg';
	word-wrap: break-word;
	font-size: 0.9em;
	color: #fff;
}

.obj input::placeholder {
	word-wrap: break-word;
}

.obj {
	background-color: rgba(249, 202, 35, 0.1);
	border-radius: 0.75em;
	margin-bottom: 0.5em;
	border: solid 2px rgba(249, 202, 35, 0.2);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1em 0 0;
}

.obj img {
	width: 20px;
	margin: 0;
	margin-right: 10px;
	margin-left: 10px;
}

/* ::-webkit-input-placeholder {
	white-space: pre-line;
	position: relative;
	top: -7px;
}
::-moz-placeholder {
	white-space: pre-line;
	position: relative;
	top: -7px;
}
:-ms-input-placeholder {
	white-space: pre-line;
	position: relative;
	top: -7px;
}
:-moz-placeholder {
	white-space: pre-line;
	position: relative;
	top: -7px;
} */
</style>