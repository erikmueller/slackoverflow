import hljs from 'highlight.js/lib/core'
import elixir from 'highlight.js/lib/languages/elixir'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('elixir', elixir)
hljs.registerLanguage('javascript', javascript)

hljs.initHighlightingOnLoad()
