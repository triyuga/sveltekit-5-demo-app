<script lang="ts">
	import FieldHeader from './FieldHeader.svelte';

	interface TextInputProps {
		label: string;
		value: string;
		error?: string;
	}

	let { label = '', value = $bindable(''), error }: TextInputProps = $props();
</script>

<label>
	<FieldHeader {label} {error} />
	<input type="text" bind:value />
</label>
