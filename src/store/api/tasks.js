import { todoAPIHeaders, todoAPIUrl } from "@/store/api/base";

const entity_url = new URL(todoAPIUrl + "/api/private/v1/tasks/");

export function createTask(body) {
  return fetch(entity_url, {
    method: "post",
    body: JSON.stringify(body),
    headers: todoAPIHeaders,
  }).then((response) => {
    if (response.status !== 201) {
      const error = new Error(response.statusText);
      error.json = response.json();
      throw error;
    }
    return response.json();
  });
}

export function readTaskList({
  completed = null,
  search = null,
  space = null,
}) {
  let url = entity_url;
  // TODO find a right way to check null value
  if (completed !== null && completed !== "null") {
    url.searchParams.set("completed", completed);
  }
  if (search !== null && search !== "null") {
    url.searchParams.set("search", search);
  }
  if (space !== null && space !== "null") {
    url.searchParams.set("space", space);
  }

  return fetch(url, {
    method: "get",
    headers: todoAPIHeaders,
  }).then((response) => {
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.json = response.json();
      throw error;
    }
    return response.json();
  });
}

export function readTodayTaskList() {
  let url = entity_url + "today/";

  return fetch(url, {
    method: "get",
    headers: todoAPIHeaders,
  }).then((response) => {
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.json = response.json();
      throw error;
    }
    return response.json();
  });
}

export function readTask(id) {
  return fetch(entity_url + id + "/", {
    method: "get",
    headers: todoAPIHeaders,
  }).then((response) => {
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.json = response.json();
      throw error;
    }
    return response.json();
  });
}

export function updateTask(id, body) {
  return fetch(entity_url + id + "/", {
    method: "put",
    body: JSON.stringify(body),
    headers: todoAPIHeaders,
  }).then((response) => {
    if (response.status !== 200) {
      const error = new Error(response.statusText);
      error.json = response.json();
      throw error;
    }
    return response.json();
  });
}

export function deleteTask(id) {
  return fetch(entity_url + id + "/", {
    method: "delete",
    headers: todoAPIHeaders,
  }).then((response) => {
    if (response.status !== 204) {
      const error = new Error(response.statusText);
      error.json = response.json();
      throw error;
    }
  });
}

export function completeTask(id) {
  return fetch(entity_url + id + "/complete/", {
    method: "post",
    headers: todoAPIHeaders,
  }).then((response) => {
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.json = response.json();
      throw error;
    }
  });
}

export function reopenTask(id) {
  return fetch(entity_url + id + "/reopen/", {
    method: "post",
    headers: todoAPIHeaders,
  }).then((response) => {
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.json = response.json();
      throw error;
    }
  });
}
