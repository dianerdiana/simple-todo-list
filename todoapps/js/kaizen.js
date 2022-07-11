const RENDER_EVENT = 'render-todo'

const todos = []

// get element from document
const submitForm = document.getElementById('form')
const textTodo = document.getElementById('title')
const timeStamp = document.getElementById('date')

//get container todos category
const uncompletedTodoList = document.getElementById('todos')
const completedTodoList = document.getElementById('completed-todos')

// create element for todo

document.addEventListener(RENDER_EVENT, () => {
  uncompletedTodoList.innerHTML = ''
  completedTodoList.innerHTML = ''

  for (const todo of todos) {
    const todoElement = makeTodo(todo)

    if (!todo.isCompleted) {
      uncompletedTodoList.append(todoElement)
    } else {
      completedTodoList.append(todoElement)
    }
  }
})

document.addEventListener('DOMContentLoaded', () => {
  submitForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
  })
})

function addTodo() {
  const generatedID = generatedId()
  const todoObject = generatedTodoObject(generatedID, textTodo.value, timeStamp.value, false)
  todos.push(todoObject)

  document.dispatchEvent(new Event(RENDER_EVENT))
}

function generatedId() {
  return +new Date()
}

function generatedTodoObject(id, task, timestamp, isCompleted) {
  return {
    id,
    task,
    timestamp,
    isCompleted
  }
}

function makeTodo(todoObject) {
  const container = document.createElement('div')
  const todoTitle = document.createElement('h2')
  const todoTimestamp = document.createElement('p')
  const todoContainer = document.createElement('div')

  todoTitle.innerText = todoObject.task
  todoTimestamp.innerText = todoObject.timestamp
  
  todoContainer.classList.add('inner')
  todoContainer.append(todoTitle, todoTimestamp)

  container.classList.add('item', 'shadow')
  container.append(todoContainer)
  container.setAttribute('id', `todo-${todoObject.id}`)

  if (todoObject.isCompleted) {
    const undoButton = document.createElement('button')
    const trashButton = document.createElement('button')

    undoButton.classList.add('undo-button')
    undoButton.addEventListener('click', () => {
      undoTaskFromCompleted(todoObject.id)
    })
  
    trashButton.classList.add('trash-button')
    trashButton.addEventListener('click', () => {
      removeTaskFromCompleted(todoObject.id)
    })

    container.append(undoButton, trashButton)
  } else {
    const checkButton = document.createElement('button')
    checkButton.classList.add('check-button')
    checkButton.addEventListener('click', () => {
      addTaskToCompleted(todoObject.id)
    })

    container.append(checkButton)
  }

  return container
}

function addTaskToCompleted (todoId) {
  const todoTarget = findTodo(todoId)

  if (todoTarget === null) return

  todoTarget.isCompleted = true
  
  document.dispatchEvent(new Event(RENDER_EVENT))
}

function removeTaskFromCompleted(todoId) {
  const todoTarget = findTodoIndex(todoId);
 
  if (todoTarget === -1) return;
 
  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
}
 
 
function undoTaskFromCompleted(todoId) {
  const todoTarget = findTodo(todoId);
 
  if (todoTarget == null) return;
 
  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findTodo(todoId) {
  for (const todo of todos) {
    if (todo.id === todoId) {
      return todo
    }
  }

  return null
}

function findTodoIndex(todoId) {
  for (const index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }
 
  return -1;
}


// const card = document.createElement('div')
// const cardList = document.createElement('div')
// const bookDetails = document.createElement('div')
// const bookAction = document.createElement('div')
// const titleBook = document.createElement('h4')
// const authorBook = document.createElement('p')
// const yearBook = document.createElement('p')

// cardList.classList.add('card-list')
// bookDetails.classList.add('book-details')
// bookDetails.setAttribute('id', `book-${id}`)
// bookAction.classList.add('action-group')
// titleBook.innerText = `${title}`
// authorBook.innerText = `Penulis: ${author}`
// yearBook.innerText = `Tahun: ${year}`

// bookDetails.append(titleBook, authorBook, yearBook)
// cardList.append(bookDetails, bookAction)
// card.append(cardList)

// if (isComplete) {
//   const btnDelete = document.createElement('button')
//   const btnSetNotFinished = document.createElement('button')

//   btnDelete.addEventListener('click', () => {})
//   btnSetNotFinished.addEventListener('click', () => {})

//   bookAction.append(btnSetNotFinished, btnDelete)
// } else {
//   const btnDelete = document.createElement('button')
//   const btnSetFinished = document.createElement('button')

//   btnDelete.addEventListener('click', () => {})
//   btnSetFinished.addEventListener('click', () => {})

//   bookAction.append(btnSetFinished, btnDelete)
// }