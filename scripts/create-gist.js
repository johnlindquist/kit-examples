/*
# Create a Gist

- Opens the built-in editor
- Saving automatically creates a Gist
- Opens the Gist in your browser
*/

// Name: Create Gist
// Description: Quickly Save Text as a Gist

import { backToMainShortcut } from "@johnlindquist/kit"

let contents = await editor({
  shortcuts: [
    backToMainShortcut,
    {
      name: "Post Gist",
      key: `${cmd}+s`,
      bar: "right",
      onPress: async (input, { focused }) => {
        submit(input)
      },
    },
  ],
})
let { html_url } = await createGist(contents)
open(html_url)
