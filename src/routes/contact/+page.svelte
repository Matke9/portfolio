<script lang="ts">
	import emailjs from 'emailjs-com';

	let name = '';
	let email = '';
	let subject = '';
	let message = '';
	let loading = false;
	let successMessage = '';
	let errorMessage = '';

	async function sendEmail(event: SubmitEvent) {
		event.preventDefault();
		loading = true;
		successMessage = '';
		errorMessage = '';

		const serviceID = 'portfolio';
		const templateID = 'template_puuk1cd';
		const userID = 'M1DU54rMXax9sb5AO';

		try {
			await emailjs.send(serviceID, templateID, { name, email, subject, message }, userID);
			successMessage = 'Message sent successfully!';
			name = email = subject = message = '';
		} catch (error) {
			console.error('Error sending email:', error);
			errorMessage = 'Failed to send message. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<div
	class="w-full max-w-lg rounded-2xl border border-[--accent-dark] bg-[--dark-green] p-8 shadow-lg"
>
	<h1 class="mb-6 text-center text-4xl font-semibold text-white">Contact me</h1>

	<form on:submit={sendEmail} class="white-text-glow space-y-4">
		<div>
			<label for="name" class="mb-1 block text-sm font-semibold text-white">Your Name</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				class="w-full rounded-md border border-[--accent-dark] bg-[--dark-grey] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[--accent-dark]"
				required
			/>
		</div>

		<div>
			<label for="email" class="mb-1 block text-sm font-semibold text-white">Your E-mail</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				class="w-full rounded-md border border-[--accent-dark] bg-[--dark-grey] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[--accent-dark]"
				required
			/>
		</div>

		<div>
			<label for="subject" class="mb-1 block text-sm font-semibold text-white">Subject</label>
			<input
				id="subject"
				type="text"
				bind:value={subject}
				class="w-full rounded-md border border-[--accent-dark] bg-[--dark-grey] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[--accent-dark]"
				required
			/>
		</div>

		<div>
			<label for="message" class="mb-1 block text-sm font-semibold text-white">Message</label>
			<textarea
				id="message"
				bind:value={message}
				class="h-28 w-full rounded-md border border-[--accent-dark] bg-[--dark-grey] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[--accent-dark]"
				required
			></textarea>
		</div>

		<button
			type="submit"
			class="flex w-full items-center justify-center rounded-md bg-[--accent-light] py-2 font-bold text-black transition hover:bg-[--accent-dark]"
			disabled={loading}
		>
			{#if loading}
				<span>Sending...</span>
			{:else}
				<span>Submit</span>
			{/if}
		</button>

		{#if successMessage}
			<p class="mt-2 text-green-400">{successMessage}</p>
		{/if}

		{#if errorMessage}
			<p class="mt-2 text-red-400">{errorMessage}</p>
		{/if}
	</form>
</div>

<style>
	.border .mb-6 {
		text-shadow: var(--accent-light) 0px 0px 19px;
	}
</style>
