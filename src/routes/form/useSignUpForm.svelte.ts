import { browser } from '$app/environment';

interface SignupForm {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  gender: string;
  country: string;
  bio: string;
}

const defaultFormData: SignupForm = {
  name: '',
  email: '',
  password: '',
  acceptTerms: false,
  gender: '',
  country: '',
  bio: ''
};

export const useSignUpForm = () => {
    let value = $state<SignupForm>({ ...defaultFormData });
    
    // $derived state (rune)
    const formDataString = $derived<string>(JSON.stringify(value))

    // onMount $effect (rune)
    $effect(() => {
        // Load form data from local storage on mount
        const storedData = browser ? localStorage.getItem('formData') : null;
        if (storedData) {
          value = JSON.parse(storedData);
        }
    });

    // $effect - when formDataString changes, persist form data to local storage
    $effect(() => {
        if (browser) {
          const defaultFormDataString = JSON.stringify(defaultFormData);
          const previousFormDataString = browser ? localStorage.getItem('formData') : '';
          if (![defaultFormDataString, previousFormDataString].includes(formDataString)) {
            localStorage.setItem('formData', formDataString);
          }
        }
    });

    function resetFormData () {
        value = { ...defaultFormData };
    }

    function setFormData (newFormData: Partial<SignupForm>) {
      value = {...value, ...newFormData};
    }

    return {
        get value() { return value },
        set: setFormData,
        reset: resetFormData
    };
}
