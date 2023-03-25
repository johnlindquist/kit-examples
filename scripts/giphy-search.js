/* 
# Paste a Gif from Giphy
- Prompts the user for a Giphy API key to store in the .env
- Opens a prompt to search gifs from Giphy
- Paste Gif per user's choice
*/

// Name: Giphy
// Description: Search and Paste Gifs
// Author: John Lindquist
// Twitter: @johnlindquist

import "@johnlindquist/kit"

let GIPHY_API_KEY = await env("GIPHY_API_KEY", {
  shortcuts: [
    {
      name: "Get Giphy API Key",
      key: `${cmd}+o`,
      bar: "right",
      onPress: () => {
        open("https://developers.giphy.com/dashboard/")
      },
    },
  ],
  ignoreBlur: true,
  secret: true,
  height: PROMPT.HEIGHT.INPUT_ONLY,
})

let search = q =>
  `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${q}&limit=10&offset=0&rating=g&lang=en`

let giphy = async input => {
  if (!input) {
    return [
      {
        name: "Begin Typing to Search Giphy",
        info: "onNoChoices",
      },
    ]
  }

  let query = search(input)
  let { data } = await get(query)

  return data.data.map(gif => {
    return {
      name: gif.title.trim() || gif.slug,
      value: gif.images.original.url,
      preview: `<img class="w-full" src="${gif.images.downsized.url}" alt="">`,
    }
  })
}

let formattedLink = await arg(
  {
    placeholder: "Search Giphy",
    enter: "Paste URL",
    resize: true,
    shortcuts: [
      {
        name: "Paste Markdown Link",
        key: `${cmd}+m`,
        bar: "right",
        onPress: (input, { focused }) => {
          submit(`![${input}](${focused.value})`)
        },
      },
      {
        name: "HTML <img>",
        key: `${cmd}+i`,
        bar: "right",
        onPress: (input, { focused }) => {
          submit(`<img src="${focused.value}" alt="${input}">`)
        },
      },
    ],
  },
  giphy
)

await setSelectedText(formattedLink)
