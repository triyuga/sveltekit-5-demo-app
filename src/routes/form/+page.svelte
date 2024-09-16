<script lang="ts">
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import TextInput from '../../components/TextInput.svelte';
    import Checkbox from '../../components/Checkbox.svelte';
    import RadioButton from '../../components/RadioButton.svelte';
    import Select from '../../components/Select.svelte';
    import TextArea from '../../components/TextArea.svelte';
    
    interface FormData {
      name: string;
      email: string;
      password: string;
      acceptTerms: boolean;
      gender: string;
      country: string;
      bio: string;
    }
  
    const defaultFormData: FormData = {
      name: '',
      email: '',
      password: '',
      acceptTerms: false,
      gender: '',
      country: '',
      bio: ''
    };
  
    const formData = writable<FormData>({ ...defaultFormData });

    // Load form data from local storage on mount
    onMount(() => {
      const storedData = browser ? localStorage.getItem('formData') : null;
      if (storedData) {
        console.log('Hydrating form data to local storage:', storedData);
        formData.set(JSON.parse(storedData));
      }
    });
  
    // Save form data to local storage on change
    formData.subscribe((data) => {
            
      if (browser) {
        console.log('Saving form data to local storage:', data);
        const dataString = JSON.stringify(data);
        const defaultDataString = JSON.stringify(defaultFormData);
        const previousDataString = browser ? localStorage.getItem('formData') : '';
        if (![defaultDataString, previousDataString].includes(dataString)) {
          localStorage.setItem('formData', JSON.stringify(data));
        }
      }
    });
    
    function handleReset(event: any) {
      console.log('handleReset', event);
      formData.set({ ...defaultFormData });
      localStorage.removeItem('formData');
    }

    function handleChange(event: any) {
      console.log('handleChange', event);
      const { name, value, checked } = event.detail;
      formData.update((data) => ({
        ...data,
        [name]: value !== undefined ? value : checked
      }));
    }
  </script>
  
  <h1>Example Form</h1>
  
  <form on:submit|preventDefault>
    {#if $formData}
      <!-- Name -->
      <TextInput
        label="Name"
        name="name"
        value={$formData.name}
        on:change={handleChange}
      />

      <!-- Email -->
      <TextInput
        label="Email"
        name="email"
        value={$formData.email}
        on:change={handleChange}
      />

      <!-- Password -->
      <TextInput
        label="Password"
        name="password"
        value={$formData.password}
        on:change={handleChange}
      />

      <!-- Gender -->
      <fieldset>
        <legend>Gender</legend>
        <RadioButton
          label="Male"
          name="gender"
          value="male"
          groupValue={$formData.gender}
          on:change={handleChange}
        />
        <RadioButton
          label="Female"
          name="gender"
          value="female"
          groupValue={$formData.gender}
          on:change={handleChange}
        />
        <RadioButton
          label="Other"
          name="gender"
          value="other"
          groupValue={$formData.gender}
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
        selectedValue={$formData.country}
        on:change={handleChange}
      />

      <!-- Bio -->
      <TextArea
        label="Bio"
        name="bio"
        value={$formData.bio}
        on:change={handleChange}
      />

      <!-- Accept Terms -->
      <Checkbox
        label="Accept Terms and Conditions"
        name="acceptTerms"
        checked={$formData.acceptTerms}
        on:change={handleChange}
      />


      <div class="buttons">
        <!-- Reset Button -->
        <button type="button" on:click={handleReset}>Reset</button>
        <!-- Submit Button -->
        <button type="submit">Submit</button>
      </div>
    {/if}
  </form>
  
  <!-- Display Form Data -->
  <pre>{JSON.stringify($formData, null, 2)}</pre>
  

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