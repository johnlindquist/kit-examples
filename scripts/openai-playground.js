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

let { Configuration, OpenAIApi } = await npm("openai")

let configuration = new Configuration({
  apiKey: await env("OPENAI_API_KEY"),
})

let openai = new OpenAIApi(configuration)
let prompt = await arg(
  {
    placeholder: "Prompt",
    strict: false,
  },
  [
    {
      name: "Enter a prompt to send to OpenAI",
      info: "always",
    },
  ]
)

editor(prompt)

setTimeout(() => {
  setLoading(true)
}, 250)
let response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `${prompt}

  `,
  temperature: 0.7,
  max_tokens: 512,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
})

setLoading(false)

let text = response?.data?.choices[0]?.text?.trim()
if (text) {
  await editor(text)
} else {
  dev(response.data)
}
