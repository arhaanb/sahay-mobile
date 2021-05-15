<template>
	<ion-page>
		<ion-content>
			<div class="container">
				<div class="head">
					<div @click="updateMeds" class="back">
						<img src="../theme/assets/icons/back.svg" alt="" />
					</div>
				</div>

				<h1 class="med yellow" v-if="user">Other data</h1>
				<p class="ppsub">Please complete your details below</p>

				<p v-if="error">{{ error }}</p>

				<div class="title">
					<img src="../theme/assets/plasma.svg" alt="" />
					<h2 class="yellow med sub">Plasma</h2>
				</div>
				<div class="flex">
					<select v-model="selplasma.group">
						<option value="" selected disabled>Blood group</option>
						<option value="A+">A+</option>
						<option value="B+">B+</option>
						<option value="AB+">AB+</option>
						<option value="O+">O+</option>
						<option value="A-">A-</option>
						<option value="B-">B-</option>
						<option value="AB-">AB-</option>
						<option value="O-">O-</option>
					</select>
					<input type="text" v-model="selplasma.units" placeholder="Units" />
					<div @click="addPlasma" class="plus">
						<img src="../theme/assets/plusbtn.svg" alt="" />
					</div>
				</div>
				<div v-for="(p, index) in plasma" :key="p">
					<div class="grid">
						<p class="yellow med">{{ p.group }}</p>
						<p>{{ p.units }} Units</p>
						<p @click="removePlasma(index)" class="minus">&mdash;</p>
					</div>
				</div>

				<div class="title">
					<img src="../theme/assets/blood.svg" alt="" />
					<h2 class="yellow med sub">Blood</h2>
				</div>
				<div class="flex">
					<select v-model="selblood.group">
						<option value="" selected disabled>Blood Group</option>
						<option value="A+">A+</option>
						<option value="B+">B+</option>
						<option value="AB+">AB+</option>
						<option value="O+">O+</option>
						<option value="A-">A-</option>
						<option value="B-">B-</option>
						<option value="AB-">AB-</option>
						<option value="O-">O-</option>
					</select>

					<input type="text" v-model="selblood.units" placeholder="Units" />

					<div @click="addBlood" class="plus">
						<img src="../theme/assets/plusbtn.svg" alt="" />
					</div>
				</div>
				<div v-for="(p, index) in blood" :key="p">
					<div class="grid" v-if="p.group && p.units">
						<p class="yellow med">{{ p.group }}</p>
						<p>{{ p.units }} Units</p>
						<p @click="removeBlood(index)" class="minus">&mdash;</p>
					</div>
				</div>

				<div class="title">
					<img src="../theme/assets/medicines.svg" alt="" />
					<h2 class="yellow med sub">Medicines</h2>
				</div>
				<div class="flex">
					<input
						type="text"
						v-model="selmedicines.medName"
						placeholder="Name"
					/>

					<input type="text" v-model="selmedicines.units" placeholder="Units" />

					<div @click="addMedicines" class="plus">
						<img src="../theme/assets/plusbtn.svg" alt="" />
					</div>
				</div>
				<div v-for="(p, index) in medicines" :key="p">
					<div class="grid" v-if="p.medName && p.units">
						<p class="yellow med">{{ p.medName }}</p>
						<p>{{ p.units }} Units</p>
						<p @click="removeMedicines(index)" class="minus">&mdash;</p>
					</div>
				</div>

				<br /><br /><br />
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
		IonContent
	},

	data() {
		return {
			user: null,
			response: null,
			error: null,
			setup: null,
			bruh: userData,
			plasma: [],
			blood: [],
			medicines: [],
			selplasma: { group: '', units: '' },
			selblood: { group: '', units: '' },
			selmedicines: { medName: '', units: '' }
		}
	},
	created: async function() {
		this.user = this.$store.getters.user

		if (!this.$store.getters.user) {
			this.$router.push('/login')
		}
		this.getData()
	},
	methods: {
		getData() {
			UserService.specificHospital(this.bruh.email).then(
				response => {
					this.response = response.data[0]
					this.plasma = this.response.plasma
					this.blood = this.response.blood
					this.medicines = this.response.medicines
					console.log(response.data[0])
				},
				error => {
					this.error =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString()
				}
			)
		},
		updateMeds() {
			console.log(firebase.auth().currentUser.email)
			UserService.updateMeds(
				{ blood: this.blood, plasma: this.plasma, medicines: this.medicines },
				firebase.auth().currentUser.email
			).then(
				response => {
					if (response.data == 'Account details set.') {
						console.log('gg')
						this.$router.push('/update')
					}
				},
				error => {
					this.error =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString()
				}
			)
		},
		addPlasma() {
			if (this.selplasma.group !== '' && this.selplasma.units !== '') {
				this.plasma.push(this.selplasma)
				this.selplasma = { group: '', units: '' }
			}
		},
		addBlood() {
			if (this.selblood.group !== '' && this.selblood.units !== '') {
				this.blood.push(this.selblood)
				this.selblood = { group: '', units: '' }
			}
		},
		addMedicines() {
			if (this.selmedicines.medName !== '' && this.selmedicines.units !== '') {
				this.medicines.push(this.selmedicines)
				this.selmedicines = { medName: '', units: '' }
			}
		},
		removePlasma(index) {
			this.plasma.splice(index, 1)
		},
		removeBlood(index) {
			this.blood.splice(index, 1)
		},
		removeMedicines(index) {
			this.medicines.splice(index, 1)
		}
	}
}
</script>

<style scoped>
/* .grid {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin: 1em 0;
}
.grid h1 {
	margin: 0;
	margin-right: 2em;
}

.grid p {
	margin: 0;
} */
.grid {
	display: grid;
	grid-gap: 1em;
	grid-template-columns: repeat(3, 1fr);
}

.title {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 0.5em;
	margin-top: 1em;
}
.title img {
	margin-right: 1em;
	width: 2em;
}
.flex {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
select {
	border: solid 1px #f9ca23;
	background-color: rgba(249, 202, 35, 0.1);
	color: rgb(255, 215, 40);
	border-radius: 0.75em;
	padding: 1em 0.5em;
	margin: 0;
	width: 35%;
}
.plus {
	width: 2em;
}
input {
	padding: 1em;
	margin: 0;
	width: 35%;
}
.ppsub {
	font-size: 1.2em;
	margin-top: 0;
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
h1.med {
	text-transform: capitalize;
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

.btn span {
	font-family: 'luf-semi' !important;
}
</style>
