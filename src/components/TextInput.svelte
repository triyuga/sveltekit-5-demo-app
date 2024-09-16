<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let label: string = '';
    export let value: string = '';
    export let name: string = '';
    const dispatch = createEventDispatcher();
  
    function handleInput(event: Event) {
      dispatch('change', { name, value: (event.target as HTMLInputElement).value });
    }
  </script>
  
  <label>
    {label}
    <input type="text" bind:value on:input={handleInput} />
  </label>