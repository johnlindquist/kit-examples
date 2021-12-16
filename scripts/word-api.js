// Menu: Word API
// Description: Queries a word api library
// Author: John Lindquist
// Twitter: @johnlindquist

let queryWords = (api, type) => async input => {
  if (!input || input?.length < 3) return []
  let url = `https://api.datamuse.com/${api}?${type}=${input}&md=d`

  let response = await get(url)
  let words = response.data.map(({ word, defs }) => {
    let description = ""
    if (defs) {
      let [type, meaning] = defs[0].split("\t")
      description = `(${type}): ${meaning}`
    }
    return {
      name: `${word}`,
      value: word,
      description,
    }
  })

  return words.length ? words : [`No results for ${input}`]
}

let wordApi = async (api, type, input = "") => {
  let word = await arg(
    { placeholder: "Begin typing to search:", input },
    queryWords(api, type)
  )

  setSelectedText(word.replace(/ /g, "+"))
}

onTab("Spell", async input => {
  await wordApi("sug", "s", input)
})

onTab("Synonym", async input => {
  await wordApi("words", "ml", input)
})

onTab("Nouns", async input => {
  await wordApi("words", "rel_jja", input)
})

onTab("Adjectives", async input => {
  await wordApi("words", "rel_jjb", input)
})

onTab("Sounds Like", async input => {
  await wordApi("words", "sl", input)
})

onTab("Rhyme", async input => {
  await wordApi("words", "rel_rhy", input)
})

onTab("Consonant", async input => {
  await wordApi("words", "rel_cns", input)
})
