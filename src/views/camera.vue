<template>
	<ion-page>
		<ion-content>
			<div class="container">
				<h1>Yo</h1>
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
import { camera, trash, close } from 'ionicons/icons'
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
import { usePhotoGallery } from '@/usePhotoGallery'

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
		const { takePhoto } = usePhotoGallery()

		return {
			takePhoto,
			camera,
			trash,
			close
		}
	}
}
</script>
