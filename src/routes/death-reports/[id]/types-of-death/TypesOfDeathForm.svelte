<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte'
	import {
		defaultTypesOfDeathData,
		type TypesOfDeathData,
		type TypesOfDeathErrors
	} from '$lib/models.ts'
	import TextArea from '$lib/components/TextArea.svelte'
	import DateInput from '$lib/components/DateInput.svelte'
	import TimeInput from '$lib/components/TimeInput.svelte'
	import Checkboxes from '$lib/components/Checkboxes.svelte'
	import Radios from '$lib/components/Radios.svelte'
	import DebugBlocks from '$lib/components/DebugBlocks.svelte'
	import { createDeathReportService } from '$lib/services/deathReportService.ts'
	import { validateTypesOfDeathData } from '$lib/validation/validation'
	const deathReportService = createDeathReportService()

	const id = '123' // TODO: get from route params

	// state
	let isLoading = $state(true)
	let formState = $state<TypesOfDeathData>({ ...defaultTypesOfDeathData })
	const formErrors = $derived<TypesOfDeathErrors>(
		validateTypesOfDeathData(formState)
	)

	// hydrate onMount
	// $effect(() => {
	// 	console.log('onMount')
	// 	deathReportService.getDeathReport(id).then((data) => {
	// 		formState = data
	// 		isLoading = false
	// 	})
	// })

	// when formState changes, save it to storage
	$effect(() => {
		console.log('formState changed', formState)
		deathReportService.updateDeathReport(id, formState)
	})

	// handlers
	function handleReset() {
		formState = defaultTypesOfDeathData
	}
</script>

<section>
	<h1>Types of Death</h1>
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

			<DateInput
				label="Date"
				bind:value={formState.date}
				error={formErrors.date}
			/>

			<TimeInput
				label="Time"
				bind:value={formState.time}
				error={formErrors.time}
			/>

			<TextInput
				label="Location"
				bind:value={formState.location}
				error={formErrors.location}
			/>

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
	{/if}
</section>
