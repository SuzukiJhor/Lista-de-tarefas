const todoContainer = document.querySelector('.todo-container')
const todoForm = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const editForm = document.querySelector('.edit')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')
const searchInput = document.querySelector('#search-input')
const eraseBtn = document.querySelector('#erase-button')
const filterBtn = document.querySelector('#filter-select')


let oldEditInput;


// Funçoes

//Funçao para regitrar tarefas no localStorage
function storageUpdate(item) {
    localStorage.setItem(item, JSON.stringify(item))
    showDisplay()
}

function showDisplay() {
    todoList.innerText = ''
    let keys = Object.keys(localStorage)
    keys.sort()
    console.log(keys)
    keys.forEach((item) => {
        saveTodo(item)
    })


}

//Funcao para salvar tarefas e adicionar um item a lista de tarefas.
function saveTodo(text) {

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

    todoList.appendChild(todo)

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

//Funcao para mostrar os itens selecionados de acordo com o botao de filtragem
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

// Eventos
//Adicionando evento no botão de pesquisa.
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

//Adicionando evento no formulário principal.
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = todoInput.value.trim()

    if (inputValue) {
        // saveTodo(inputValue)
        storageUpdate(inputValue)
    }
})

//Adicionando evento no documento, mapeando as classes dos elementos selecionados.
document.addEventListener('click', (e) => {
    const targetEl = e.target
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
})

//Adicionando evento no formulário de edicao.
editForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const newEditInput = editInput.value

    if (newEditInput) {
        updateTodo(newEditInput)
    }
    toggleForms()
})

//Adicionando evento no botao de cancelar edição
cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault()
    toggleForms()
})

//Adicionando evento no botao de filtragem.
filterBtn.addEventListener('click', (e) => {
    e.preventDefault()

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
})

showDisplay()