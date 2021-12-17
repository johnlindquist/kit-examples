// Menu: Giphy
// Description: Search and Paste Gifs
// Author: John Lindquist
// Twitter: @johnlindquist

import "@johnlindquist/kit"

let GIPHY_API_KEY = await env("GIPHY_API_KEY", {
  panel: md(
    `## Get a [Giphy API Key](https://developers.giphy.com/dashboard/)`
  ),
  ignoreBlur: true,
  secret: true,
})

let search = q =>
  `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${q}&limit=10&offset=0&rating=g&lang=en`

let giphy = async input => {
  if (!input) return md(`# Search Giphy`)
  let query = search(input)
  let { data } = await get(query)

  return data.data.map(gif => {
    return {
      name: gif.title.trim() || gif.slug,
      value: {
        input,
        url: gif.images.original.url,
      },
      preview: `<img class="w-full" src="${gif.images.downsized.url}" alt="">`,
    }
  })
}

let { input, url } = await arg("Search Giphy", giphy)

let formattedLink = await arg("Format", [
  {
    name: "[U]RL Only",
    description: url,
    value: url,
  },
  {
    name: "[M]arkdown Image Link",
    description: `![${input}](${url})`,
    value: `![${input}](${url})`,
  },
  {
    name: "[H]TML <img>",
    description: `<img src="${url}" alt="${input}">`,
    value: `<img src="${url}" alt="${input}">`,
  },
])

setSelectedText(formattedLink)
