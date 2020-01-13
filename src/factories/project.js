// Add and Delete ToDoItems to a Project
const Project = (name) => {
  let _name = name;
  let _idNo;
  let _toDoList = [];

  const addToDoItem = (item) => {
    if (_idNo != 0) {
      item.projectIDNo = _idNo;
    }

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

  const findToDoItem = (itemTitle) => {
    for (let toDoItem of _toDoList) {
      if (toDoItem.title === itemTitle) {
        return toDoItem;
      } 
    }
  }

  const findToDoItemByTaskID = (taskNo) => {
    for (let toDoItem of _toDoList) {
      if (toDoItem.taskIDNo == taskNo) {
        return toDoItem;
      } 
    }
  }

  return {
    get name() {
      return _name;
    },

    set name(name) {
      _name = name;
    },

    get id() {
      return _idNo;
    },

    set id(number) {
      _idNo = number;
    },

    get toDoList() {
      return _toDoList;
    },

    addToDoItem,
    removeToDoItem,
    findToDoItem,
    findToDoItemByTaskID
  };
}

export { Project };