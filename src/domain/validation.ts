import type {
	SignUpForm,
	SignUpFormErrors,
	TypesOfDeathForm,
	TypesOfDeathFormErrors
} from './models';

export function validateSignUpForm(formState: SignUpForm): SignUpFormErrors {
	const errors: SignUpFormErrors = {
		name: validateStringRequired(formState.name),
		email: validateStringRequired(formState.email),
		password: validateStringRequired(formState.password),
		acceptTerms: validateBooleanRequired(formState.acceptTerms),
		gender: validateStringRequired(formState.gender),
		country: validateStringRequired(formState.country),
		bio: validateStringRequired(formState.bio)
	};
	// filter errors, remove key+value where is empty string
	const filteredErrors = Object.fromEntries(
		Object.entries(errors).filter(([_, value]) => value !== '')
	);
	return filteredErrors;
}

export function validateTypesOfDeathForm(formState: TypesOfDeathForm): TypesOfDeathFormErrors {
	const errors: TypesOfDeathFormErrors = {
		officerName: validateStringRequired(formState.officerName),
		badgeNumber: validateStringRequired(formState.badgeNumber),
		date: validateStringRequired(formState.date),
		time: validateStringRequired(formState.time),
		location: validateStringRequired(formState.location),
		description: validateStringRequired(formState.description),
		typesOfDeath: validateArrayNotEmpty(formState.typesOfDeath),
		incidentSeverity: validateStringRequired(formState.incidentSeverity)
	};
	// filter errors, remove key+value where is empty string
	const filteredErrors = Object.fromEntries(
		Object.entries(errors).filter(([_, value]) => value !== '')
	);
	return filteredErrors;
}

function validateStringRequired(value: string): string {
	return value ? '' : 'required';
}

function validateBooleanRequired(value: boolean): string {
	return value ? '' : 'required';
}

function validateArrayNotEmpty(value: string[]): string {
	return value.filter(Boolean).length > 0 ? '' : 'required';
}
