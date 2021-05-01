<template>
	<ion-page>
		<div class="container">
			<img class="info" src="../theme/assets/info.svg" alt="" />

			<h1>Hospital management in one app</h1>
			<p>
				Lorem ipsum dolor sit amet loda lassan arhaan sexy siddhayak super sexy
				haha haha bruh good app.
			</p>

			<router-link to="/register">
				<button class="btn sign">
					<span>Next</span>
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
		IonPage,
	},
}
</script>

<style scoped>
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

a {
	text-decoration: none;
}

img.info {
	margin-top: 6em;
	margin-bottom: 1em;
}
</style>