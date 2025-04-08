<script lang="ts">
	import FieldHeader from './FieldHeader.svelte';

	interface TextAreaProps {
		label: string;
		value: string;
		error?: string;
		required?: boolean;
	}
	let { label, value = $bindable(), error }: TextAreaProps = $props();
</script>

<label>
	<FieldHeader {label} {error} />
	<textarea bind:value></textarea>
</label>
