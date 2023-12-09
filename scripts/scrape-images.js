/*
# Scrape Images Script

- You will be prompted to input an "Image search" query.
- The script autonomously performs an image search on Google for your input.
- The script extracts the image source links (`.src`) from the search results and filters to base64
- An array of these images is then mapped to be displayed as an HTML string.
- The HTML string is then displayed in a `div` prompt
*/

// Name: Scrape Images
// Description: Scrape Images from Google

import "@johnlindquist/kit"

let query = await arg("Image search")
let srcs = await scrapeSelector(`https://www.google.com/search?q=${query}&tbm=isch`, "img", el => el.src)
let base64s = srcs.filter(src => src.includes("base64"))

let html = `<div class="flex flex-wrap w-full">
${base64s.map(src => `<img class="w-24 h-24 object-cover" src="${src}" />`).join("\n")}
</div>
`

await div({
  html,
  ignoreBlur: true,
})
