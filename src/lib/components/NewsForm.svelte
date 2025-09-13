<script>
  let { title, url } = $props()
</script>

<form method="post">  
  <label for="title">Title</label>
  <input type="text" name="title" id="title" value={title}>

  <label for="url">URL</label>
  <input type="url" name="url" id="url" value={url}>
  
  <button type="submit" id="submit">Add link</button>
</form>