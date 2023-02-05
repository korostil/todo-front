import { todoAPIHeaders, todoAPIUrl } from "@/store/api/base";

const entity_url = new URL(todoAPIUrl + "/api/private/v1/projects/");

export function createProject(body) {
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

export function readProjectList({ archived = null, search = null }) {
  let url = entity_url;

  if (archived !== null && archived !== "null") {
    url.searchParams.set("archived", (archived === "archived").toString());
  }
  if (search !== null && search !== "null") {
    url.searchParams.set("search", search);
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

export function readProject(id) {
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

export function updateProject(id, body) {
  return fetch(entity_url + id + "/", {
    method: "put",
    body: JSON.stringify(body),
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

export function archiveProject(id) {
  return fetch(entity_url + id + "/archive/", {
    method: "post",
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

export function restoreProject(id) {
  return fetch(entity_url + id + "/restore/", {
    method: "post",
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

export function deleteProject(id) {
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
