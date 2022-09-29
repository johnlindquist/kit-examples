// Menu: Express Server
// Description: Start an Express server
// Author: John Lindquist
// Twitter: @johnlindquist

let express = await npm("express")
let detectPort = await npm("detect-port")
let app = express()

let port = await detectPort(3000)

app.get("/", async (req, res) => {
  let content = await readFile(kitPath("API.md"), "utf-8")
  let html = await md(content)
  res.send(html)
})

let url = `http://localhost:${port}`
app.listen(port, () => {
  console.log(
    `Example app listening at ${url}`
  )
})

open(url)
