<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte'
	import Checkbox from '$lib/components/Checkbox.svelte'
	import Select from '$lib/components/Select.svelte'
	import TextArea from '$lib/components/TextArea.svelte'
	import Radios from '$lib/components/Radios.svelte'
	import {
		defaultSignUpForm,
		signUpFormKey,
		type SignUpForm,
		type SignUpFormErrors
	} from '$lib/models'
	import { useStorage } from '../../hooks/useStorage'
	import { validateSignUpForm } from '../../lib/validation/validation'
	import DebugBlocks from '$lib/components/DebugBlocks.svelte'
	import { createUserService } from '../../lib/services/userService'
	const userService = createUserService()

	// state
	let isLoading = $state(true)
	let formState = $state<SignUpForm>({ ...defaultSignUpForm })
	const formErrors = $derived<SignUpFormErrors>(validateSignUpForm(formState))

	// hydrate onMount
	$effect(() => {
		userService.getSignUpForm().then((data) => {
			formState = { ...formState, ...data }
			isLoading = false
		})
	})

	// when value changes, persist to storage
	$effect(() => {
		userService.updateSignUpForm(formState)
	})

	function handleReset() {
		formState = defaultSignUpForm
	}
</script>

<section>
	<h1>Sign Up</h1>
	<form>
		<TextInput
			label="Name"
			bind:value={formState.name}
			error={formErrors.name}
		/>

		<TextInput
			label="Email"
			bind:value={formState.email}
			error={formErrors.email}
		/>

		<TextInput
			label="Password"
			bind:value={formState.password}
			error={formErrors.password}
		/>

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

	<DebugBlocks
		blocks={[
			{ label: 'formState', value: JSON.stringify(formState, null, 2) },
			{ label: 'formErrors', value: JSON.stringify(formErrors, null, 2) }
		]}
	/>
</section>
