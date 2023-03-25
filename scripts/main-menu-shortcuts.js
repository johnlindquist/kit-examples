/*
# Main Menu Cheat Sheet

| Script                    | Key         |
| ------------------------- | -           |
| App Launcher              | ;           |
| File Browser              | /           |
| Terminal                  | >           |
| Clipboard                 | <           |
| Calculator                | 1-9         |
| Emoji Picker              | 0           |
| Scratch Pad               | ,           |
| File Search               | .           |
| View Snippets             | '           |
| Word API                  | "           |
| System Commands           | -           |
| Dev Tools Window          | =           |
| Google Suggest            | ~           |
| Google                    | `           |
| GitHub Discussions        | ?           |

| Actions                   | Shortcut    |
| ------------------------- | ---------   |
| Run Selected Script       | return      |
| Reveal Actions            | right arrow |
| Debug Script (Pro)        | cmd+return  |
| Show Log Window (Pro)     | opt+return  |
| New Script                | cmd+n       |
| Edit Script               | cmd+o       |
| Share Script on GitHub    | cmd+s       |
| Export Script             | cmd+e       |
| Copy Script Contents      | cmd+c       |
| Paste Script as Markdown  | cmd+shift+p |
| Open Log                  | cmd+l       |
| Open Kenv in VS Code      | cmd+shift+o |
| Create/Edit Docs          | cmd+.       |
| Reveal Script in Finder   | cmd+shift+f |
| Manage Running Processes  | cmd+p       |


*/

// Name: Main Menu Reference
// Description: List of Main Menu Features
// Index: 0

let cheatSheet = `
# Main Menu Cheat Sheet

## Scripts

| Script                    | Key         |
| ------------------------- | -           |
| App Launcher              | ;           |
| File Browser              | /           |
| Terminal                  | >           |
| Clipboard                 | <           |
| Calculator                | 1-9         |
| Emoji Picker              | 0           |
| Scratch Pad               | ,           |
| File Search               | .           |
| View Snippets             | '           |
| Word API                  | "           |
| System Commands           | -           |
| Dev Tools Window          | =           |
| Google Suggest            | ~           |
| Google                    | \`           |
| GitHub Discussions        | ?           |

## Actions

| Actions                   | Shortcut    |
| ------------------------- | ---------   |
| Run Selected Script       | return      |
| Reveal Actions            | right arrow |
| Debug Script (Pro)        | cmd+return  |
| Show Log Window (Pro)     | opt+return  |
| New Script                | cmd+n       |
| Edit Script               | cmd+o       |
| Share Script on GitHub    | cmd+s       |
| Export Script             | cmd+e       |
| Copy Script Contents      | cmd+c       |
| Paste Script as Markdown  | cmd+shift+p |
| Open Log                  | cmd+l       |
| Open Kenv in VS Code      | cmd+shift+o |
| Create/Edit Docs          | cmd+.       |
| Reveal Script in Finder   | cmd+shift+f |
| Manage Running Processes  | cmd+p       |
`.trim()

let { default: markdownpdf } = await import("markdown-pdf")
let cssPath = tmpPath("markdown-pdf.css")
let pdfPath = tmpPath("MainMenuCheatSheet.pdf")

let css = `
body{
  font-size: 50%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f8f8f8;
}
`
await writeFile(cssPath, css)

markdownpdf({
  cssPath,
})
  .from.string(cheatSheet)
  .to(pdfPath, () => {
    open(pdfPath)
  })
