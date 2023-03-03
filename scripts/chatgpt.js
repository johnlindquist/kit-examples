/*
# Chat with ChatGPT

- Opens the `chat` component
- Type a message and press `enter` to send
- The message is sent to the OpenAI API
- The response from OpenAI is displayed in the chat
- Repeat!
*/

// Name: ChatGPT

import "@johnlindquist/kit"

await npm("openai")
await npm("langchain")

let { OpenAIChat } = await import("langchain/llms")
let { ConversationChain } = await import("langchain/chains")
let { BufferMemory } = await import("langchain/memory")

let rawMessage = ``
let llm = new OpenAIChat({
  openAIApiKey: await env("OPENAI_API_KEY", {
    hint: `Grab a key from <a href="https://platform.openai.com/account/api-keys">here</a>`,
  }),

  streaming: true,
  callbackManager: {
    handleStart: () => {
      rawMessage = ``
      chat.addMessage("")
    },
    handleNewToken: token => {
      rawMessage += token
      let htmlMessage = md(rawMessage)
      chat.setMessage(-1, htmlMessage)
    },
    handleError: err => {
      log({ err })
    },
  },
})

let memory = new BufferMemory()
memory.buffer = `${memory.humanPrefix}: Rules for the AI responses:
Always format with markdown when responding with lists, links, tables, headings, and any other data.`
let chain = new ConversationChain({
  llm,
  memory,
})

let messages = await chat({
  onSubmit: async input => {
    await chain.call({ input })
  },
})

inspect(messages)
