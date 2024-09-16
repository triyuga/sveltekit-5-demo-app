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
    {label}
  </label>