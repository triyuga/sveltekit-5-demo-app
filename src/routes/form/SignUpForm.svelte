<script lang="ts">
	import TextInput from '../../components/TextInput.svelte';
	import Checkbox from '../../components/Checkbox.svelte';
	import Select from '../../components/Select.svelte';
	import TextArea from '../../components/TextArea.svelte';
	import Radios from '../../components/Radios.svelte';
	import {
		defaultSignUpForm,
		signUpFormKey,
		type SignUpForm,
		type SignUpFormErrors
	} from '../../domain/models';
	import { useStorage } from '../../hooks/useStorage';

	const storage = useStorage<SignUpForm>(signUpFormKey, defaultSignUpForm);
	let formState = $state<SignUpForm>({ ...defaultSignUpForm });
	let formErrors = $derived<SignUpFormErrors>(validateForm());

	function validateStringRequired(value: string): string {
		return value ? '' : 'required';
	}
	function validateBooleanRequired(value: boolean): string {
		return value ? '' : 'required';
	}

	function validateForm(): SignUpFormErrors {
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
	// $effect onMount (rune)
	$effect(() => {
		formState = { ...defaultSignUpForm, ...storage.get() };
	});

	// $effect - when value changes, persist to storage
	$effect(() => storage.set(formState));

	// $effect(() => storage.set(formState));

	function handleReset() {
		formState = defaultSignUpForm;
	}
</script>

<h1>Sign Up Form</h1>

<form>
	<TextInput label="Name" bind:value={formState.name} error={formErrors.name} />

	<TextInput label="Email" bind:value={formState.email} error={formErrors.email} />

	<TextInput label="Password" bind:value={formState.password} error={formErrors.password} />

	<Radios
		label={'Gender'}
		options={[
			{ value: 'male', text: 'Male' },
			{ value: 'female', text: 'Female' },
			{ value: 'other', text: 'Other' }
		]}
		bind:value={formState.gender}
		error={formErrors.gender}
	/>

	<Select
		label="Country"
		options={[
			{ value: '', text: 'Select Country' },
			{ value: 'us', text: 'United States' },
			{ value: 'ca', text: 'Canada' },
			{ value: 'uk', text: 'United Kingdom' },
			{ value: 'au', text: 'Australia' }
		]}
		bind:value={formState.country}
		error={formErrors.country}
	/>

	<TextArea label="Bio" bind:value={formState.bio} error={formErrors.bio} />

	<Checkbox
		label="Accept Terms and Conditions"
		bind:checked={formState.acceptTerms}
		error={formErrors.acceptTerms}
	/>

	<div class="buttons-row">
		<button type="button" onclick={handleReset}>Reset</button>

		<button type="submit">Submit</button>
	</div>
</form>

<!-- Display formState & formErrors -->
<h2>formState</h2>
<pre>{JSON.stringify(formState, null, 2)}</pre>
<h2>formErrors</h2>
<pre>{JSON.stringify(formErrors, null, 2)}</pre>
