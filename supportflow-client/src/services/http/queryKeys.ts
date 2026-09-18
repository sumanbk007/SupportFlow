export const queryKeys = {
  auth: {
    profile: ["auth", "profile"],
  },

  workspace: {
    all: ["workspace"],
    detail: (id: string) => ["workspace", id],
  },

  users: {
    all: ["users"],
    detail: (id: string) => ["users", id],
  },
};
