<script lang="ts">
	import FieldHeader from './FieldHeader.svelte';

	interface SelectFieldProps {
		label: string;
		options: { value: string; text: string }[];
		value: string;
		error?: string;
	}

	let { label, options, value = $bindable(''), error }: SelectFieldProps = $props();
</script>

<label>
	<FieldHeader {label} {error} />
	<select bind:value>
		{#each options as option}
			<option value={option.value}>{option.text}</option>
		{/each}
	</select>
</label>
