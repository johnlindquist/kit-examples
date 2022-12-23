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
import { highlightJavaScript, getMetadata, backToMainShortcut } from "@johnlindquist/kit"

let mainScriptsPath = kitPath("main")

let files = await readdir(mainScriptsPath)

let scripts = (
  await Promise.all(
    files
      .filter(f => f.endsWith(".js"))
      .map(async file => {
        let scriptPath = path.resolve(mainScriptsPath, file)
        let contents = await readFile(scriptPath, "utf8")
        let metadata = getMetadata(contents)
        if (metadata?.exclude) return ""

        return {
          name: metadata?.name || metadata?.description || file,
          description: metadata?.description || file,
          value: scriptPath,
          preview: async () => highlightJavaScript(scriptPath),
        }
      })
  )
).filter(Boolean)

let selectedScript = await arg(
  {
    placeholder: "Select a Main Script to Run",
    enter: "Run",
    shortcuts: [
      backToMainShortcut,
      {
        name: "View Source",
        key: `${cmd}+o`,
        bar: "right",
        onPress: async (input, { focused }) => {
          await run(kitPath("cli", "edit-script.js"), focused.value)
          submit(false)
        },
      },
    ],
  },
  scripts
)
if (selectedScript) await run(selectedScript)
