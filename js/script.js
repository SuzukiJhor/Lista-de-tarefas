const todoContainer = document.querySelector('.todo-container')
const todoForm = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo-input')

const editForm = document.querySelector('.edit')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')
const searchInput = document.querySelector('#search-input')
const eraseBtn = document.querySelector('#erase-button')
const filterBtn = document.querySelector('#filter-select')
const image = document.querySelector('.container-imagem')

console.log(image)

let oldEditInput;


// Funçoes

//Funçao para regitrar tarefas no localStorage
function storageUpdate(item) {
    localStorage.setItem(item, JSON.stringify(item))
    clearFields()
}

function clearFields() {
    // todoList.innerText = ''
    let keys = Object.keys(localStorage)
    keys.sort()
    console.log(keys)
    keys.forEach((item) => {
        createTodo(item)
    })
}

function createTodo(text) {
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

    todoInput.value = ''
    todoInput.focus()
}

//Funcao para mostrar o formulário de edicao.
function toggleForms() {
    editForm.classList.toggle('hide')
    todoContainer.classList.toggle('hide')
}

//Funcao para editar item na lista de tarefas.
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


eraseBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (searchInput.value) {
        const todos = document.querySelectorAll('.todo')
        console.log(todos)
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
})

const updateInput = event => {
    event.preventDefault()
    const inputValue = todoInput.value.trim()

    if (inputValue) {
        // saveTodo(inputValue)
        storageUpdate(inputValue)
    }
}

todoForm.addEventListener('submit', updateInput)

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

document.addEventListener('click', selectClasses)

editForm.addEventListener('submit', editTask)

cancelEditBtn.addEventListener('click', toggleForms)

filterBtn.addEventListener('click', filterTask)

clearFields()