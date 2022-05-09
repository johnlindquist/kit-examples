// Name: Sample Template
// Template: true

// Typing "[" in the main menu will list scripts with the
// "Template" comment. This convention helps organize
// scripts designed to paste blocks of such as e-mail templates, etc.

import "@johnlindquist/kit"

let name = await arg("Enter name")

let template = `
My name is ${name} and I love Script Kit! ❤️
`.trim()

// You can think of `setSelectedText` as "paste this text" in the
// active app behind Kit.app
setSelectedText(template)
