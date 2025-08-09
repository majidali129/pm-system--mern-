export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
  },

  users: {
    currentUser: "/users/current-user",
    // for only admin
    getAllUsers: "/users",
    getUserInfo: (id: string) => `/users/${id}`,
    removeUser: (id: string) => `/users/${id}`,
  },
  projects: {
    create: "/projects",
    getAllProjects: "/projects",
    getAllProjectStats: "/projects/stats",
    getProjectInfo: (id: string) => `/projects/${id}`,
    getProjectTasks: (id: string) => `/projects/${id}/tasks`,
    deleteProject: (id: string) => `/projects/${id}`,
    updateProjectStatus: (id: string) => `/projects/${id}/status`,
    updateProjectEndDate: (id: string) => `/projects/${id}/endDate`,
    allocateTeamToProject: (id: string) => `/projects/${id}/allocate-team`,
    removeTeamMemberFromProject: (id: string) =>
      `/projects/${id}/remove-team-member`,
  },
  tasks: {
    create: "/tasks",
    getAllTasks: "/tasks",
    getTaskInfo: (id: string) => `/tasks/${id}`,
    updateTaskStatus: (id: string) => `/tasks/${id}/status`,
    deleteTask: (id: string) => `/tasks/${id}`,
    assignTask: () => `/tasks/assign`,
  },
  reports: {
    getReports: "/reports",
  },
};
