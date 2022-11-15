/*
# Text Expansion Snippet

> On Mac, Snippets require "Accessibility Permissions"

- Snippets run when you type the characters in the "// Snippet" metadata
- Think of snippets as a way to trigger scripts by simply typing anywhere
- To trigger this example, type "kit,," anywhere
*/

// Name: Sample Snippet
// Description: Expand Text Globally
// Author: John Lindquist
// Twitter: @johnlindquist
// Snippet: kit,,

import "@johnlindquist/kit"

await keyboard.type("https://scriptkit.com")
