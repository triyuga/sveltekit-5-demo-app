<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let label: string = '';
    export let value: string = '';
    export let name: string = '';
    const dispatch = createEventDispatcher();
  
    function handleInput(event: Event) {
      dispatch('change', { name, value: (event.target as HTMLTextAreaElement).value });
    }
  </script>
  
  <label>
    {label}
    <textarea bind:value on:input={handleInput}></textarea>
  </label>