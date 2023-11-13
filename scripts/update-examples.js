/*
# Update to the Latest Script Kit Examples

- cd's to the examples directory
- pulls the latest examples from the script kit repo
- goes back to the main menu
*/

// Name: Update Examples
// Description: Update to the Latest Script Kit Examples
// Recent: false

import "@johnlindquist/kit"

let examplesDir = kenvPath("kenvs", "examples")
cd(examplesDir)

await $`git stash`
await $`git pull`

await mainScript()
