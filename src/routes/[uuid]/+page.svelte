<script>
  import { Comment, CommentForm, NewsItem } from '$lib'

  let {data} = $props()
  const link = data.link
  const user = data.user
  const replyto = link.comments.find(comment => comment.id == data.replyto)
  const comments = render(link.comments)

  function render(comments, parent=null){
    return comments
      .filter(comment => (comment.parent == parent || comment.parent?.id === parent))
      .map(comment => {return {...comment, comments:render(comments, comment.id)}})
  }
</script>

<NewsItem {link} {user}/>

{#if user}
  <CommentForm {link} {replyto} />
{:else}
  <p>You have to <a href="/login">login</a> to leave a comment.</p>
{/if}

<section>
  {#each comments as comment}
  <Comment {comment} />
  {/each}
</section>
