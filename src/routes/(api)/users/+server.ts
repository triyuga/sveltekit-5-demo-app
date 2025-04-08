import db from '$lib/db'
import { v4 as uuidv4 } from 'uuid'
import type { SignUpForm } from '$lib/models'
// import type { RequestHandler } from './$types'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url }) => {
	await db.read()
	const id = url.searchParams.get('id')

	if (id) {
		const user = db.data?.users.find((user) => user.id === id)
		if (user) {
			return new Response(JSON.stringify(user), { status: 200 })
		} else {
			return new Response('User not found', { status: 404 })
		}
	} else {
		return new Response(JSON.stringify(db.data?.users), { status: 200 })
	}
}

export const POST: RequestHandler = async ({ request }) => {
	const data: Omit<SignUpForm, 'id'> = await request.json()
	await db.read()

	const newUser: SignUpForm = { id: uuidv4(), ...data }
	db.data?.users.push(newUser)
	await db.write()

	return new Response(JSON.stringify(newUser), { status: 201 })
}

export const PUT: RequestHandler = async ({ request }) => {
	const data: SignUpForm = await request.json()
	const id = data.id

	if (!id) {
		return new Response('ID is required', { status: 400 })
	}

	await db.read()
	const user = db.data?.users.find((user) => user.id === id)

	if (user) {
		Object.assign(user, data)
		await db.write()
		return new Response(JSON.stringify(user), { status: 200 })
	} else {
		return new Response('User not found', { status: 404 })
	}
}

export const DELETE: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id')

	if (!id) {
		return new Response('ID is required', { status: 400 })
	}

	await db.read()
	const index = db.data?.users.findIndex((user) => user.id === id)

	if (index !== -1 && index !== undefined) {
		db.data?.users.splice(index, 1)
		await db.write()
		return new Response('User deleted', { status: 200 })
	} else {
		return new Response('User not found', { status: 404 })
	}
}
