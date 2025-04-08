<script lang="ts">
	import FieldHeader from './FieldHeader.svelte';

	interface CheckboxProps {
		label: string;
		checked: boolean;
		error?: string;
	}

	let { label, checked = $bindable(false), error }: CheckboxProps = $props();
</script>

<label>
	<input type="checkbox" bind:checked />
	<FieldHeader {label} {error} />
</label>

<style>
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
