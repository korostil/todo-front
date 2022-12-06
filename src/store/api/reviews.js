import { todoAPIHeaders, todoAPIUrl } from "@/store/api/base";

const entity_url = todoAPIUrl + "/api/private/v1/reviews/";

export function createReview(body) {
  return fetch(entity_url, {
    method: "post",
    body: JSON.stringify(body),
    headers: todoAPIHeaders,
  });
}

export function readReviewList() {
  return fetch(entity_url, {
    method: "get",
    headers: todoAPIHeaders,
  });
}

export function readReview(id) {
  return fetch(entity_url + id + "/", {
    method: "get",
    headers: todoAPIHeaders,
  });
}

export function updateReview(id, body) {
  return fetch(entity_url + id + "/", {
    method: "put",
    body: JSON.stringify(body),
    headers: todoAPIHeaders,
  });
}
