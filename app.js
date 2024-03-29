//selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// event listerners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

//functions
function addTodo(event) {
  //prevent form from submitting
  event.preventDefault()
  //Todo Div
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')
  //Creat LI
  const newTodo = document.createElement('li')
  newTodo.innerText = todoInput.value
  newTodo.classList.add('todo-item')
  todoDiv.appendChild(newTodo)
  //ADD Todo to local storage
  saveLocalTodos(todoInput.value)
  //CHECK MARK BUTTON
  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class = "fas fa-check"></i>'
  completedButton.classList.add('complete-btn')
  todoDiv.appendChild(completedButton)
  // CHECK TRASH BUTTON
  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class = "fas fa-trash"></i>'
  trashButton.classList.add('trash-btn')
  todoDiv.appendChild(trashButton)
  //APPEND TO LIST
  todoList.appendChild(todoDiv)
  //CLEAR TODO INPUT VALUE
  todoInput.value = ''
}

function deleteCheck(e) {
  const item = e.target
  // DELETE TODO
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement
    //ANIMATION
    todo.classList.add('fall')
    removeLocalTodos(todo)
    todo.addEventListener('transitionend', () => {
      todo.remove()
    })
  }

  //CHECK MARK
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement
    todo.classList.toggle('completed')
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes
  todos.forEach((todo) => {
    todo.style.display = 'none'

    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex'
        break
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        }
        break
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        }
        break
      default:
        console.error(`unhandled case '${e.target.value}'`)
    }
  })
}

function saveLocalTodos(todo) {
  const todos = getTodos()

  todos.push(todo)
  setTodos(todos)
}

function getTodos() {
  const todos = getTodos()
  todos.forEach((todo) => {
    //Todo Div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //Creat LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todo
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    //CHECK MARK BUTTON
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class = "fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)
    // CHECK TRASH BUTTON
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)
    //APPEND TO LIST
    todoList.appendChild(todoDiv)
  })
}

function removeLocalTodos(todo) {
  const todos = getTodos()
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)
  setTodos(todos)
}

function getTodos () {
  return JSON.parse(localStorage.getItem('todos') ?? '[]')
}

function setTodos (todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}
