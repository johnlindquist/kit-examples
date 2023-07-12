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

// "kv" is a key/value store
// The name "todos" will map to ~/.kenv/db/todos.json
// The object will be the initial value
let kv = await store("todos", { todos: [] })
let defaultChoiceId = ""

// The input allows you to maintain input when switching tabs
let toggleTab = async (input = "") => {
  let todos = await kv.get("todos")
  let todo = await micro(
    {
      input,
      placeholder: todos.length ? "Add Todo" : "Toggle Todo",
      defaultChoiceId,
      // disabling "strict" allows you to submit the input when no choices are available
      strict: false,
      onChoiceFocus: (input, { focused }) => {
        // defaultValue allows you to maintain the selected choice when switching tabs
        defaultChoiceId = focused?.id
        setEnter("Toggle Todo")
      },
      onNoChoices: (input, { count }) => {
        setEnter("Add Todo")
      },
    },
    [
      ...todos.map(t => {
        return {
          ...t,
          enter: "Toggle Todo",
          name: `${t.done ? "✅" : "❌"} ${t.name}`,
        }
      }),
      {
        name: "Add Todo",
        miss: true,
        info: true,
      },
    ]
  )

  // "todo" was the string input
  if (typeof todo === "string") {
    todos.push({
      name: todo,
      done: false,
      id: uuid(),
    })
  }
  // "todo" was the selected object
  else if (todo?.id) {
    let foundTodo = todos.find(({ id }) => id === todo.id)
    foundTodo.done = !foundTodo.done
  }

  await kv.set("todos", todos)
  await toggleTab()
}

let removeTab = async (input = "") => {
  let todos = await kv.get("todos")
  let todo = await micro(
    {
      input,
      defaultChoiceId,
      placeholder: "Remove Todo",
      enter: "Remove Todo",
      onChoiceFocus: (input, { focused }) => {
        defaultChoiceId = focused?.id
      },
    },
    [
      ...todos.map(t => {
        return {
          ...t,
          enter: "Toggle Todo",
          name: `${t.done ? "✅" : "❌"} ${t.name}`,
        }
      }),
      {
        name: todos.length ? "No Matches" : "No Todos",
        miss: true,
        info: true,
      },
    ]
  )
  // Remove the todo from the array
  let index = todos.findIndex(t => t.id === todo.id)

  todos.splice(index, 1)
  await kv.set("todos", todos)
  await removeTab()
}

onTab("Toggle", toggleTab)
onTab("Remove", removeTab)
