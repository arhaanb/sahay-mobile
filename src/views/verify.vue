<template>
	<ion-page>
		<ion-content>
			<div class="container">
				<div class="head">
					<router-link to="/request" class="back">
						<img src="../theme/assets/icons/back.svg" alt="" />
					</router-link>
					<h1 class="med yellow title">Validate request</h1>
				</div>

				<div v-if="status == 1" id="before">
					<p class="white scan">
						Validate the order if you’ve received the supplies by scanning the
						QR code on the package.
					</p>

					<button @click="cameraFunction()">
						<span class="med">Scan QR</span>
						<img src="../theme/assets/icons/qr.svg" alt="" />
					</button>
				</div>

				<div v-if="status == 2" class="flex-center">
					<br /><br /><br /><br />
					<br /><br /><br /><br />
					<div id="loading">
						<div class="lds-grid">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
					<h3 class="white semi center">Validating QR code</h3>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
import { usePhotoGallery, Photo } from '@/usePhotoGallery'
const { photos, takePhoto } = usePhotoGallery()
import UserService from '../services.js'

import { IonPage, IonIcon, IonContent } from '@ionic/vue'

export default {
	name: 'Tab2',
	components: {
		IonPage,
		IonIcon,
		IonContent
	},
	data() {
		return {
			status: 1
		}
	},
	methods: {
		async cameraFunction() {
			const bro = await takePhoto()
			console.log(bro)

			this.status = 2
			this.completeRequest()
		},
		async initLoader() {
			this.$router.push('/success/verify')
			// console.log('function start')
			// setTimeout(() => {
			// 	console.log('status revoked')
			// }, 3500)
		},
		completeRequest() {
			UserService.completeRequest(
				this.$route.query.userid,
				this.$route.query.reqid
			).then(
				response => {
					console.log(response)
					this.status = 1
					this.initLoader()
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
		}
	}
}
</script>

<style scoped>
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

button {
	border-radius: 0.75em;
	color: #4a2c81;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-family: 'luf-semi' !important;
	background-color: rgba(249, 202, 35, 1);
	width: 50%;
	padding: 1em 1.25em;
}

button span {
	font-size: 1.3em;
}

.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.scan {
	font-size: 1.3em;
	margin-bottom: 2em;
}

/* Loader */
.lds-grid {
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
}
.lds-grid div {
	position: absolute;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: #fff;
	animation: lds-grid 1.2s linear infinite;
}
.lds-grid div:nth-child(1) {
	top: 8px;
	left: 8px;
	animation-delay: 0s;
}
.lds-grid div:nth-child(2) {
	top: 8px;
	left: 32px;
	animation-delay: -0.4s;
}
.lds-grid div:nth-child(3) {
	top: 8px;
	left: 56px;
	animation-delay: -0.8s;
}
.lds-grid div:nth-child(4) {
	top: 32px;
	left: 8px;
	animation-delay: -0.4s;
}
.lds-grid div:nth-child(5) {
	top: 32px;
	left: 32px;
	animation-delay: -0.8s;
}
.lds-grid div:nth-child(6) {
	top: 32px;
	left: 56px;
	animation-delay: -1.2s;
}
.lds-grid div:nth-child(7) {
	top: 56px;
	left: 8px;
	animation-delay: -0.8s;
}
.lds-grid div:nth-child(8) {
	top: 56px;
	left: 32px;
	animation-delay: -1.2s;
}
.lds-grid div:nth-child(9) {
	top: 56px;
	left: 56px;
	animation-delay: -1.6s;
}
@keyframes lds-grid {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}
</style>
