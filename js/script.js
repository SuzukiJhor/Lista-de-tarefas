const formTodo = document.querySelector('#todo-form')
const formTodoInput = document.querySelector('#todo-input')
const searchInput = document.querySelector('#search-input')
const editForm = document.querySelector('.container-edit')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')
const filterBtn = document.querySelector('#filter-select')

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

const toggleForms = () => {
    editForm.classList.toggle('hide')

}

const updateTodo = newText => {

    const todos = document.querySelectorAll('.todo')
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3')

        if (oldEditInput.trim() == todoTitle.innerText.trim()) {
            todoTitle.innerText = newText
            localStorage.removeItem(oldEditInput)
            localStorage.setItem(newText, JSON.stringify(newText))
        }
    })
}

const searchTask = event => {
    event.preventDefault()

    const inputValue = searchInput.value.trim().toLowerCase().replace(/\s/g, '')
    const todos = Array.from(document.querySelectorAll('.todo'))

    const todosVisible = todos.map(item => ({
        item,
        shouldBeVisible: item.innerText.toLowerCase().includes(inputValue)
    }))

    todosVisible.forEach(({ item, shouldBeVisible }) => {
        item.classList.add('hide')
        if (shouldBeVisible) {
            item.classList.remove('hide')
        }
    })
}

const selectClasses = event => {

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

const initialLoadLocalStorage = () => {
    const keys = Object.keys(localStorage)
    keys.sort()
    keys.forEach((item) => {
        createTodoScreen(item)
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

formTodo.addEventListener('submit', setTodo)
searchInput.addEventListener('input', searchTask)
editForm.addEventListener('submit', editTask)
cancelEditBtn.addEventListener('click', toggleForms)
filterBtn.addEventListener('click', filterTask)
document.addEventListener('click', selectClasses)

initialLoadLocalStorage()