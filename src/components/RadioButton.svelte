<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let label: string = '';
  export let value: string = '';
  export let name: string = '';
  export let groupValue: string = '';
  const dispatch = createEventDispatcher();

  function handleChange() {
    dispatch('change', { name, value });
  }
</script>

<label>
  <input
    type="radio"
    name={name}
    value={value}
    bind:group={groupValue}
    on:change={handleChange}
  />
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