<script>
  let {link} = $props()
  const urlRegExp = /^(?:http(?:s?):\/\/(?:www\.)?)?([A-Za-z0-9_:.-]+)\/?/
</script>

<a href="{link.url}">{link.title}</a>
<span>({link.url.match(urlRegExp)[1]})</span>

<style>
  a {
    text-decoration: none;
  }
  span {  
    font-size: .9em;
  }
</style>