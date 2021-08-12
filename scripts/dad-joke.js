// Menu: Dad Joke
// Description: Dad Joke from icanhazdadjoke.com
// Author: John Lindquist
// Twitter: @johnlindquist

let response = await get(`https://icanhazdadjoke.com/`, {
  headers: {
    Accept: "text/plain",
    "User-Agent": "axios 0.21.1",
  },
})

div(response.data, `p-4`)
say(response.data)
