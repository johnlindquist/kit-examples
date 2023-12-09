/*
# Start an Express Server

- Requests to install `express` and `detect-port`
- Starts an express server
- Opens the local url once server is running
*/

// Name: Express Server
// Description: Start an Express server
// Author: John Lindquist
// Twitter: @johnlindquist

import "@johnlindquist/kit"

import express from "express"
import detectPort from "detect-port"

let app = express()
let port = await detectPort(3000)

app.get("/", async (req, res) => {
  let content = await readFile(kitPath("API.md"), "utf-8")
  let style = `<style>
  body {
    font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
    </style>`
  let html = style + md(content)
  res.send(html)
})

let url = `http://localhost:${port}`

/* Important Advanced Concept in v2:
If the "div" was inside of the app.listen callback, the script would end before the server started.
This is because the script attempts to "clean up" after itself once it reaches the end of the file
and there are no outstanding promises or timers.
*/
await new Promise((resolve, reject) => {
  app.listen(port, resolve)
  open(url)
})

await div(
  md(`
# Server running at [${url}](${url})

## How to End Long-Running Scripts

Press "${cmd}+p" from the Main Menu to open the Process Manager. Select the process you want to end.

![http://res.cloudinary.com/johnlindquist/image/upload/v1689094925/clipboard/stzc2z4dsi15wrwdctao.png](http://res.cloudinary.com/johnlindquist/image/upload/v1689094925/clipboard/stzc2z4dsi15wrwdctao.png)
`)
)
// If a script is going to stay "alive", you need to manually call `hide()` to hide the prompt
hide()
