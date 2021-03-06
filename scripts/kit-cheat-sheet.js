// Name: Cheat Sheet
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
[ = Templates
" = Word API
- = System Commands
= = Dev Tools
: = Emoji Picker
~ = Google Suggest
\` = Google

Note: Feel free to modify this and take your own notes! 😉
`.trim()

let cheatSheetPath = kenvPath("cheat-sheet.md")

// If file doesn't exist, create with content
let value = await ensureReadFile(cheatSheetPath, sheet)

let content = await editor({
  value,
  footer: `cmd+s to save`,
})

// update file after save
await writeFile(kenvPath("cheat-sheet.md"), content)
