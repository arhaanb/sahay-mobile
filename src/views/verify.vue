<template>
	<ion-page>
		<ion-content>
			<div class="container">
				<div class="head">
					<router-link to="/request" class="back">
						<img src="../theme/assets/icons/back.svg" alt="" />
					</router-link>
					<h1 class="med yellow title">Verify Request</h1>
				</div>

				<div class="flex-center">
					<br /><br /><br />
					<button @click="takePhoto()">
						<ion-icon :icon="camera"></ion-icon>
					</button>
					<br /><br />
					<h3 class="scan">
						Scan the QR code received with your goods to verify your request.
					</h3>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
import { camera, trash, close } from 'ionicons/icons'
import { usePhotoGallery, Photo } from '@/usePhotoGallery'

import {
	IonPage,
	IonHeader,
	IonFab,
	IonFabButton,
	IonIcon,
	IonToolbar,
	IonTitle,
	IonContent,
	IonGrid,
	IonRow,
	IonCol,
	IonImg
} from '@ionic/vue'

export default {
	name: 'Tab2',
	components: {
		IonPage,
		IonHeader,
		IonFab,
		IonFabButton,
		IonIcon,
		IonToolbar,
		IonTitle,
		IonContent,
		IonGrid,
		IonRow,
		IonCol,
		IonImg
	},
	setup() {
		const { photos, takePhoto } = usePhotoGallery()

		return {
			photos,
			takePhoto,
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
	font-size: 3em;
	padding: 1em;
	border-radius: 0.5em;
	width: 100%;
	background-color: rgba(249, 202, 35, 0.1);
	border: solid 1px rgba(249, 202, 35, 1);
}

.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.scan {
	font-size: 1.2em;
	width: 80%;
}
</style>
