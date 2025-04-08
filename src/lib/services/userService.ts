import { delay } from '$lib/delay'
import { config } from '../config'
import { defaultSignUpForm, signUpFormKey, type SignUpForm } from '$lib/models'

interface UserService {
	getSignUpForm: () => Promise<SignUpForm>
	updateSignUpForm: (data: SignUpForm) => Promise<void>
}

export const createUserService = (): UserService => {
	return {
		getSignUpForm: async () => {
			await delay(config.apiDelayMilliseconds)
			const key = signUpFormKey
			const storedData = localStorage.getItem(key)
			return storedData
				? { ...defaultSignUpForm, ...JSON.parse(storedData) }
				: defaultSignUpForm
		},
		updateSignUpForm: async (data: SignUpForm) => {
			await delay(config.apiDelayMilliseconds)
			const key = signUpFormKey
			const initialValueString = JSON.stringify(defaultSignUpForm)
			const previousValueString = localStorage.getItem(key)
			const valueString = JSON.stringify(data)
			if (![initialValueString, previousValueString].includes(valueString)) {
				localStorage.setItem(key, valueString)
			}
		}
	}
}
