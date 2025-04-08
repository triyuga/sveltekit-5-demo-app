<script lang="ts">
	import FieldHeader from './FieldHeader.svelte';

	interface TimeInputProps {
		label: string;
		value: string;
		error?: string;
	}

	let { label = '', value = $bindable(''), error }: TimeInputProps = $props();
</script>

<label>
	<FieldHeader {label} {error} />
	<input type="time" bind:value />
</label>
