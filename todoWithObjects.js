
class ToDo {
    constructor(id, text, completed = false) {
      this.id = id;
      this.text = text;
      this.completed = completed;
    }
  
    toggleCompleted() {
      this.completed = !this.completed;
    }
  }
  
  class ToDoList {
    constructor() {
      this.todos = [];
    }
  
    addTodo(text) {
      const newTodo = new ToDo(Date.now(), text);
      this.todos.push(newTodo);
      return newTodo;
    }
  
    deleteTodo(id) {
      const indexToDelete = this.todos.findIndex((todo) => todo.id === id);
      if (indexToDelete !== -1) {
        this.todos.splice(indexToDelete, 1);
      }
    }
  
    toggleCompleted(id) {
      const todoToUpdate = this.todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.toggleCompleted();
      }
    }
  
    refreshTodoList() {
      const todoListElement = document.getElementById("todoList");
      todoListElement.innerHTML = "";
      this.todos.forEach((todo) => this.displayTodo(todo));
    }
  
    displayTodo(todo) {
      const todoListElement = document.getElementById("todoList");
  
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" ${
          todo.completed ? "checked" : ""
        } onclick="todoList.toggleCompleted(${todo.id})">
        <span>${todo.text}</span>
        <button onclick="deleteTodo(${
          todo.id
        })" style="margin-left: auto;">Delete</button>
      `;
  
      todoListElement.appendChild(li);
    }
  }
  
  // Create ToDoList instance
  const todoList = new ToDoList();
  
  // Example function to add a ToDo when the "Add" button is clicked
  function addTodo() {
    const inputElement = document.getElementById("newTodo");
    const todoText = inputElement.value;
  
    if (todoText.trim() !== "") {
      const newTodo = todoList.addTodo(todoText);
      todoList.displayTodo(newTodo);
      inputElement.value = "";
    }
  }
  
  // Example function to delete a ToDo when the "Delete" button is clicked
  function deleteTodo(id) {
    todoList.deleteTodo(id);
    todoList.refreshTodoList();
  }
  