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

let { ChatOpenAI } = await import("langchain/chat_models")
let { ConversationChain } = await import("langchain/chains")
let { BufferMemory } = await import("langchain/memory")
let { CallbackManager } = await import("langchain/callbacks")
let { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate, MessagesPlaceholder } = await import(
  "langchain/prompts"
)

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
let id = -1
let llm = new ChatOpenAI({
  openAIApiKey,
  streaming: true,
  callbackManager: CallbackManager.fromHandlers({
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
    handleLLMError: async err => {
      warn(`error`, JSON.stringify(err))
      chat.addMessage("")
      chat.setMessage(-1, err)
    },
    handleLLMEnd: async () => {
      log(`handleLLMEnd`)
    },
  }),
})

let memory = new BufferMemory({
  returnMessages: true,
})

let chain = new ConversationChain({
  llm,
  prompt,
  memory,
})

await chat({
  onSubmit: async input => {
    await chain.call({ input })
  },
})

let conversation = memory.chatHistory.messages
  .map(m => (m.constructor.name.startsWith("Human") ? memory.humanPrefix : memory.aiPrefix) + "\n" + m.text)
  .join("\n\n")

inspect(conversation)
