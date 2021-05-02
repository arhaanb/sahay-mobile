<template>
	<ion-page>
		<ion-content>
			<div class="container">
				<div class="header">
					<img src="../theme/assets/ylogo.svg" alt="" class="logo" />
					<router-link to="/notifs">
						<img src="../theme/assets/notifs.svg" alt="" class="notif" />
					</router-link>
				</div>
				<h1 class="med hello" v-if="response">Hello, {{ response.name }}</h1>
				<router-link class="white" to="/update">
					<p class="pls">Update hospital details</p>
					<img src="../theme/assets/yellow-arr.svg" alt="">
				</router-link>

				<router-link to="/request">
					<button class="requestbtn">
						<img
							src="../theme/assets/icons/request.svg"
							alt=""
							class="reqimg"
						/>
						<span>Create a request</span>
						<img src="../theme/assets/arrow.svg" alt="" class="arrow" />
					</button>
				</router-link>

				<h2 class="med yellow hospitals">Hospitals</h2>
				<p class="hospp">See what hospitals nearby need/have to offer</p>

				<div v-if="requests">
					<div v-for="req in requests" :key="req">
						<div class="cardreq">
							<div class="info">
								<h1>{{ req.user.name }}</h1>
								<h3>{{ req.reqdata.need }}</h3>
							</div>
							<div v-if="req.reqdata.urgent" class="urgent">
								<div class="circle"></div>
								<span>Urgent</span>
							</div>
							<button class="contactbtn">Contact</button>
						</div>
					</div>
				</div>

				<br />
				<br />
				<br />

				<!-- <br /><br />
				{{ response }}
				<br /><br /> -->

				<!-- <a class="nav-link" @click.prevent="signOut">Sign out</a> -->
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue'
import firebase from 'firebase'
import UserService from '../services.js'
const userData = firebase.auth().currentUser

export default {
	name: 'Dashboard',
	components: {
		IonPage,
		IonContent,
	},
	data() {
		return {
			bropls: userData,
			user: null,
			response: null,
			requests: null,
			error: null,
			load: true,
			setup: null,
			capacity: { current: '', maximum: '' },
			setup: null,
		}
	},
	created: function () {
		this.user = firebase.auth().currentUser
		console.log(firebase.auth().currentUser.email)

		if (!firebase.auth().currentUser) {
			this.$router.push('/login')
		}
		this.getData()
		this.getAllRequests()
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
		getData() {
			UserService.specificHospital(firebase.auth().currentUser.email).then(
				(response) => {
					if (response.data[0].accountSet == 0) {
						this.setup = false
					} else {
						this.setup = true
					}
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
		getAllRequests() {
			UserService.getAllRequests().then(
				(response) => {
					this.requests = response.data
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
.hospitals {
	margin-bottom: 0.2em;
	margin-top: 1em;
}
.hospp {
	margin: 0;
	font-size: 1.1em;
	margin-bottom: 1em;
}
.cardreq {
	padding: 2em 1em;
	border: solid 1px rgba(249, 202, 35, 1);
	background-color: rgba(249, 202, 35, 0.1);
	border-radius: 0.75em;
	margin-bottom: 1em;
	position: relative;
}
.info {
	width: 70%;
}
.urgent,
.contactbtn {
	position: absolute;
}
.urgent {
	top: 2.3em;
	right: 1em;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ff6666;
}
.white {
	color: #fff;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 1.5em;
}
.white p {
	margin: 0;
	margin-right: 0.5em;
	border-bottom: 2px solid rgba(255, 255, 255, 0.267);
}
.white img {
width: 1.5em;
}
.contactbtn {
	background-color: rgba(249, 202, 35, 1);
	color: #4a2c81;
	padding: 0.5em 1em;
	bottom: 1em;
	right: 1em;
	font-size: 1em;
	border-radius: 0.5em;
}
.circle {
	height: 10px;
	width: 10px;
	background-color: #ff6666;
	margin-right: 0.3em;
	border-radius: 100%;
}
.cardreq h1 {
	font-size: 1.5em;
	color: rgba(249, 202, 35, 1);
	margin: 0;
	padding: 0;
}
.cardreq h3 {
	font-size: 1.3em;
	color: #fff;
	text-transform: capitalize;
	margin: 0;
	padding: 0;
}
.hello {
	color: #f9ca23;
	font-size: 1.75em;
	margin-bottom: 0.5em;
}

.pls {
	margin-bottom: 1.5em;
	font-size: 1.3em;
	margin-top: 0;
}
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 2em;
	margin-bottom: 3em;
}
.notif {
	width: 2em;
}
.logo {
	width: 5em;
}

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

.btn {
	width: 50%;
	text-align: left;
	padding: 0.8em 1em;
	font-size: 1em;
	margin-bottom: 1em;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 0.75em;
}

.requestbtn {
	width: 100%;
	text-align: left;
	padding: 0.8em 1.5em;
	font-size: 1em;
	margin-bottom: 2em;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 0.75em;
	background-color: rgba(249, 202, 35, 1);
	color: #4a2c81;
}

.requestbtn .reqimg {
	width: 2em;
}

.arrow {
	width: 1.35em;
}

.requestbtn span {
	font-family: 'luf-semi';
	margin-left: -1.5em;
	font-size: 1.2em;
}

.btn img {
	width: 1.5em;
}

.btn.sign {
	background-color: #f9ca23;
	color: #4a2c81;
}

.btn.meds {
	background-color: rgba(249, 202, 35, 0.1);
	color: rgba(249, 202, 35, 1);
	width: 100%;
	border: solid 1px rgba(249, 202, 35, 1);
	margin-top: 0.5em;
}

.btnflex {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.btnflex span {
	word-wrap: break-word;
}

.btnflex img {
	margin-right: 1.25em;
}

.btn span {
	font-family: 'luf-semi' !important;
}

a {
	text-decoration: none;
}
</style>