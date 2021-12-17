// Menu: Todos "App"
// Description: Create/read/update/delete db example
// Author: John Lindquist
// Twitter: @johnlindquist

let { todos, write } = await db("todos-new-db", {
  todos: [],
})

let onChoices = async input => {
  setPanel(``)
}

let onNoChoices = async input => {
  if (input) setPanel(md(`# Enter to create "${input}"`))
  else setPlaceholder(`Enter a todo name`)
}

let argConfig = {
  placeholder: "Toggle Todo",
  // disabling "strict" allows you to submit the input when no choices are available
  strict: false,
  onChoices,
  onNoChoices,
}

let toggle = async () => {
  let todo = await arg(argConfig, todos)

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
  await toggle()
}

let remove = async () => {
  let todo = await arg("Remove todo:", todos)
  _.remove(todos, ({ id }) => todo.id === id)
  await write()
  await remove()
}

onTab("Toggle", toggle)
onTab("Remove", remove)
