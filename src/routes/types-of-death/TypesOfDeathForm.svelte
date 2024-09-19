<script lang="ts">
	import TextInput from '../../components/TextInput.svelte';
	import {
		defaultTypesOfDeathForm,
		typesOfDeathFormKey,
		type TypesOfDeathForm,
		type TypesOfDeathFormErrors
	} from '../../domain/models.ts';
	import { useStorage } from '../../hooks/useStorage';
	import { delay } from '../../lib/delay.ts';
	import TextArea from '../../components/TextArea.svelte';
	import DateInput from '../../components/DateInput.svelte';
	import TimeInput from '../../components/TimeInput.svelte';
	import Checkboxes from '../../components/Checkboxes.svelte';
	import Radios from '../../components/Radios.svelte';
	import { validateTypesOfDeathForm } from '../../domain/validation.ts';
	const storage = useStorage(typesOfDeathFormKey, defaultTypesOfDeathForm);

	let isLoading = $state(true);
	let formState = $state<TypesOfDeathForm>({ ...defaultTypesOfDeathForm });
	const formErrors = $derived<TypesOfDeathFormErrors>(validateTypesOfDeathForm(formState));

	// hydrate onMount
	$effect(() => {
		delay(1000).then(() => {
			formState = { ...defaultTypesOfDeathForm, ...storage.get() };
			isLoading = false;
		});
	});

	// when formState changes, persist to storage
	$effect(() => storage.set(formState));

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

<!-- Display formState & formErrors -->
<h2>formState</h2>
<pre>{JSON.stringify(formState, null, 2)}</pre>
<h2>formErrors</h2>
<pre>{JSON.stringify(formErrors, null, 2)}</pre>
