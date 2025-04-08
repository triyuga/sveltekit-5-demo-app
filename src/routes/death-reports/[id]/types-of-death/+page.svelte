<script>
	let { data } = $props()
	console.log('data', data)
	import TypesOfDeathForm from './TypesOfDeathForm.svelte'
	console.log('src/routes/death-reports/[id]/types-of-death/+page.svelte')
</script>

<TypesOfDeathForm />
