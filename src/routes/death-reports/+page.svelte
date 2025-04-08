<script lang="ts">
	import {
		defaultTypesOfDeathData,
		newTypesOfDeathData,
		type TypesOfDeathData
	} from '$lib/models.js'
	import Modal from '$lib/components/Modal.svelte'

	const { data } = $props()
	const deathReports: TypesOfDeathData[] = data.deathReports
	console.log('data', data)

	let addingDeathReport = $state<TypesOfDeathData | null>(null)

	// let newDeathReport = $state<TypesOfDeathData>({
	// 	...defaultTypesOfDeathData,
	// 	id: '2'
	// })

	let editingDeathReport = $state<TypesOfDeathData | null>(null)
</script>

<!-- Display Incidents -->
<ul>
	{#each deathReports as report}
		<li>
			<h2>{report.officerName} ({report.badgeNumber})</h2>
			<p>Date: {report.date} Time: {report.time}</p>
			<p>Location: {report.location}</p>
			<p>Description: {report.description}</p>
			<p>Types of Death: {report.typesOfDeath.join(', ')}</p>
			<p>Severity: {report.incidentSeverity}</p>

			<!-- Delete Button -->
			<form method="post" action="?/delete">
				<input type="hidden" name="id" value={report.id} />
				<button type="submit">Delete</button>
			</form>

			<!-- Edit Button -->
			<button onclick={() => (editingDeathReport = report)}>Edit</button>
		</li>
	{/each}
</ul>

<button onclick={() => (addingDeathReport = newTypesOfDeathData())}
	>Add new</button
>

<!-- Create New Incident Form -->
{#if addingDeathReport}
	<Modal closeModal={() => (addingDeathReport = null)}>
		<!-- <div class="backdrop"></div> -->
		<h2>Create New Incident</h2>
		<form method="post" action="?/create">
			<!-- Input fields for newDeathReport -->
			<label>
				Officer Name:
				<input
					name="officerName"
					bind:value={addingDeathReport.officerName}
					required
				/>
			</label>
			<label>
				Badge Number:
				<input
					name="badgeNumber"
					bind:value={addingDeathReport.badgeNumber}
					required
				/>
			</label>
			<!-- Repeat for other fields -->
			<button type="submit">Create Incident</button>
			<button type="button" onclick={() => (addingDeathReport = null)}
				>Cancel</button
			>
		</form>
	</Modal>
{/if}

<!-- Edit Incident Form -->
{#if editingDeathReport}
	<Modal closeModal={() => (editingDeathReport = null)}>
		<h2>Edit Incident</h2>
		<form method="post" action="?/update">
			<input type="hidden" name="id" value={editingDeathReport.id} />
			<label>
				Officer Name:
				<input
					name="officerName"
					bind:value={editingDeathReport.officerName}
					required
				/>
			</label>
			<label>
				Badge Number:
				<input
					name="badgeNumber"
					bind:value={editingDeathReport.badgeNumber}
					required
				/>
			</label>
			<!-- Repeat for other fields -->
			<button type="submit">Update Incident</button>
			<button type="button" onclick={() => (editingDeathReport = null)}
				>Cancel</button
			>
		</form>
	</Modal>
{/if}
