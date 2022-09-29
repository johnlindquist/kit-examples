// Name: Main Menu Actions
// Description: These keys trigger features
// Index: 0

import "@johnlindquist/kit"

let sheet = `
; = App Launcher
/ = File Browser
> = Terminal
< = Clipboard History
1-9 = Calculator
, = Scratch Pad
. = File Search
' = Snippets
" = Word API
- = System Commands
= = Dev Tools
: = Emoji Picker
~ = Google Suggest
\` = Google

Note: Feel free to modify this and take your own notes! 😉
`.trim()

let mainMenuActionsPath = kenvPath("main-menu-actions.md")

// If file doesn't exist, create with content
let value = await ensureReadFile(mainMenuActionsPath, sheet)

let content = await editor({
  value,
  footer: `cmd+s to save`,
})

// update file after save
await writeFile(mainMenuActionsPath, content)
