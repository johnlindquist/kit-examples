// Name: Sample Template
// Description: Use a Template to Generate Text
// Author: John Lindquist
// Twitter: @johnlindquist

import "@johnlindquist/kit"

// Templates use the same variable syntax as VS Code templates
// Templates pair very nicely with snippets!
let result = await template(`
// Name: \${1:Script Name}
// Description: \${2:Script Description}
// Author: \${3:John Lindquist}
// Twitter: \${4:@johnlindquist}
`.trim())

// You can think of `setSelectedText` as "paste this text" in the
// active app behind Kit.app
setSelectedText(result)
