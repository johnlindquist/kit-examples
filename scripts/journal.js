// Name: Journal

import { createPathResolver } from "@johnlindquist/kit"

let { format } = await npm("date-fns")

let journalDir = await env("JOURNAL_DIR", async () => {
  setDescription(`Select a Journal Directory`)
  return await path()
})

let journalPath = createPathResolver(journalDir)
await ensureDir(journalPath())
cd(journalPath())

let dashedDate = format(new Date(), "yyyy-MM-dd")

let filePath = journalPath(dashedDate + ".md")
setDescription(filePath)
let value = await ensureReadFile(
  filePath,
  `# ${dashedDate}`
)

let dashedTime = format(new Date(), "hh:mma")

if (!value.includes(dashedTime)) {
  value = `${value}

## ${dashedTime}

`
}

let changed = false

let content = await editor({
  value,
  scrollTo: "bottom",
  footer: "File saves automatically on escape or cmd+s",
  onEscape: async (input, { inputChanged }) => {
    changed = inputChanged
    hide()
    submit(input)
  },
  onAbandon: async (input, { inputChanged }) => {
    changed = inputChanged
    submit(input)
  },
  onInput: async () => {
    changed = true
  },
})

let trimmed = content.trim()
if (!changed) {
  exit()
}

await writeFile(filePath, trimmed)

copy(content.split(/##.*/).pop().trim())
let isGit = await isDir(journalPath(".git"))
if (isGit) {
  try {
    let { stdout } = await exec(
      `git add . && git commit -m "${dashedDate}-${dashedTime}" && git push`
    )
    log({ stdout })
  } catch (error) {
    log(error)
  }
}
