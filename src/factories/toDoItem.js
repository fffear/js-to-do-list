// An information holder containing getter and setter methods
const ToDoItem = (title, description, dueDate, priority) => {
  let _title = title;
  let _projectIDNo;
  let _description = description;
  let _dueDate = dueDate;
  let _priority = priority;

  return { 
    get title() {
      return _title;
    },

    set title(title) {
      _title = title;
    },

    get projectIDNo() {
      return _projectIDNo;
    },

    set projectIDNo(projectIDNo) {
      _projectIDNo = projectIDNo;
    },

    get description() {
      return _description;
    },

    set description(description) {
      _description = description;
    },

    get dueDate() {
      return _dueDate;
    },

    set dueDate(dueDate) {
      _dueDate = dueDate;
    },

    get priority() {
      return _priority;
    },

    set priority(priority) {
      _priority = priority;
    }
  };
}

export { ToDoItem };