// Menu: Dad Joke
// Description: Dad Joke from icanhazdadjoke.com
// Author: John Lindquist
// Twitter: @johnlindquist

let getJoke = async () => {
  let response = await get(`https://icanhazdadjoke.com/`, {
    headers: {
      Accept: "text/plain",
      "User-Agent": "axios 0.21.1",
    },
  })
  say(response.data)
  return md(`
# ${response.data}  
`)
}

while (true) {
  let yesOrNo = await arg({
    placeholder: "Dad Joke",
    hint: `Another? [y]/[n]`,
    panel: await getJoke(),
  })

  if (yesOrNo === "n") break
}
