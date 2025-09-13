<script>
  let { link, user } = $props()
  const voted = link.votes.find(vote => vote.email === user) !== undefined
</script>

<form action="/auth/vote" method="post">
  <input type="hidden" name="id" value="{link.id}">
  <button type="submit" class:voted={voted}><span>Upvote</span></button>  
</form>

<style>
  form {
    display: inline;
  }

  button {
    border: 0;
    height: .8em; /* adjust to control the size */
    aspect-ratio: 1;
    --_m: radial-gradient(#000 69%,#0000 70%) 84.5%/50%;
    -webkit-mask-box-image: var(--_m);
              mask-border: var(--_m);
    clip-path: polygon(-41% 0,50% 91%, 141% 0);
    background: grey;
  }
  button.voted {
    background: hotpink;
  }
  @supports not (-webkit-mask-box-image: var(--_m)) { 
    button {
      mask:
      radial-gradient(at 70% 31%,#000 29%,#0000 30%),
      radial-gradient(at 30% 31%,#000 29%,#0000 30%),
      conic-gradient(#000 0 0) bottom/100% 50% no-repeat;
    }
  }
  
  button span {
    display: none;
  }
</style>