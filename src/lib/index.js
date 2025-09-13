// place files you want to import through the `$lib` alias in this folder.

// CSS files
export { default as style } from './assets/style.css'

// SVG images (as components)
export { default as hvalogo } from './assets/hvalogo.svelte'
export { default as hvapayoff } from './assets/hvapayoff.svelte'

// Utils?
export { default as extractName } from './utils/extractName.js'
export { default as timeAgo } from './utils/timeago.js'
// export { * } from './utils/auth.js'

// Components
export { default as Comment } from './components/Comment.svelte'
export { default as CommentForm } from './components/CommentForm.svelte'
export { default as NewsForm } from './components/NewsForm.svelte'
export { default as NewsItem } from './components/NewsItem.svelte'
export { default as NewsLink } from './components/NewsLink.svelte'
export { default as UpvoteButton } from './components/UpvoteButton.svelte'
