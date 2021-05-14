<template>
	<ion-page>
		<div class="container">
			<img src="../theme/assets/ylogo.svg" alt="" class="logo" />

			<h1 class="yellow">Your request was verified!</h1>
			<p class="white">
				Your goods have been delivered and your request has been successfully
				validated through Redis. Stay safe!
			</p>

			<router-link to="/feed">
				<button class="btn sign">
					<span>Home</span>
					<img src="../theme/assets/arrow.svg" alt="" />
				</button>
			</router-link>
		</div>
	</ion-page>
</template>

<script>
import { IonPage } from '@ionic/vue'

export default {
	name: 'Info',
	components: {
		IonPage
	}
}
</script>

<style scoped>
.logo {
	width: 5em;
	margin-top: 2em;
	margin-bottom: 3em;
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
	margin-top: 2em;
}

.yellow {
	color: #f9ca23;
	font-family: 'luf-semi';
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

a {
	text-decoration: none;
}

img.info {
	margin-top: 4em;
	margin-bottom: 1em;
	margin-left: 0.5em;
}
</style>
