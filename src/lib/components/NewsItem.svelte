<script>
  import { extractName } from '$lib/utils/extractName'
  import { UpvoteButton, NewsLink } from '$lib'
  let { link, user } = $props()
</script>

<div>
  <div>
    <NewsLink {link}/>
    <span><UpvoteButton {link} {user}/></span>
  </div>
  <div>
    <span>Post by {extractName(link.email)}</span>
    <span>{link.votes.length} hearts</span>
    <span><a href="/{link.id}" data-sveltekit-reload>{link.comments.length} comments</a></span>
  </div>
</div>

<style>
 div > div:last-of-type {
    padding-left: .8em;
  }
div > div:last-of-type span {
    display:block;
  }
</style>