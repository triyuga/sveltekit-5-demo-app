<script lang="ts">
	import TextInput from '../../components/TextInput.svelte';
	import Select from '../../components/Select.svelte';
	import {
		defaultTypesOfDeathForm,
		typesOfDeathFormKey,
		type TypesOfDeathForm,
		type TypesOfDeathFormErrors
	} from '../../domain/models.ts';
	import { useStorage } from '../../hooks/useStorage';
	import { delay } from '../../domain/helpers/delay.ts';
	import TextArea from '../../components/TextArea.svelte';
	import DateInput from '../../components/DateInput.svelte';
	import TimeInput from '../../components/TimeInput.svelte';
	import Checkboxes from '../../components/Checkboxes.svelte';
	import Radios from '../../components/Radios.svelte';

	const storage = useStorage(typesOfDeathFormKey, defaultTypesOfDeathForm);
	let isLoading = $state(true);

	// formState
	let formState = $state<TypesOfDeathForm>({ ...defaultTypesOfDeathForm });
	let formErrors = $state<TypesOfDeathFormErrors>({});

	function validateStringRequired(value: string): string {
		return value ? '' : 'required';
	}

	function validateArrayNotEmpty(value: string[]): string {
		return value.filter(Boolean).length > 0 ? '' : 'required';
	}

	function validateForm(formState: TypesOfDeathForm): TypesOfDeathFormErrors {
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

	// hydrate onMount
	$effect(() => {
		delay(1000).then(() => {
			formState = { ...defaultTypesOfDeathForm, ...storage.get() };
			isLoading = false;
		});
	});

	// when formState changes, persist to storage
	$effect(() => storage.set(formState));

	$effect(() => {
		formErrors = validateForm(formState);
	});

	function handleReset() {
		formState = defaultTypesOfDeathForm;
	}
</script>

{#if isLoading}
	<p>Loading...</p>
{:else}
	<form>
		<TextInput
			label="Officer Name"
			bind:value={formState.officerName}
			error={formErrors.officerName}
		/>

		<TextInput
			label="Badge Number"
			bind:value={formState.badgeNumber}
			error={formErrors.badgeNumber}
		/>

		<DateInput label="Date" bind:value={formState.date} error={formErrors.date} />

		<TimeInput label="Time" bind:value={formState.time} error={formErrors.time} />

		<TextInput label="Location" bind:value={formState.location} error={formErrors.location} />

		<TextArea
			label="Description"
			bind:value={formState.description}
			error={formErrors.description}
		/>

		<Radios
			label="Incident Severity"
			options={[
				{ value: 'low', text: 'Low' },
				{ value: 'medium', text: 'Medium' },
				{ value: 'high', text: 'High' },
				{ value: 'critical', text: 'Critical' }
			]}
			bind:value={formState.incidentSeverity}
			error={formErrors.incidentSeverity}
		/>

		<Checkboxes
			label="Type of Death"
			options={[
				{ value: 'natural', text: 'Natural' },
				{ value: 'accidental', text: 'Accidental' },
				{ value: 'homicide', text: 'Homicide' },
				{ value: 'suicide', text: 'Suicide' },
				{ value: 'undetermined', text: 'Undetermined' }
			]}
			bind:value={formState.typesOfDeath}
			error={formErrors.typesOfDeath}
		/>

		<div class="buttons-row">
			<button type="submit">Submit</button>
			<button type="button" onclick={handleReset}>Reset</button>
		</div>
	</form>
{/if}

<!-- Display Form Data -->
<h2>formState</h2>
<pre>{JSON.stringify(formState, null, 2)}</pre>
<h2>formErrors</h2>
<pre>{JSON.stringify(formErrors, null, 2)}</pre>

<!-- <CodeBlock code={code}></CodeBlock> -->
