/*
# Chat with ChatGPT

## <span class="text-primary">👉 Note: LangChain is still in development. This script will keep updating to use the latest APIs</span>

Use `Kit` -> `Manage npm Packages` -> `Update a Package` -> `langchain` to update to install the latest version.

- Opens the `chat` component
- Type a message and press `enter` to send
- The message is sent to the OpenAI API
- The response from OpenAI is displayed in the chat
- Repeat!
*/

// Name: ChatGPT
// Description: Have a Conversation with an AI
// Author: John Lindquist
// Twitter: @johnlindquist

import "@johnlindquist/kit"

import { ChatOpenAI } from "langchain/chat_models/openai"
import { ConversationChain } from "langchain/chains"
import { BufferWindowMemory } from "langchain/memory"
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts"

let prompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.`
  ),
  new MessagesPlaceholder("history"),
  HumanMessagePromptTemplate.fromTemplate("{input}"),
])

let openAIApiKey = await env("OPENAI_API_KEY", {
  hint: `Grab a key from <a href="https://platform.openai.com/account/api-keys">here</a>`,
})

let currentMessage = ``
let currentInput = ``
let chatHistoryPreAbort = []
let id = -1
let running = false
let llm = new ChatOpenAI({
  openAIApiKey,
  streaming: true,
  callbacks: [
    {
      handleLLMStart: async () => {
        id = setTimeout(() => {
          chat.setMessage(-1, md(`### Sorry, the AI is taking a long time to respond.`))
          setLoading(true)
        }, 3000)
        log(`handleLLMStart`)
        currentMessage = ``
        chat.addMessage("")
      },
      handleLLMNewToken: async token => {
        clearTimeout(id)
        setLoading(false)
        if (!token) return
        currentMessage += token
        let htmlMessage = md(currentMessage)
        chat.setMessage(-1, htmlMessage)
      },
      // Hitting escape to abort throws and error
      // Must manually save to memory
      handleLLMError: async err => {
        warn(`error`, JSON.stringify(err))
        running = false
        // for (let message of chatHistoryPreAbort) {
        //   log({ message })
        //   if (message.text.startsWith(memory.aiPrefix)) {
        //     await memory.chatHistory.addAIChatMessage(message)
        //   }
        //   if (message.text.startsWith(memory.humanPrefix)) {
        //     await memory.chatHistory.addUserMessage(message)
        //   }

        //   await memory.chatHistory.addAIChatMessage(currentMessage)
        //   await memory.chatHistory.addUserMessage(currentInput)
        // }

        memory.chatHistory.addUserMessage(currentInput)
        memory.chatHistory.addAIChatMessage(currentMessage)
      },
      handleLLMEnd: async () => {
        running = false
        log(`handleLLMEnd`)
      },
    },
  ],
})

let memory = new BufferWindowMemory({
  k: 10,
  inputKey: "input", // required when using a signal to abort
  returnMessages: true,
})

let chain = new ConversationChain({
  llm,
  prompt,
  memory,
})

let controller = null
await chat({
  shortcuts: [
    {
      name: `Close`,
      key: `${cmd}+w`,
      onPress: () => {
        process.exit()
      },
      bar: "left",
    },
    {
      name: `Continue Script`,
      key: `${cmd}+enter`,
      onPress: () => {
        submit("")
      },
      bar: "right",
    },
  ],
  onEscape: async () => {
    // chatHistoryPreAbort = await memory.chatHistory.getMessages()
    // log({ chatHistory: memory.chatHistory })
    // log({ chatHistoryPreAbort })

    if (running) controller.abort()
  },
  onSubmit: async input => {
    currentInput = input
    controller = new AbortController()
    running = true
    await chain.call({ input, signal: controller.signal })
  },
})

let conversation = (await memory.chatHistory.getMessages())
  .map(m => (m.constructor.name.startsWith("Human") ? memory.humanPrefix : memory.aiPrefix) + "\n" + m.text)
  .join("\n\n")

inspect(conversation)
