<script lang="ts">
	interface DebugBlocksProps {
		blocks: {
			label: string;
			value: string;
		}[];
	}
	const { blocks }: DebugBlocksProps = $props();
</script>

<div class="debug-blocks">
	{#each blocks as block}
		<div class="debug-block">
			<strong>{block.label}:</strong>
			<pre>{block.value}</pre>
		</div>
	{/each}
</div>

<style>
	.debug-blocks {
		display: flex;
		flex-direction: row;
	}
	.debug-block {
		display: flex;
		flex-direction: column;
	}
</style>
