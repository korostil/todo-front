import { todoAPIHeaders, todoAPIUrl, useFetch } from "@/store/api/base";
import { ref } from "vue";

const entity_url = new URL(todoAPIUrl + "/api/private/v1/projects/");

export const projects = ref([]);

export function createProject(body) {
  return fetch(entity_url, {
    method: "post",
    body: JSON.stringify(body),
    headers: todoAPIHeaders,
  })
    .then((response) => {
      if (response.status !== 201) {
        const error = new Error(response.statusText);
        error.json = response.json();
        throw error;
      }
      return response.json();
    })
    .then((json) => {
      projects.value.push(json.data);
      return json;
    });
}

export function readProjectList({ force = false }) {
  let url = new URL(todoAPIUrl + "/api/private/v1/projects/");

  if (projects.value.length !== 0 && !force)
    return { data: projects, error: ref(null) };

  return useFetch(url);
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
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        error.json = response.json();
        throw error;
      }
      return response.json();
    })
    .then((json) => {
      projects.value.splice(findProjectIndex(id), 1, json.data);
      return json;
    });
}

export function archiveProject(id) {
  return fetch(entity_url + id + "/archive/", {
    method: "post",
    headers: todoAPIHeaders,
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        error.json = response.json();
        throw error;
      }
      return response.json();
    })
    .then((json) => {
      projects.value.splice(findProjectIndex(id), 1, json.data);
      return json;
    });
}

export function restoreProject(id) {
  return fetch(entity_url + id + "/restore/", {
    method: "post",
    headers: todoAPIHeaders,
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        error.json = response.json();
        throw error;
      }
      return response.json();
    })
    .then((json) => {
      projects.value.splice(findProjectIndex(id), 1, json.data);
      return json;
    });
}

export function deleteProject(id) {
  return fetch(entity_url + id + "/", {
    method: "delete",
    headers: todoAPIHeaders,
  })
    .then((response) => {
      if (response.status !== 204) {
        const error = new Error(response.statusText);
        error.json = response.json();
        throw error;
      }
    })
    .then((json) => {
      projects.value.splice(findProjectIndex(id), 1);
      return json;
    });
}

export function findProjectIndex(projectId) {
  return projects.value.findIndex((project) => project.id === projectId);
}
