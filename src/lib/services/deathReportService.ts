import {
	defaultTypesOfDeathData,
	typesOfDeathFormKey,
	type TypesOfDeathData
} from '$lib/models'
import { delay } from '$lib/delay'
import { config } from '$lib/config'

interface DeathReportService {
	getDeathReport: (id: string) => Promise<TypesOfDeathData>
	updateDeathReport: (id: string, data: TypesOfDeathData) => Promise<void>
}

export const createDeathReportService = (): DeathReportService => {
	return {
		getDeathReport: async (id: string) => {
			await delay(config.apiDelayMilliseconds)
			const key = `${typesOfDeathFormKey}:${id}`
			const storedData = localStorage.getItem(key)
			return storedData
				? { ...defaultTypesOfDeathData, ...JSON.parse(storedData) }
				: defaultTypesOfDeathData
		},
		updateDeathReport: async (id: string, data: TypesOfDeathData) => {
			console.log('updateDeathReport')
			await delay(config.apiDelayMilliseconds)
			const key = `${typesOfDeathFormKey}:${id}`
			const initialValueString = JSON.stringify(defaultTypesOfDeathData)
			const previousValueString = localStorage.getItem(key)
			const valueString = JSON.stringify(data)
			if (![initialValueString, previousValueString].includes(valueString)) {
				localStorage.setItem(key, valueString)
				console.log('...saved')
			} else {
				console.log('...not saved')
			}
		}
	}
}
