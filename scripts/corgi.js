// Name: Corgi
// Description: For When You Need a Corgi

import "@johnlindquist/kit"

let corgi = await widget(`<img :src="url"/>`)

let updateImage = async () => {
  let response = await get(
    `https://dog.ceo/api/breed/corgi/images/random`
  )

  corgi.setState({ url: response.data.message })
}

updateImage()
corgi.onClick(updateImage)
