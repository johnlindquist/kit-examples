// Menu: Todos "App"
// Description: Create/read/update/delete db example
// Author: John Lindquist
// Twitter: @johnlindquist

import "@johnlindquist/kit"

let { todos, write } = await db("todos-new-db", {
  todos: [],
})

let onNoChoices = async input => {
  if (input) {
    setPanel(md(`# Enter to create "${input}"`))
    setEnter("Create Todo")
  } else {
    setPanel(md(`# Enter a todo name`))
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
      html: md(`## ❗️ ${todo}`),
      id: uuid(),
    })
  } else if (todo?.id) {
    let foundTodo = _.find(todos, todo)
    foundTodo.done = !foundTodo.done
    let emoji = foundTodo.done ? `✅` : `❗️`
    foundTodo.html = md(`## ${emoji} ${foundTodo.name}`)
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
        setPanel(md(`# No todos to remove`))
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
