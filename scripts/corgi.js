// Name: Corgi Widget
// Description: Display a Corgi in a Widget
// Author: John Lindquist
// Twitter: @johnlindquist

import "@johnlindquist/kit"

let dogUrl = `https://dog.ceo/api/breed/corgi/images/random`
let getState = async () => {
  let response = await get(dogUrl)
  return {
    url: response.data.message,
  }
}

// Create a Corgi Widget
// When focused, close with `escape` or `cmd + w`
let corgi = await widget(`<img :src="url"/>`, {
  state: await getState(),
})

// Update State on Click
corgi.onClick(async () => {
  corgi.setState(await getState())
})

corgi.onResized(async () => {
  corgi.fit()
})

corgi.onClose(async () => {
  say(`Luv u Corgi!`)
})
