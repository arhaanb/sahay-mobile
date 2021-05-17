import axios from 'axios'

const API_URL = 'https://app.sahay.us/api'

class UserService {
	getHosp() {
		return axios.get(`${API_URL}/hospitals`)
	}

	regUser(data) {
		return axios.post(`${API_URL}/register`, {
			name: data.name,
			email: data.email,
			address: data.address,
			password: data.password,
			phone: data.pNumber
		})
	}

	updateData(data, capacity, emailid) {
		return axios.post(
			`${API_URL}/set`,
			{
				masks: data.masks,
				remedesivir: data.remedesivir,
				ppeKits: data.ppeKits,
				gloves: data.gloves,
				ventilators: data.ventilators,
				oxygenCylinder: data.oxygenCylinder,
				beds: data.beds,
				pulseOximeters: data.pulseOximeters,
				bloodPressureMonitors: data.bloodPressureMonitors,
				heartRateMonitors: data.heartRateMonitors,
				current: capacity.current,
				max: capacity.maximum
			},
			{ headers: { email: emailid } }
		)
	}

	updateMeds(data, emailid) {
		console.log(emailid)
		return axios.post(
			`${API_URL}/meds`,
			{
				blood: data.blood,
				plasma: data.plasma,
				medicines: data.medicines
			},
			{ headers: { email: emailid } }
		)
	}

	createRequest(data, emailid) {
		return axios.post(
			`${API_URL}/request`,
			{
				request: {
					urgent: data.urgent,
					description: data.description,
					need: data.need
				}
			},
			{ headers: { email: emailid } }
		)
	}

	getAllRequests() {
		return axios.get(`${API_URL}/allreqs`)
	}

	specificHospital(id) {
		return axios.get(`${API_URL}/user`, { headers: { email: id } })
	}

	completeRequest(userid, requestid) {
		return axios.get(
			`${API_URL}/del-request?userid=${userid}&requestid=${requestid}`
		)
	}
}

export default new UserService()
