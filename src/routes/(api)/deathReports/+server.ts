// src/routes/api/deathReports/+server.ts
import db from '$lib/db'
import { v4 as uuidv4 } from 'uuid'
import type { TypesOfDeathData } from '$lib/models'
// import type { RequestHandler } from './$types'
import type { RequestHandler } from '@sveltejs/kit'

// GET /api/deathReports?id=INCIDENT_ID or GET /api/deathReports
export const GET: RequestHandler = async ({ url }) => {
	await db.read()
	const id = url.searchParams.get('id')

	if (id) {
		const incident = db.data?.deathReports.find(
			(incident) => incident.id === id
		)
		if (incident) {
			return new Response(JSON.stringify(incident), { status: 200 })
		} else {
			return new Response('Incident not found', { status: 404 })
		}
	} else {
		// Return all deathReports
		return new Response(JSON.stringify(db.data?.deathReports), { status: 200 })
	}
}

// POST /api/deathReports
export const POST: RequestHandler = async ({ request }) => {
	const data: Omit<TypesOfDeathData, 'id'> = await request.json()
	await db.read()

	const newIncident: TypesOfDeathData = { id: uuidv4(), ...data }
	db.data?.deathReports.push(newIncident)
	await db.write()

	return new Response(JSON.stringify(newIncident), { status: 201 })
}

// PUT /api/deathReports
export const PUT: RequestHandler = async ({ request }) => {
	const data: TypesOfDeathData = await request.json()
	const id = data.id

	if (!id) {
		return new Response('ID is required', { status: 400 })
	}

	await db.read()
	const incident = db.data?.deathReports.find((incident) => incident.id === id)

	if (incident) {
		Object.assign(incident, data)
		await db.write()
		return new Response(JSON.stringify(incident), { status: 200 })
	} else {
		return new Response('Incident not found', { status: 404 })
	}
}

// DELETE /api/deathReports?id=INCIDENT_ID
export const DELETE: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id')

	if (!id) {
		return new Response('ID is required', { status: 400 })
	}

	await db.read()
	const index = db.data?.deathReports.findIndex(
		(incident) => incident.id === id
	)

	if (index !== -1 && index !== undefined) {
		db.data?.deathReports.splice(index, 1)
		await db.write()
		return new Response('Incident deleted', { status: 200 })
	} else {
		return new Response('Incident not found', { status: 404 })
	}
}
