<script>
  import { timeAgo } from '../utils/timeAgo'
  import { extractName } from '../utils/extractName'
  import { CommentForm, NewsLink } from '$lib';
  // TODO: edit existing comment
  const { link, replyto } = $props()
</script>

{#if replyto}
  <article>Replying to {extractName(replyto.email)} who wrote: {replyto.comment} </article>
{/if}

<form method="post">
  <input type="hidden" name="link" value={link.id}>
  <input type="hidden" name="parent" value="{replyto?.id}">
  <textarea name="comment" id="comment" rows="8" cols="30"></textarea>
  <label for="comment">Please stay civil and follow the <a href="/guidelines">guidelines</a>.</label>
  <button type="submit" id="submit">Add comment</button>
</form>

<style>
  article {
    font-size: .8em;
    color: grey;
  }
  form {
    display: flex;
    flex-flow: column nowrap;
    gap: .2em;
    width: min(100%, 30em)
  }
  button {
    width: fit-content;
  }
  label {
    display: block;
    font-size: .8em;
  }
</style>