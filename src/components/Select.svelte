<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let label: string = '';
    export let options: { value: string; text: string }[] = [];
    export let selectedValue: string = '';
    export let name: string = '';
    const dispatch = createEventDispatcher();
  
    function handleChange(event: Event) {
      dispatch('change', { name, value: (event.target as HTMLSelectElement).value });
    }
  </script>
  
  <label>
    {label}
    <select bind:value={selectedValue} on:change={handleChange}>
      {#each options as option}
        <option value={option.value}>{option.text}</option>
      {/each}
    </select>
  </label>