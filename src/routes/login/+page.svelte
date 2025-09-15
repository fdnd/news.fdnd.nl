<script>
  import {enhance} from '$app/forms'

  const {form} = $props()

  function submitHandler(event){
    console.log(`Form sent using ${event.target.email.value}`)
    event.preventDefault() // Remove later, for testing
  }
</script>

<h2>Login</h2>

<form method="post" use:enhance onsubmit={submitHandler}>
  <input type="email" name="email" id="email" placeholder="Enter your @hva.nl email" required>
  <button type="submit">Send Magic Link</button>
</form>

{#if form?.success}
  <p>Magic link sent! Check your email and click the link to authenticate.</p>
{:else if form?.invalid}
  <p>Invalid email, please try again. Note that only @hva.nl emails are allowed</p>
{:else if form?.error}
  <p>{form.error}</p>
{/if}

