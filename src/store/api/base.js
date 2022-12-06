export const todoAPIUrl = import.meta.env.VITE_TODO_API_URL,
  todoAPIHeaders = {
    "content-type": "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TODO_API_TOKEN,
  };
