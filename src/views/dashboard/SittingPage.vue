<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-lg text-center">
    <h2 class="text-3xl/tight font-bold text-gray-900 sm:text-4xl font-display">Features for growth</h2>

    <p class="mt-4 text-lg text-pretty text-gray-700">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis tenetur, nemo quam
      voluptas sunt impedit dolorem asperiores aliquid doloribus fugit.
    </p>
  </div>

  <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
    <div class="rounded-lg border border-gray-200 p-6">
      <div class="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"></path>
        </svg>
      </div>

      <h3 class="mt-4 text-lg font-semibold text-gray-900">High performance</h3>

      <p class="mt-2 text-pretty text-gray-700">
        Lightning-quick load times optimized for every device
      </p>
    </div>

    <div class="rounded-lg border border-gray-200 p-6">
      <div class="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"></path>
        </svg>
      </div>

      <h3 class="mt-4 text-lg font-semibold text-gray-900">Enterprise security</h3>

      <p class="mt-2 text-pretty text-gray-700">
        Enterprise-grade security built into every layer
      </p>
    </div>

    <div class="rounded-lg border border-gray-200 p-6">
      <div class="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"></path>
        </svg>
      </div>

      <h3 class="mt-4 text-lg font-semibold text-gray-900">Highly configurable</h3>

      <p class="mt-2 text-pretty text-gray-700">
        Adapt every aspect to match your brand and needs
      </p>
    </div>
  </div>
</div>
<div class="mt-5">
  <div class="max-w-md mx-auto p-8">
    <h2 class="text-2xl font-bold mb-6">Register</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Username -->
      <div>
        <label class="block text-sm font-medium mb-1">Username</label>
        <input
          :value="form.username"
          @input="handleChange('username', $event.target.value)"
          @blur="handleBlur('username')"
          type="text"
          class="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': touched.username && errors.username }"
        />
        <p v-if="touched.username && errors.username" class="text-red-500 text-sm mt-1">
          {{ errors.username }}
        </p>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input
          :value="form.email"
          @input="handleChange('email', $event.target.value)"
          @blur="handleBlur('email')"
          type="email"
          class="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': touched.email && errors.email }"
        />
        <p v-if="touched.email && errors.email" class="text-red-500 text-sm mt-1">
          {{ errors.email }}
        </p>
      </div>

      <!-- Password -->
      <div>
        <label class="block text-sm font-medium mb-1">Password</label>
        <input
          :value="form.password"
          @input="handleChange('password', $event.target.value)"
          @blur="handleBlur('password')"
          type="password"
          class="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': touched.password && errors.password }"
        />
        <p v-if="touched.password && errors.password" class="text-red-500 text-sm mt-1">
          {{ errors.password }}
        </p>
      </div>

      <button
        type="submit"
        :disabled="!isValid"
        class="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        Register
      </button>
    </form>
  </div>
</div>
</template>
<script setup>
 import { useForm } from '@/composables/useForm';
 import { required, email, minLength } from '@/composables/validator';
 const initialValues = {
  username: '',
  email: '',
  password: ''
 }

 const validationRules = {
  username: [
    required('Username is require'),
    minLength(3, 'Username must be at least 3 characters')
  ],
  email: [
    required('Email is required'),
    email('Please enter a valid email')
  ],
  password: [
    required('Password is required'),
    minLength(6, 'Password must be at leaset 6 characters')
  ]
 };

 const { form, errors, touched, handleBlur, handleChange, validateAll, reset, isValid } = useForm( initialValues, validationRules);
 const handleSubmit = () => {
  debugger;
  if(validateAll()) {
    alert('Registration successful!');
    reset();
  }
 }
</script>
