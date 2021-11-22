// Menu: Todos "App"
// Description: Create/read/update/delete db example
// Author: John Lindquist
// Twitter: @johnlindquist

let { todos, write } = await db("todos-new-db", {
  todos: [],
})

let todosChoices = () =>
  todos.map(({ name, done, id }) => ({
    id,
    name: `${done ? "✅" : "❗️"} ${name}`,
    value: id,
  }))

let add = async () => {
  let name = await arg(
    "Enter todo name:",
    md(
      todosChoices()
        .map(t => `* ${t.name}`)
        .join("\n")
    )
  )
  todos.push({ name, done: false, id: uuid() })
  await write()
  await add()
}

let toggle = async () => {
  let id = await arg("Toggle todo:", todosChoices())
  let todo = todos.find(todo => todo.id === id)
  todo.done = !todo.done
  await write()
  await toggle()
}

let remove = async () => {
  let id = await arg("Remove todo:", todosChoices())
  todos = todos.filter(todo => todo.id !== id)
  await write()
  await remove()
}

onTab("Add", add)
onTab("Toggle", toggle)
onTab("Remove", remove)
