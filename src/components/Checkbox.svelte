<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let label: string = '';
  export let checked: boolean = false;
  export let name: string = '';
  const dispatch = createEventDispatcher();

  function handleChange(event: Event) {
    dispatch('change', { name, checked: (event.target as HTMLInputElement).checked });
  }
</script>

<label>
  <input type="checkbox" bind:checked on:change={handleChange} />
  <span>{label}</span>
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