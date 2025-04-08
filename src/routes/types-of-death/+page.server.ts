// import { browser } from '$app/environment'
// import type { TypesOfDeathData } from '$lib/models.ts'
// import { createDeathReportService } from '$lib/services/deathReportService.js'
// // import { createDeathReportService } from '$lib/services/DeathReportService.ts'

// export async function load({ params }): Promise<TypesOfDeathData | undefined> {
// 	console.log('load', params)
// 	if (!browser) {
// 		console.log('abort')
// 		return
// 	}
// 	console.log('loading...')
// 	const deathReportService = createDeathReportService()
// 	return deathReportService.getDeathReport('123')
// }

import type { PageServerLoad, Actions } from './$types'
import db from '$lib/db'
import { v4 as uuidv4 } from 'uuid'
import { fail, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async () => {
	await db.read()
	const deathReports = db.data?.deathReports ?? []
	return { deathReports }
}

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData()
		const newIncident = {
			id: uuidv4(),
			officerName: formData.get('officerName') as string,
			badgeNumber: formData.get('badgeNumber') as string,
			date: formData.get('date') as string,
			time: formData.get('time') as string,
			location: formData.get('location') as string,
			description: formData.get('description') as string,
			typesOfDeath: formData.getAll('typesOfDeath') as string[],
			incidentSeverity: formData.get('incidentSeverity') as string
		}

		// Data validation (optional)
		if (!newIncident.officerName || !newIncident.badgeNumber) {
			return fail(400, { error: 'Officer name and badge number are required.' })
		}

		await db.read()
		db.data?.deathReports.push(newIncident)
		await db.write()

		// Optionally redirect or return success
		return { success: true }
	},

	update: async ({ request }) => {
		const formData = await request.formData()
		const id = formData.get('id') as string

		if (!id) {
			return fail(400, { error: 'ID is required.' })
		}

		await db.read()
		const incident = db.data?.deathReports.find((report) => report.id === id)

		if (!incident) {
			return fail(404, { error: 'Death report not found.' })
		}

		// Update fields
		incident.officerName = formData.get('officerName') as string
		incident.badgeNumber = formData.get('badgeNumber') as string
		incident.date = formData.get('date') as string
		incident.time = formData.get('time') as string
		incident.location = formData.get('location') as string
		incident.description = formData.get('description') as string
		incident.typesOfDeath = formData.getAll('typesOfDeath') as string[]
		incident.incidentSeverity = formData.get('incidentSeverity') as string

		await db.write()

		return { success: true }
	},

	delete: async ({ request }) => {
		const formData = await request.formData()
		const id = formData.get('id') as string

		if (!id) {
			return fail(400, { error: 'ID is required.' })
		}

		await db.read()
		const index = db.data?.deathReports.findIndex((report) => report.id === id)

		if (index !== undefined && index >= 0) {
			db.data?.deathReports.splice(index, 1)
			await db.write()
			return { success: true }
		} else {
			return fail(404, { error: 'Death report not found.' })
		}
	}
}
