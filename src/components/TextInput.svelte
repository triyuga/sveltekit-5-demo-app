<script lang="ts">
  interface TextInputProps {
    label: string;
    value: string;
    name: string;
    onChange: (value: string) => void;
  }

  let {label = '', value = '', name = '', onChange}: TextInputProps = $props();

  function handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    onChange(value)
  }
</script>

<label>
  {label}
  <input name={name} type="text" bind:value oninput={handleInput} />
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