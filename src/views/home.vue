<template>
	<ion-page>
		<div class="container">
			<img src="../theme/assets/ylogo.svg" alt="" class="logo" />
			<h1 class="sahay">Sahay</h1>

			<router-link to="/login">
				<button class="btn sign">
					<span>Sign in</span>
					<img src="../theme/assets/arrow.svg" alt="" />
				</button>
			</router-link>

			<router-link to="/info">
				<button class="btn create">
					<span>Create account</span>
					<img src="../theme/assets/yellow-arr.svg" alt="" />
				</button>
			</router-link>
		</div>
	</ion-page>
</template>


<script>
import { IonPage } from '@ionic/vue'

export default {
	name: 'Home',
	components: {
		IonPage,
	},
}
</script>

<style scoped>
.sahay {
	font-family: 'luf-bold' !important;
	color: #f9ca23;
	font-size: 4em;
	margin-bottom: 0.75em;
	margin-top: 0.2em;
}

.btn {
	width: 100%;
	text-align: left;
	padding: 1em 1.25em;
	font-size: 1.2em;
	margin-bottom: 1em;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 0.75em;
}

.logo {
	width: 7em;
	margin-top: 17em;
}

.btn img {
	width: 1.5em;
}

.btn.sign {
	background-color: #f9ca23;
	color: #4a2c81;
}

.btn.create {
	border: solid 1px #f9ca23;
	background-color: rgba(249, 202, 35, 0.1);
	color: #f9ca23;
}

.btn span {
	font-family: 'luf-semi' !important;
}

a {
	text-decoration: none;
}
</style>