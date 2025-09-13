<script>
  import { NewsItem } from '$lib'
  
  let { data } = $props()
  const user = data.user
</script>

<ol>
{#each data.link as link}
  <li>
    <NewsItem {link} {user} />
  </li>
{/each}
</ol>

<style>
  ol {
    margin: 0;
    padding: 0;
  }
  ol li {
    margin-bottom: .5em;
  }
</style>