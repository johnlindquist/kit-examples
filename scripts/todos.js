// Menu: Todos "App"
// Description: Example of create/read/update/delete
// Shortcut: cmd shift .
// Author: John Lindquist
// Twitter: @johnlindquist

let {
  addTodo,
  getTodos,
  removeTodo,
  toggleTodo,
} = await lib("todos")

let todosChoices = () =>
  getTodos().map(({ name, done, id }) => ({
    name: `${done ? "✅" : "❗️"} ${name}`,
    value: id,
  }))

let toggle = async () => {
  let id = await arg("Toggle todo:", todosChoices())
  toggleTodo(id)
  await toggle()
}

let add = async () => {
  addTodo(await arg("Enter todo name:"))
  await add()
}

let remove = async () => {
  let id = await arg("Remove todo:", todosChoices())
  removeTodo(id)
  await remove()
}

onTab("Add", add)
onTab("Toggle", toggle)
onTab("Remove", remove)
