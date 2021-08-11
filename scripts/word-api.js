// Menu: Word API
// Description: Queries a word api library
// Author: John Lindquist
// Twitter: @johnlindquist

let { setSelectedText } = await kit("text")

let queryWords = (api, type) => async word => {
  if (!word || word?.length < 3) return []
  let url = `https://api.datamuse.com/${api}?${type}=${word}&md=d`

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

  return words.length ? words : [`No results for ${word}`]
}

let input = await arg("Enter word:", queryWords("sug", "s"))

let wordApi = async (type, input) => {
  let word = await arg(
    { message: "Enter word:", input },
    queryWords("words", type)
  )

  setSelectedText(word.replace(/ /g, "+"))
}

let typeMap = {
  Synonym: "ml",
  Noun: "rel_jja",
  Adjectives: "rel_jjb",
  ["Sounds Like"]: "sl",
  Rhyme: "rel_rhy",
  Consonant: "rel_cns",
}

Object.entries(typeMap).forEach(([key, value]) => {
  onTab(key, async () => {
    return await wordApi(value, input)
  })
})
