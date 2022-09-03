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

// Funçoes

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

function toggleForms() {
    editForm.classList.toggle('hide')
    todoContainer.classList.toggle('hide')

}

function updateTodo(text) {
    const todos = document.querySelectorAll('.todo')

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3')

        todoTitle.innerText = text

        console.log(todoTitle)

        // if (todoTitle.innerText === )
    })
}


// Eventoss

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = todoInput.value
    if (inputValue) {
        saveTodo(inputValue)
    }

})

document.addEventListener('click', (e) => {

    const targetEl = e.target
    const targetValue = targetEl.classList.value;
    const parentEl = targetEl.closest('div')

    let todoTitle;

    if (parentEl && parentEl.querySelector('h3')) {
        todoTitle = parentEl.querySelector('h3').innerText

    }




    if (targetValue == 'remove-todo') {
        parentEl.remove()
    }

    if (targetValue == 'finish-todo') {
        parentEl.classList.toggle('done')

    }
    if (targetValue == 'edit-todo') {
        toggleForms()
        editInput.value = todoTitle

    }
})

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault()

    toggleForms()
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const newEditInput = editInput.value
    if (newEditInput) {
        updateTodo(newEditInput)

    }
    toggleForms()

})