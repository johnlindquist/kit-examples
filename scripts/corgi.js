/*
# Display Images with Widgets

- Opens a widget displaying a picture of a corgi
- Clicking on the corgi requests a new image
- Closing the Widget speaks `Luv u Corgi!`
*/
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
// Note: the `drag` class is necessary to use an html element to drag the widget
let dragBar = `drag absolute z-10 h-4 w-full top-0 left-0`
let corgi = await widget(
  `
<img :src="url"/>
<div class="${dragBar}">
`,
  {
    state: await getState(),
  }
)

corgi.onInit(() => {
  corgi.focus()
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
