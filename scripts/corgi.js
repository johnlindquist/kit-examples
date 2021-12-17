// Name: Corgi
// Description: For When You Need a Corgi

import "@johnlindquist/kit"

let response = await get(
  `https://dog.ceo/api/breed/corgi/images/random`
)

show(`<image src="${response.data.message}"/>`)
