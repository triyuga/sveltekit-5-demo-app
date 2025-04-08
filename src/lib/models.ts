import { v4 as uuidv4 } from 'uuid'

export interface User {
	name: string
}

export const typesOfDeathFormKey = 'TypesOfDeathForm'

export interface TypesOfDeathData {
	id: string
	officerName: string
	badgeNumber: string
	date: string
	time: string
	location: string
	description: string
	typesOfDeath: string[]
	incidentSeverity: string
}

export interface TypesOfDeathErrors {
	officerName?: string
	badgeNumber?: string
	date?: string
	time?: string
	location?: string
	description?: string
	typesOfDeath?: string
	incidentSeverity?: string
}

export const defaultTypesOfDeathData: TypesOfDeathData = {
	id: '',
	officerName: '',
	badgeNumber: '',
	date: '',
	time: '',
	location: '',
	description: '',
	typesOfDeath: [],
	incidentSeverity: ''
}

export const newTypesOfDeathData = (): TypesOfDeathData => ({
	id: uuidv4(),
	officerName: '',
	badgeNumber: '',
	date: '',
	time: '',
	location: '',
	description: '',
	typesOfDeath: [],
	incidentSeverity: ''
})

export const signUpFormKey = 'SignUpForm'

export interface SignUpForm {
	id: string
	name: string
	email: string
	password: string
	acceptTerms: boolean
	gender: string
	country: string
	bio: string
}

export interface SignUpFormErrors {
	name?: string
	email?: string
	password?: string
	acceptTerms?: string
	gender?: string
	country?: string
	bio?: string
}

export const defaultSignUpForm: SignUpForm = {
	id: '',
	name: '',
	email: '',
	password: '',
	acceptTerms: false,
	gender: '',
	country: '',
	bio: ''
}

interface BlogPost {
	slug: string
	author: string
	title: string
	content: string
	publishedDate: string
}
