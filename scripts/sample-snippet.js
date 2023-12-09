/*
# Text Expansion Snippet

- Snippets run when you type the characters in the "// Snippet" metadata
- Think of snippets as a way to trigger scripts by simply typing anywhere
- To trigger this example, type "kit,," anywhere

> 👋 On Mac, to allow Kit.app to monitor your keystrokes, you'll need to click:
>
> `Script Kit menubar icon -> Watchers -> Start Snippet/Clipboard Watcher`
*/

// Name: Sample Snippet
// Description: Expand Text Globally
// Author: John Lindquist
// Twitter: @johnlindquist
// Snippet: kit,,

import "@johnlindquist/kit"

await hide()
await keyboard.type("https://scriptkit.com")
