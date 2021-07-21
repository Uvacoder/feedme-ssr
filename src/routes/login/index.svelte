<script>
  import { onMount } from 'svelte';
  import { session } from '$app/stores';
  import { goto } from '$app/navigation';
  import { authed } from '$lib/stores/user.store.js';
  import supabase from '$lib/db.js';
  import Logo from '$lib/components/Logo.svelte';

  let email = '';
  let password = '';
  let errorMessage;
  let successMessage;

  async function handleSignup() {
    clearMessages();
    const { user, session: supaBaseSession, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if(error) {
      errorMessage = error.message;
    } else {
      successMessage = "Success! Your account was created!";
      $authed = true;
    }
    setTimeout(() => {
      goto('/');
    }, 500);
  }

  async function handleSignin() {
    clearMessages();
    const { user, session: supaBaseSession, error } = await supabase.auth.signIn({
      email: email,
      password: password
    });

    if(error) {
      errorMessage = error.message;
    } else {
      successMessage = "Success! You're logged in!";
      $authed = true;
    }
    setTimeout(() => {
      goto('/');
    }, 500);
  }

  function clearMessages() {
    errorMessage = '';
    successMessage = '';
  }

  function resetFormValues() {
    email = '';
    password = '';
  }
</script>

<section id="sign-in">
  <Logo scale={4} />
  <div class="form">
    <div class="input-group">
      <label for="sign-in-email" id="email-label">Email</label>
      <input type="email" id="sign-in-email" placeholder="Email" bind:value={email}>
    </div>
    <div class="input-group">
      <label for="sign-in-password" id="password-label">Password</label>
      <input type="password" id="sign-in-password" placeholder="Password" bind:value={password}>
    </div>
    <div class="button-row">
      <button on:click={handleSignup}>Create Account</button>
        <span>or</span>
      <button on:click={handleSignin}>Sign In</button>
    </div>
  </div>

  {#if errorMessage}
  <h3 class="error">{errorMessage}</h3>
  {/if}
  
  {#if successMessage}
  <h3 class="success">{successMessage}</h3>
  {/if}
</section>

<style>
  #sign-in {
    display: flex;
    flex-direction: column;
    gap: var(--space-600);
    align-items: center;
    min-height: 100%;
    margin-top: var(--space-700);
    color: var(--primary-light);
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-500);
  }
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .input-group label {
    font-size: var(--font-2);
  }
  .button-row {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  button, input[type="submit"] {
    font-size: var(--font-3);
  }

  .error, .success {
    font-size: var(--font-2);
  }

  .error {
    color: var(--accent-primary);
  }

  .success {
    color: var(--accent-secondary);
  }

</style>