const requestData = (method, url, data = null) => {
  return fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : null,
  }).then((response) => {
    if (response.status < 400) {
      return response.json();
    } else {
      throw new Error("Network Error");
    }
  });
};

const getAllPosts = () => {
  return requestData("GET", "https://jsonplaceholder.typicode.com/posts");
};
const updatePosts = (id, data) => {
  return requestData("PATCH", `https://jsonplaceholder.typicode.com/posts/${id}`, data);
};

export { getAllPosts, updatePosts };
