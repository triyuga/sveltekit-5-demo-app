import type { PageServerLoad, Actions } from './$types'
import db from '$lib/db'
import { v4 as uuidv4 } from 'uuid'
import { fail, redirect } from '@sveltejs/kit'
import type { TypesOfDeathData } from '$lib/models'

export const load: PageServerLoad = async () => {
	console.log('src/routes/death-reports/+layout.server.ts load')
	await db.read()
	const deathReports: TypesOfDeathData[] = db.data?.deathReports ?? []
	return { deathReports }
}

export const actions: Actions = {
	create: async ({ request }) => {
		console.log('request', request)

		const formData = await request.formData()
		const formObject = Object.fromEntries([
			...formData
		]) as Partial<TypesOfDeathData>
		console.log('formObject', formObject)

		const newDeathReport: TypesOfDeathData = {
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
		if (!newDeathReport.officerName || !newDeathReport.badgeNumber) {
			return fail(400, { error: 'Officer name and badge number are required.' })
		}

		await db.read()
		db.data?.deathReports.push(newDeathReport)
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
