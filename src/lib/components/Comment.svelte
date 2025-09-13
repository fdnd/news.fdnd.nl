<script>
  import { timeAgo } from "../utils/timeago.js";
  import { Comment } from "$lib";
  const { comment } = $props()
</script>

<article>
  <div>
    <address><span rel="author">{comment.email.substring(0, comment.email.lastIndexOf("@"))}</span></address>
    <time pubdate datetime="{comment.date_created}">{timeAgo(comment.date_created)}</time>
  </div>

  {comment.comment}
  
  <a href="?replyto={comment.id}" data-sveltekit-reload>reply</a>
  {#if comment.comments}
    {#each comment.comments as comment}
    <Comment {comment} />
    {/each}
  {/if}
</article>

<style>
  article {
    margin-top: var(--padding);
    padding-left: var(--padding);
    border-left: 1px solid currentColor;
  }
  div {
    gap: .5rem;
    margin-bottom: .1em;
  }
  address, time {
    display: inline;
    color: grey;
    font-size: .7em;
  }
  a {
    display: block;
    margin-top: .1em;
    font-size: .7em;
  }
</style>