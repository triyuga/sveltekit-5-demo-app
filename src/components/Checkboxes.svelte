<script lang="ts">
	import FieldHeader from './FieldHeader.svelte';

	interface RadiosProps {
		label: string;
		options: { value: string; text: string }[];
		value: string[];
		error?: string;
	}

	let { label, options, value = $bindable(), error }: RadiosProps = $props();
</script>

<fieldset>
	<legend><FieldHeader {label} {error} /></legend>
	{#each options as option}
		<label>
			<input type="checkbox" value={option.value} bind:group={value} />
			<span>{option.text}</span>
		</label>
	{/each}
</fieldset>

<style>
	legend {
		width: 100%;
	}
	label {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		font-weight: bold;
	}
	input:focus {
		border-color: #0070f3;
		outline: none;
	}
</style>
