import { todoAPIHeaders, todoAPIUrl } from "@/store/api/base";

const entity_url = todoAPIUrl + "/api/private/v1/goals/";

export function createGoal(body) {
  return fetch(entity_url, {
    method: "post",
    body: JSON.stringify(body),
    headers: todoAPIHeaders,
  });
}

export function readGoalList({ archived = null, search = null }) {
  let url = entity_url;

  if (archived !== null && archived !== "null") {
    url.searchParams.set("archived", archived);
  }
  if (search !== null && search !== "null") {
    url.searchParams.set("search", search);
  }

  return fetch(url, {
    method: "get",
    headers: todoAPIHeaders,
  });
}

export function readGoal(id) {
  return fetch(entity_url + id + "/", {
    method: "get",
    headers: todoAPIHeaders,
  });
}

export function updateGoal(id, body) {
  return fetch(entity_url + id + "/", {
    method: "put",
    body: JSON.stringify(body),
    headers: todoAPIHeaders,
  });
}

export function deleteGoal(id) {
  return fetch(entity_url + id + "/", {
    method: "delete",
    headers: todoAPIHeaders,
  });
}
