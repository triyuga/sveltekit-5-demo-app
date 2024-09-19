export interface User {
	name: string;
}

export const typesOfDeathFormKey = 'TypesOfDeathForm';

export interface TypesOfDeathForm {
	officerName: string;
	badgeNumber: string;
	date: string;
	time: string;
	location: string;
	description: string;
	typesOfDeath: string[];
	incidentSeverity: string;
}

export interface TypesOfDeathFormErrors {
	officerName?: string;
	badgeNumber?: string;
	date?: string;
	time?: string;
	location?: string;
	description?: string;
	typesOfDeath?: string;
	incidentSeverity?: string;
}

export const defaultTypesOfDeathForm: TypesOfDeathForm = {
	officerName: '',
	badgeNumber: '',
	date: '',
	time: '',
	location: '',
	description: '',
	typesOfDeath: [],
	incidentSeverity: ''
};

export const signUpFormKey = 'SignUpForm';

export interface SignUpForm {
	name: string;
	email: string;
	password: string;
	acceptTerms: boolean;
	gender: string;
	country: string;
	bio: string;
}

export interface SignUpFormErrors {
	name?: string;
	email?: string;
	password?: string;
	acceptTerms?: string;
	gender?: string;
	country?: string;
	bio?: string;
}

export const defaultSignUpForm: SignUpForm = {
	name: '',
	email: '',
	password: '',
	acceptTerms: false,
	gender: '',
	country: '',
	bio: ''
};
