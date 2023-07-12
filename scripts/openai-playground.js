/*
# Query the OpenAI API

- Prompts the user for an OPENAI_API_KEY
- Prompts the user for a prompt to send to OpenAI
- Sends the prompt to OpenAI
- Displays the response from OpenAI in the built-in editor
*/

// Name: OpenAI Playground
// Description: Query Open AI's API

import "@johnlindquist/kit"
import { Configuration, OpenAIApi } from "openai"

let configuration = new Configuration({
  apiKey: await env("OPENAI_API_KEY"),
})

let openai = new OpenAIApi(configuration)

let currentPanel = ``
let content = ``
let messages = []

while (true) {
  content = await micro(
    {
      ignoreBlur: true,
      input: content,
      placeholder: "Prompt OpenAI",
      strict: false,
      onEscape: () => {
        exit()
      },
    },
    currentPanel
  )

  messages.push({
    role: "user",
    content,
  })

  setLoading(true)

  let response = await openai.createChatCompletion({
    model: "gpt-4",
    messages,
  })

  let message = response?.data?.choices?.[0]?.message
  if (message) {
    messages.push(message)
    currentPanel = md(message?.content)
  } else {
    dev(response.data)
  }
}
