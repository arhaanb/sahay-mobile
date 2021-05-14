<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Tab 2</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<div class="container">
				<p>{{ photos }}</p>
			</div>
			<!-- <ion-grid>
				<ion-row>
					<ion-col size="6" :key="photo" v-for="photo in photos">
						<ion-img :src="photo.webviewPath"></ion-img>
					</ion-col>
				</ion-row>
			</ion-grid> -->

			<ion-fab vertical="bottom" horizontal="center" slot="fixed">
				<ion-fab-button @click="takePhoto()">
					<ion-icon :icon="camera"></ion-icon>
				</ion-fab-button>
			</ion-fab>
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
