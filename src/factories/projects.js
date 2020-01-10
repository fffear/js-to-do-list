// Module containing list of all projects
const Projects = (function() {
  let _list = [];
  // let projectTemplate = document.getElementById("projects-template").innerHTML;
  // console.log(projectTemplate);

  const addProject = (project) => {
    _list.push(project);
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
    let projectToReturn;

    for (let project of _list) {
      if (project.name === projectName) {
        return project;
      }
      
    }

    // _list.forEach(function(project, idx) {
    //   if (project.name === projectName) {
    //     console.log(project);
    //     projectToReturn = project;
    //   }
    //   break;
    // });

    // return projectToReturn;
  }

  return {
    get list() {
      return _list;
    },

    addProject,
    removeProject,
    findProject
  };
})();

export { Projects };