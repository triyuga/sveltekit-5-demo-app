import { useStorage } from '../../hooks/useStorage';

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
    const storage = useStorage<SignupForm>('formData', defaultFormData);
    let value = $state<SignupForm>({ ...defaultFormData });
    
    // $effect onMount (rune)
    $effect(() => value = storage.get());

    // $effect - when value changes, persist to storage
    $effect(() => storage.set(value));

    return {
        get value() { return value },
        set(newFormData: Partial<SignupForm>) { value = {...value, ...newFormData} },
        reset() { value = { ...defaultFormData } }
    };
}
