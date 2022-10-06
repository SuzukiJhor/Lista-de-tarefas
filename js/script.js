const formTodo = document.querySelector('#todo-form')
const formTodoInput = document.querySelector('#todo-input')
const formSearch = document.querySelector('#search form')


const searchInput = document.querySelector('#search-input')

const todoContainer = document.querySelector('.todo-container')

const editForm = document.querySelector('.edit')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')
const searchBtn = document.querySelector('#search-button')
const filterBtn = document.querySelector('#filter-select')
const image = document.querySelector('.container-imagem')

let oldEditInput;

const setTodo = event => {
    event.preventDefault()

    const todoText = formTodoInput.value.trim()
    if (todoText.length) {
        storageUpdate(todoText)
    }

    event.target.reset()
}


const storageUpdate = item => {
    localStorage.setItem(item, JSON.stringify(item))

    let keys = JSON.parse(localStorage.getItem(item))
    createTodoScreen(keys)
}

const createTodoScreen = text => {
    const todo = document.createElement('div')
    todo.classList.add('todo')

    const todoTitle = document.createElement('h3')
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement('button')
    doneBtn.classList.add('finish-todo')
    doneBtn.innerHTML = "<i class='fa-solid fa-check'></i>"
    todo.appendChild(doneBtn)

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-todo')
    editBtn.innerHTML = "<i class='fa-solid fa-pen'></i>"
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('remove-todo')
    deleteBtn.innerHTML = "<i class='fa-solid fa-xmark '></i>"
    todo.appendChild(deleteBtn)

    document.querySelector('#todo-list').appendChild(todo)
}


function toggleForms() {
    editForm.classList.toggle('hide')
    todoContainer.classList.toggle('hide')
}

function updateTodo(text) {
    const todos = document.querySelectorAll('.todo')
    todos.forEach((todo) => {

        let todoTitle = todo.querySelector('h3')

        if (oldEditInput == todoTitle.innerText)
            todoTitle.innerText = text
        localStorage.removeItem(oldEditInput)
        storageUpdate(text)
    })
}

const show = {
    showDone: function() {
        const todos = document.querySelectorAll('.todo')
        todos.forEach((item) => {
            item.classList.add('hide')
        })

        let done = document.querySelectorAll('.done')
        done.forEach((item) => {
            item.classList.remove('hide')

        })
    },

    showAll: function() {
        const todos = document.querySelectorAll('.todo')
        todos.forEach((item) => {
            item.classList.remove('hide')
        })
    },

    showTodo: function() {
        const todos = document.querySelectorAll('.todo')
        todos.forEach((item) => {
            item.classList.remove('hide')
        })

        let done = document.querySelectorAll('.done')
        done.forEach((item) => {
            item.classList.add('hide')
        })

    }
}

const searchTask = event => {
    event.preventDefault()
    if (searchInput.value) {
        const todos = document.querySelectorAll('.todo')
        todos.forEach((item) => {
            item.classList.add('hide')
            if (searchInput.value.trim() == item.innerText.trim()) {
                item.classList.remove('hide')
            }
        })
    }
    if (!searchInput.value) {
        alert('O campo de busca esta vazio')
    }
}

const selectClasses = event => {
    event.preventDefault()
    const targetEl = event.target
    const targetClass = targetEl.classList.value;
    const parentEl = targetEl.closest('div')
    let todoTitle;

    if (parentEl && parentEl.querySelector('h3')) {
        todoTitle = parentEl.querySelector('h3').innerText

    }
    if (targetClass == 'remove-todo') {
        parentEl.remove()
        localStorage.removeItem(parentEl.innerText)
    }
    if (targetClass == 'finish-todo') {
        parentEl.classList.toggle('done')
    }
    if (targetClass == 'edit-todo') {
        toggleForms()
        editInput.value = todoTitle.trim()
        oldEditInput = todoTitle.trim()
    }

}

const editTask = event => {
    event.preventDefault()
    const newEditInput = editInput.value

    if (newEditInput) {
        updateTodo(newEditInput)
    }
    toggleForms()
}

const filterTask = event => {
    event.preventDefault()
    let selectValue = filterBtn.options[filterBtn.selectedIndex].value

    if (selectValue === 'done') {
        show.showDone()
    }

    if (selectValue == 'todo') {
        show.showTodo()
    }

    if (selectValue == 'all') {
        show.showAll()
    }
}

const initial = () => {
    const keys = Object.keys(localStorage)
    keys.sort()
    keys.forEach((item) => {
        createTodoScreen(item)
    })
}

// document.addEventListener('click', selectClasses)

formTodo.addEventListener('submit', setTodo)

formSearch.addEventListener('submit', searchTask)

editForm.addEventListener('submit', editTask)

cancelEditBtn.addEventListener('click', toggleForms)

filterBtn.addEventListener('click', filterTask)

initial()