<script lang="ts">
	interface FieldHeaderProps {
		label: string;
		error?: string;
	}
	let { label, error }: FieldHeaderProps = $props();
</script>

<span class="field-header">
	<span>{label}</span>
	{#if error}
		<span class="error-icon" aria-hidden="true" title={error}>⚠️</span>
	{/if}
</span>

<style>
	.field-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-grow: 1;
	}
	.error-icon {
		color: red;
	}
</style>
