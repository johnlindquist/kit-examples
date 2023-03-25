/*
# Todos "App"
- Creates a json file to read/write todos
- Allows to add, toggle, and remove todos
- Demonstrates using "onTab" and advanced "arg" features
*/

// Name: Todos "App"
// Description: Create/read/update/delete db example
// Author: John Lindquist
// Twitter: @johnlindquist

import "@johnlindquist/kit"

let { todos, write } = await db("todos-new-db", {
  todos: [],
})

let formatPanelText = text => {
  return `<div class="text-primary h-full flex px-4 items-center">${text}</div>`
}

let formatChoiceText = text => {
  return `<div class="flex items-center">${text}</div>`
}

let onNoChoices = async input => {
  if (input) {
    setPanel(formatPanelText(`Enter to create "${input}"`))
    setEnter("Create Todo")
  } else {
    setPanel(formatPanelText(`Enter a todo name`))
  }
}

let defaultValue = ""

// The input allows you to maintain input when switching tabs
let toggle = async (input = "") => {
  let todo = await arg(
    {
      input,
      placeholder: "Toggle Todo",
      defaultValue,
      // disabling "strict" allows you to submit the input when no choices are available
      strict: false,
      onNoChoices,
      onChoiceFocus: (input, { focused }) => {
        setEnter("Toggle Todo")
        // defaultValue allows you to maintain the selected choice when switching tabs
        defaultValue = focused?.name
      },
    },
    todos
  )

  if (typeof todo === "string") {
    todos.push({
      name: todo,
      done: false,
      html: formatChoiceText(`❗️ ${todo}`),
      id: uuid(),
    })
  } else if (todo?.id) {
    let foundTodo = _.find(todos, todo)
    foundTodo.done = !foundTodo.done
    let emoji = foundTodo.done ? `✅` : `❗️`
    foundTodo.html = formatChoiceText(`${emoji} ${foundTodo.name}`)
  }

  await write()
  // Call toggle to keep the prompt open and create another todo
  await toggle()
}

let remove = async (input = "") => {
  let todo = await arg(
    {
      input,
      defaultValue,
      placeholder: "Remove Todo",
      enter: "Remove Todo",
      onNoChoices: () => {
        setPanel(formatPanelText(`No todos to remove 🤔`))
      },
      onChoiceFocus: (input, { focused }) => {
        defaultValue = focused?.name
      },
    },
    todos
  )
  _.remove(todos, ({ id }) => todo.id === id)
  await write()
  await remove()
}

onTab("Toggle", toggle)
onTab("Remove", remove)
