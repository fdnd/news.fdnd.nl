<script>
  import { extractName } from '$lib/utils/extractName'
  import { UpvoteButton, NewsLink } from '$lib'
  let { link, user } = $props()
</script>

<div>
  <div>
    <UpvoteButton {link} {user}/>
    <NewsLink {link}/>
  </div>
  <div>
    <span>{link.votes.length} hearts by {extractName(link.email)}</span>
    <span><a href="/{link.id}" data-sveltekit-reload>{link.comments.length} comments</a></span>
  </div>
</div>

<style>
 div > div:last-of-type {
    padding-left: .8em;
  }
</style>