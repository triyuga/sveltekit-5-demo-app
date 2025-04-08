<script lang="ts">
	import type { TypesOfDeathData } from '$lib/models'

	// Sample data for reports
	interface DeathReportListProps {
		reports: TypesOfDeathData[]
	}

	const { reports }: DeathReportListProps = $props()
</script>

<ul class="report-list">
	{#each reports as report}
		<li class="report-item">
			<strong>{report.id}</strong> - {report.id}
		</li>
	{/each}
</ul>

<style>
	.report-list {
		list-style-type: none;
		padding: 0;
	}
	.report-item {
		padding: 10px;
		border-bottom: 1px solid #ccc;
	}
</style>
