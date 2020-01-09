// Add and Delete ToDoItems to a Project
const Project = (name) => {
  let _name = name;
  let _toDoList = [];

  const addToDoItem = (item) => {
    _toDoList.push(item);
    // Event Listener here to update ToDoList Display
  }
  
  const removeToDoItem = (item) => {
    _toDoList.find(function(ToDoItem, index) {
      if (item === ToDoItem) {
        // Event Listener here to update ToDoList Display
        return _toDoList.splice(index, 1);
      };
    });
  }

  return {
    get name() {
      return _name;
    },

    set name(name) {
      _name = name;
    },

    get toDoList() {
      return _toDoList;
    },

    addToDoItem,
    removeToDoItem
  };
}

export { Project };