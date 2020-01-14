// Module containing list of all projects
const Projects = (function() {
  let currentProjectIDNo = 0;
  let _list = [];
  // let projectTemplate = document.getElementById("projects-template").innerHTML;
  // console.log(projectTemplate);

  const addProject = (project) => {
    project.id = currentProjectIDNo;
    _list.push(project);
    incrementProjectIDNo();
    // Event listener to update Project list
  }

  const removeProject = (targetProject) => {
    _list.find(function(project, index) {
      if (project === targetProject) {
        return _list.splice(index, 1);
        // Event listener to update Project list
      }
    });
  }

  const findProject = (projectName) => {
    for (let project of _list) {
      if (project.name === projectName) {
        return project;
      }  
    }
  }

  const findProjectByNo = (number) => {
    for (let project of _list) {
      if (project.id === number ) {
        return project;
      }
    }
  }

  const incrementProjectIDNo = () => {
    currentProjectIDNo++;
  }

  return {
    get list() {
      return _list;
    },

    addProject,
    removeProject,
    findProject,
    findProjectByNo
  };
})();

export { Projects };