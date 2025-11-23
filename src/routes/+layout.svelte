<script>
	import '$lib/assets/style.css'
	import { Logo } from '$lib'
	import { extractName } from '$lib/utils/extractName'
	import {enhance} from '$app/forms'
	import favicon from '$lib/assets/favicon.png'
	let { children, data } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<a href="/"><Logo /></a>

	<nav>
		<ul>
			<!--
			<li><a href="/?sort=latest">latest</a></li>
			<li><a href="/?sort=best">best</a></li>
			<li><a href="/?sort=comments">comments</a></li>
			-->
			<li><a href="/auth/submit">submit</a></li>
		{#if data.user}
			<li>
			<form action="?/logout" method="post" use:enhance>
				<button type="submit" id="submit">Logout {extractName(data.user)}</button>
			</form>
		</li>
		{:else}
			<li><a href="/login">login</a></li>
		{/if}
		</ul>
	</nav>
</header>

<main>
	{@render children?.()}
</main>

<details class="todo">
	<summary>Todo</summary>
	<ul>
		<li>[x] overzicht van links</li>
		<li>[x] koppelen van comments</li>
		<li>[x] magic-link login met een toegestaan emailadres (op domein)</li>
		<li>[x] upvoting algoritme</li>
		<li>[x] formulier voor toevoegen van link/opschrift</li>
		<li>[x] formulier voor het toevoegen van comments</li>
		<li>[x] correcte recursieve weergave van comments</li>
		<li>[ ] sorteren en opslaan van sortering in localstorage</li>
		<li>[ ] API / RSS voor nieuwsberichten</li>
		<li>[ ] Iets doen aan de layout T.T</li>
		<li>[ ] (optioneel) leaderboard van top 10 post/comment/vote</li>
		<li>[ ] (optioneel) moderatie van aangedragen links</li>
	</ul>
</details>

<footer>
	<p><span>&copy;</span> Copyleft 2025, all wrongs reversed.</p>
</footer>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 1.5rem 0 1rem var(--padding);
		margin: var(--radius);
	}
	header > a {
		width: 5em;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
	}
	nav ul {
		display: flex;
		list-style: none;
		gap: 1em;
	}
	nav a {
		display: block;
		transition: opacity 0.2s ease-out, transform 0.4s ease-out;
		transition-delay: calc(var(--total) - var(--i) * 0.1s);
		text-decoration: none;
		letter-spacing: -0.03em;
		border: 0.08em solid black;
		padding: 0.1em 0.6em;
		border-radius: 0.2em;
	}
	nav a:hover {
		/* text-decoration: underline; */
		color: var(--base-color);;
		background-color: var(--color);
	}
	nav button {
		width: 100%;
	}
	
	main {
		display: flex;
		flex-flow: column nowrap;
		gap: var(--radius);
		position: relative;
		margin: 0 calc(var(--radius));
		padding: var(--padding);
		background: var(--background);
		border-radius: var(--radius);
	}

	.todo {
		margin: calc(var(--radius) + var(--padding));
		padding: var(--padding-side) 0;
		summary {
			font-weight: 600;
			&:after {
				content: ':';
			}
		}
		ul {
			padding: 0;
			list-style: none;
		}
	}

	footer p {
		/* position: fixed; */
		bottom: 1rem;
		left: 1rem;
		margin: 0;
	}

	footer p span {
		display: inline-block;
		transform-origin: center;
		transform: rotate(180deg);
		margin-right: 0.1rem;
	}
</style>
