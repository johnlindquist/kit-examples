// Exclude: true
// Shortcut: control option v

import "@johnlindquist/kit"

let argOptions = {
  placeholder: "Search history",
  hint: "Enter to paste. Cmd+Shift+Delete to Remove",
  flags: {
    remove: {
      description: "Remove focused item from history",
      shortcut: "cmd+shift+backspace",
    },
  },
}

let history = await getClipboardHistory()
let value = await arg(argOptions, history)

while (flag?.remove) {
  let { id } = history.find(h => h?.value === value)
  removeClipboardItem(id)
  history = await getClipboardHistory()
  value = await arg(argOptions, history)
}

await setSelectedText(value)
