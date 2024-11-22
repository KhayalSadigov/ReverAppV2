const endpoints = {
  users: {
    getAll: "/api/users",
    getOne: "/api/users/:id",
    post: "/api/users",
    delete: "/api/users/:id",
    patch: "/api/users/:id",
  },
  videos: {
    getOne: "/api/videos/:id",
    getAll: "/api/videos",
    post: "/api/videos",
    delete: "/api/videos/:id",
    put: "/api/videos/:id",
  },
  subjects: {
    getAll: "/api/subjects",
    getOne: "/api/subjects/:id",
  },
};

module.exports = endpoints;
