/*
# Speak Text Requested from an API

- Requests a joke from [https://icanhazdadjoke.com](https://icanhazdadjoke.com)
- Speaks the joke
- Tap `y` to speak another joke
*/

// Name: Dad Joke
// Description: Dad Joke from icanhazdadjoke.com
// Author: John Lindquist
// Twitter: @johnlindquist

import "@johnlindquist/kit"

let getJoke = async () => {
  let response = await get(`https://icanhazdadjoke.com/`, {
    headers: {
      Accept: "text/plain",
      "User-Agent": "axios 0.21.1",
    },
  })
  say(response.data)
  return `<div class="text-center text-4xl p-10 font-semibold">${response.data}</div>`
}

while (true) {
  let yesOrNo = await arg(
    {
      placeholder: "Dad Joke",
      enter: ``,
      shortcuts: [
        {
          name: "Another",
          key: `Y`,
          onPress: () => submit("y"),
          bar: "right",
        },
        {
          name: "Please, make it stop!",
          key: `N`,
          onPress: () => submit("n"),
          bar: "right",
        },
      ],
    },
    async () => {
      return await getJoke()
    }
  )

  if (yesOrNo === "n") break
}
