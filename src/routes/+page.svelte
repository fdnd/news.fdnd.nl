<script>
  import { NewsItem } from '$lib'
  
  let { data } = $props()
  const links = data.link
  const user = data.user
</script>

<ol>
{#each links as link}
  <li>
    <NewsItem {link} {user} />
  </li>
{/each}
</ol>

<style>
  ol {
    /* padding: 0; */
  }
  ol li {
    margin-bottom: .5em;
  }
</style>