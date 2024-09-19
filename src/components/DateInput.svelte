<script lang="ts">
	import FieldHeader from './FieldHeader.svelte';

	interface DateInputProps {
		label: string;
		value: string;
		error?: string;
	}

	let { label = '', value = $bindable(''), error }: DateInputProps = $props();
</script>

<label>
	<FieldHeader {label} {error} />
	<input type="date" bind:value />
</label>
