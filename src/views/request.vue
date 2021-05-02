<template>
	<ion-page>
		<ion-content>
			<div class="container">
				<div class="head">
					<router-link to="/feed" class="back">
						<img src="../theme/assets/icons/back.svg" alt="" />
					</router-link>
					<h1 class="med yellow title">Requests</h1>
				</div>
				<p class="poppy">Explain your problem and how others can help</p>

				<input
					type="text"
					v-model="req.need"
					placeholder="Problem (Ex. need ventilators)"
				/>
				<h2 class="sub yellow med">Description</h2>
				<textarea
					type="text"
					v-model="req.description"
					placeholder="Further explanation"
				/>
				<br />
				<div style="margin-top: 0.75em" class="switchboc">
					<label>Urgent?</label>
					<label class="switch">
						<input type="checkbox" value="1" v-model="req.urgent" />
						<span class="slider round"></span>
					</label>
				</div>

				<br />
				<button @click="sendRequest" class="btn sign">
					<span>Request help</span>
					<img src="../theme/assets/arrow.svg" alt="" />
				</button>
				<br />

				<section v-if="hasReqs">
					<h2 class="yellow med">Existing requests</h2>
					<div v-for="r in response.requests" :key="r">
						<div class="cardreq">
							<h3 class="yellow med">{{ r.need }}</h3>
							<p>
								<span class="yellow">Status:</span>
								<span v-if="r.urgent" class="urgent">&nbsp;Urgent</span>
								<span v-else>&nbsp;Not Urgent</span>
							</p>
							<button class="contactbtn">Contact</button>
						</div>
					</div>
				</section>

				<br />
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
			error: null,
			load: true,
			setup: null,
			capacity: { current: '', maximum: '' },
			setup: null,
			hasReqs: false,
			req: {
				description: '',
				need: '',
				urgent: false,
			},
		}
	},
	created: function () {
		this.user = firebase.auth().currentUser
		console.log(firebase.auth().currentUser.email)

		if (!firebase.auth().currentUser) {
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
		getData() {
			UserService.specificHospital(firebase.auth().currentUser.email).then(
				(response) => {
					if (response.data[0].accountSet == 0) {
						this.setup = false
					} else {
						this.setup = true
					}

					if (
						response.data[0].requests.length > 0 ||
						response.data[0].requests !== []
					) {
						this.hasReqs = true
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
		sendRequest() {
			UserService.createRequest(
				{
					urgent: this.req.urgent,
					description: this.req.description,
					need: this.req.need,
				},
				firebase.auth().currentUser.email
			).then(
				(response) => {
					console.log(response.data)
					// if (response.data == 'Account details set.') {
					// }
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
.cardreq {
	padding: 1em;
	border: solid 1px rgba(249, 202, 35, 1);
	background-color: rgba(249, 202, 35, 0.1);
	margin-bottom: 1em;
	border-radius: 0.75em;
	position: relative;
}
.contactbtn {
	position: absolute;
	background-color: rgba(249, 202, 35, 1);
	color: #4a2c81;
	padding: 0.5em 1em;
	bottom: 2.9em;
	right: 1.75em;
	font-size: 1em;
	border-radius: 0.5em;
}
.urgent {
	color: #ff6666;
}
h1.med {
	text-transform: capitalize;
}
.sub {
	font-size: 1.2em;
}
.poppy {
	font-size: 1.1em;
}
.head {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 3em;
	margin-bottom: 2em;
}
.head h1 {
	margin: 0;
}
.back {
	margin: 0;
	margin-right: 3em;
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

textarea {
	min-width: 100%;
	max-width: 100%;
	min-height: 7em;
}

/* SLider shit */
.switch {
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;
}
.switch input {
	opacity: 0;
	width: 0;
	height: 0;
}
.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}
.slider:before {
	position: absolute;
	content: '';
	height: 26px;
	width: 26px;
	left: 4px;
	bottom: 4px;
	background-color: white;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}
input:checked + .slider {
	background-color: rgb(187, 104, 212);
}
input:focus + .slider {
	box-shadow: 0 0 1px rgb(187, 104, 212);
}
input:checked + .slider:before {
	-webkit-transform: translateX(26px);
	-ms-transform: translateX(26px);
	transform: translateX(26px);
}
/* Rounded sliders */
.slider.round {
	border-radius: 34px;
}
.slider.round:before {
	border-radius: 50%;
}
.switchboc {
	display: flex;
	align-items: center;
}
.switchboc label {
	margin-right: 1em;
}
</style>