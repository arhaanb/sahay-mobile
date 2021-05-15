<template>
	<ion-page>
		<ion-content>
			<div class="container">
				<div class="head">
					<router-link to="/feed" class="back">
						<img src="../theme/assets/icons/back.svg" alt="" />
					</router-link>
					<h1 class="med yellow title">Notifications</h1>
				</div>
			</div>
			<div class="hundred">
				<img src="../theme/assets/not.png" alt="" />
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue'
import firebase from 'firebase'

export default {
	name: 'Dashboard',
	components: {
		IonPage,
		IonContent
	}
}
</script>

<style scoped>
.head {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 3em;
	margin-bottom: 0.5em;
}
.head h1 {
	margin: 0;
}
.back {
	margin: 0;
	margin-right: 3em;
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

a {
	text-decoration: none;
}
</style>
