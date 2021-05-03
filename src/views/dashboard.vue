<template>
	<ion-page>
		<ion-content>
			<div class="container">
				<img src="../theme/assets/ylogo.svg" alt="" class="logo" />
				<h1 class="med hello" v-if="response">Hello, {{ response.name }}</h1>
				<p class="pls">Please complete your details below</p>

				<div class="title">
					<img src="../theme/assets/capacity.svg" alt="" />
					<h2 class="sub">Capacity</h2>
				</div>
				<input
					type="text"
					v-model="capacity.current"
					placeholder="Current capacity"
				/>
				<input
					type="text"
					v-model="capacity.maximum"
					placeholder="Maximum capacity"
				/>

				<br /><br />

				<div class="title">
					<img src="../theme/assets/com.svg" alt="" />
					<h2 class="sub">Commodities</h2>
				</div>

				<div v-if="load" class="grid">
					<div class="obj">
						<img src="../theme/assets/icons/remedesivir.svg" alt="" />
						<input
							type="text"
							placeholder="Remedesivir"
							v-model="items.remedesivir"
						/>
					</div>

					<div class="obj">
						<img src="../theme/assets/icons/cylinder.svg" alt="" />
						<input
							type="text"
							placeholder="Cylinders"
							v-model="items.oxygenCylinder"
						/>
					</div>

					<div class="obj">
						<img src="../theme/assets/icons/heartrate.svg" alt="" />
						<input
							type="text"
							placeholder="Heart Rate Monitors"
							v-model="items.heartRateMonitors"
						/>
					</div>

					<div class="obj">
						<img src="../theme/assets/icons/ppe.svg" alt="" />
						<input type="text" placeholder="PPE Kits" v-model="items.ppeKits" />
					</div>

					<div class="obj">
						<img src="../theme/assets/icons/ventilators.svg" alt="" />
						<input
							type="text"
							placeholder="Ventilators"
							v-model="items.ventilators"
						/>
					</div>

					<div class="obj">
						<img src="../theme/assets/icons/beds.svg" alt="" />
						<input type="text" placeholder="Beds" v-model="items.beds" />
					</div>

					<div class="obj">
						<img src="../theme/assets/icons/pulseoxi.svg" alt="" />
						<input
							type="text"
							placeholder="Pulse Oximeters"
							v-model="items.pulseOximeters"
						/>
					</div>

					<div class="obj">
						<img src="../theme/assets/icons/bpmonitor.svg" alt="" />
						<input
							type="text"
							placeholder="BP Monitors"
							v-model="items.bloodPressureMonitors"
						/>
					</div>

					<div class="obj">
						<img src="../theme/assets/icons/masks.svg" alt="" />
						<input type="text" placeholder="Masks" v-model="items.masks" />
					</div>

					<div class="obj">
						<img src="../theme/assets/icons/gloves.svg" alt="" />
						<input type="text" placeholder="Gloves" v-model="items.gloves" />
					</div>
				</div>

				<div @click="medslink">
					<button class="btn meds">
						<div class="btnflex">
							<img src="../theme/assets/plus.svg" alt="" />
							<span
								>Medicines, blood, <br />
								plasma, etc.</span
							>
						</div>
						<img src="../theme/assets/outarrow.svg" alt="" />
					</button>
				</div>

				<br />

				<button @click="updateData(false)" class="btn sign">
					<span>Next</span>
					<img src="../theme/assets/arrow.svg" alt="" />
				</button>

				<br /><br />
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
			items: {
				masks: '',
				remedesivir: '',
				ppeKits: '',
				gloves: '',
				ventilators: '',
				oxygenCylinder: '',
				beds: '',
				pulseOximeters: '',
				bloodPressureMonitors: '',
				heartRateMonitors: '',
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
					this.response = response.data[0]
					this.capacity.current = this.response.capacity.current
					this.capacity.maximum = this.response.capacity.total

					this.items.masks = this.response.items.masks
					this.items.remedesivir = this.response.items.remedesivir
					this.items.ppeKits = this.response.items.ppeKits
					this.items.gloves = this.response.items.gloves
					this.items.ventilators = this.response.items.ventilators
					this.items.oxygenCylinder = this.response.items.oxygenCylinder
					this.items.beds = this.response.items.beds
					this.items.pulseOximeters = this.response.items.pulseOximeters
					this.items.bloodPressureMonitors = this.response.items.bloodPressureMonitors
					this.items.heartRateMonitors = this.response.items.heartRateMonitors

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
		updateData(notToFeed) {
			UserService.updateData(
				this.items,
				this.capacity,
				firebase.auth().currentUser.email
			).then(
				(response) => {
					if (response.data == 'Account details set.') {
						if (!notToFeed) {
							this.$router.push('/feed')
						}
					}
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
		medslink() {
			this.updateData(true)
			this.$router.push('/otherdata')
		},
	},
}
</script>

<style scoped>
.logo {
	width: 5em;
	margin-top: 2em;
	margin-bottom: 1em;
}

.hello {
	color: #f9ca23;
	font-size: 1.75em;
	margin-bottom: 0.5em;
}

.pls {
	margin-bottom: 1em;
	font-size: 1.3em;
	margin-top: 0;
}
.title {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 0.75em;
}

.title img {
	width: 2em;
	margin-right: 1em;
}
.sub {
	color: #f9ca23;
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