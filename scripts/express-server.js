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

let { default: express } = await import("express")
let { default: detectPort } = await import("detect-port")

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
app.listen(port, async () => {
  await div(
    md(`
# Server running at [${url}](${url})

## How to End Long-Running Scripts

Press "${cmd}+p" from the Main Menu to open the Process Manager. Select the process you want to end.

![](https://raw.githubusercontent.com/johnlindquist/screenshots/main/CleanShot%202023-07-11%20at%2008.35.58.jpeg?token=GHSAT0AAAAAABO3JO2OZ3SQGNUZO6EOEHHSZFNNHAA)
`)
  )
  // If a script is going to stay "alive", you need to manually call `hide()` to hide the prompt
  hide()
})

open(url)
