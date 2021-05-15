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

				<p class="white scan">
					Validate the order if you’ve received the supplies by scanning the QR
					code on the package.
				</p>

				<button @click="cameraFunction()">
					<span class="med">Scan QR</span>
					<img src="../theme/assets/icons/qr.svg" alt="" />
				</button>
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
import { camera, trash, close } from 'ionicons/icons'
import { usePhotoGallery, Photo } from '@/usePhotoGallery'

import { IonPage, IonIcon, IonContent } from '@ionic/vue'

export default {
	name: 'Tab2',
	components: {
		IonPage,
		IonIcon,
		IonContent
	},
	setup() {
		const { photos, takePhoto } = usePhotoGallery()

		const cameraFunction = async () => {
			const bro = await takePhoto()
			console.log(bro)
		}

		return {
			photos,
			takePhoto,
			cameraFunction,
			camera,
			trash,
			close
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
</style>
