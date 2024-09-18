<script lang="ts">
    import TextInput from '../../components/TextInput.svelte';
    import Checkbox from '../../components/Checkbox.svelte';
    import RadioButton from '../../components/RadioButton.svelte';
    import Select from '../../components/Select.svelte';
    import TextArea from '../../components/TextArea.svelte';
	  import { useSignUpForm } from './useSignUpForm.svelte';
    const form = useSignUpForm()

    function handleChange(event: any) {
      const { name, value, checked } = event.detail;
      form.set({
        [name]: value !== undefined ? value : checked
      });
    }
  </script>
  
  <h1>Example Form</h1>
  
  <form on:submit|preventDefault>
    {#if form}
      <!-- Name -->
      <TextInput
        label="Name"
        name="name"
        value={form.value.name}
        on:change={handleChange}
      />

      <!-- Email -->
      <TextInput
        label="Email"
        name="email"
        value={form.value.email}
        on:change={handleChange}
      />

      <!-- Password -->
      <TextInput
        label="Password"
        name="password"
        value={form.value.password}
        on:change={handleChange}
      />

      <!-- Gender -->
      <fieldset>
        <legend>Gender</legend>
        <RadioButton
          label="Male"
          name="gender"
          value="male"
          groupValue={form.value.gender}
          on:change={handleChange}
        />
        <RadioButton
          label="Female"
          name="gender"
          value="female"
          groupValue={form.value.gender}
          on:change={handleChange}
        />
        <RadioButton
          label="Other"
          name="gender"
          value="other"
          groupValue={form.value.gender}
          on:change={handleChange}
        />
      </fieldset>

      <!-- Country -->
      <Select
        label="Country"
        name="country"
        options={[
          { value: '', text: 'Select Country' },
          { value: 'us', text: 'United States' },
          { value: 'ca', text: 'Canada' },
          { value: 'uk', text: 'United Kingdom' },
          { value: 'au', text: 'Australia' }
        ]}
        selectedValue={form.value.country}
        on:change={handleChange}
      />

      <!-- Bio -->
      <TextArea
        label="Bio"
        name="bio"
        value={form.value.bio}
        on:change={handleChange}
      />

      <!-- Accept Terms -->
      <Checkbox
        label="Accept Terms and Conditions"
        name="acceptTerms"
        checked={form.value.acceptTerms}
        on:change={handleChange}
      />


      <div class="buttons">
        <!-- Reset Button -->
        checked={form.value.acceptTerms}
        <button type="button" on:click={form.reset}>Reset</button>
        <!-- Submit Button -->
        <button type="submit">Submit</button>
      </div>
    {/if}
  </form>
  
  <!-- Display Form Data -->
  <pre>{JSON.stringify(form.value, null, 2)}</pre>
  

  <style>
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 500px;
      margin: 0 auto;
    }
  
    fieldset {
      border: none;
      padding: 0;
      margin: 0;
    }

    legend {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
  
    button[type="submit"] {
      align-self: flex-start;
      padding: 0.5rem 1rem;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      justify-content: space-between;
    }
  </style>