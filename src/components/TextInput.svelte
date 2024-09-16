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

<style>
  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    gap: 0.5rem;
  }
  input[type="text"] {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  input:focus {
    border-color: #0070f3;
    outline: none;
  }
</style>