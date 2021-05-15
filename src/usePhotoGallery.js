import { ref, onMounted, watch } from 'vue'
import {
	Plugins,
	CameraResultType,
	CameraSource,
	CameraPhoto,
	Capacitor,
	FilesystemDirectory
} from '@capacitor/core'

const convertBlobToBase64 = blob => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onerror = reject
		reader.onload = () => {
			resolve(reader.result)
		}
		reader.readAsDataURL(blob)
	})
}

const savePicture = async (photo, fileName) => {
	let base64Data
	const response = await fetch(photo.webPath)
	const blob = await response.blob()
	base64Data = await convertBlobToBase64(blob)
	console.log(base64Data)

	return {
		filepath: fileName,
		webviewPath: photo.webPath
	}

	// return { base64Data }
}

export function usePhotoGallery() {
	const { Camera } = Plugins
	const photos = ref([])

	const takePhoto = async () => {
		const cameraPhoto = await Camera.getPhoto({
			resultType: CameraResultType.Uri,
			source: CameraSource.Camera,
			quality: 10
		})

		const fileName = new Date().getTime() + '.jpeg'

		const savedFileImage = await savePicture(cameraPhoto, fileName)

		photos.value = [savedFileImage, ...photos.value]

		return { msg: 'Function to take photo was initialized.' }
	}

	return {
		photos,
		takePhoto
	}
}
