class Service {
  // const sendData = (method, url, body = null) => {
  //   return new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open(method, url);
  //     xhr.setRequestHeader("Content-type", "application/json");
  //     xhr.responseType = "json";
  //     xhr.onload = () => {
  //       resolve(xhr.response);
  //     };
  //     xhr.send(JSON.stringify(body));
  //   });
  // };

  // const getData = () => {
  //   sendData("POST", "https://jsonplaceholder.typicode.com/users", {
  //     name: "Anna",
  //     age: 27,
  //   })
  //     .then((data) => {
  //       console.log(data, 11);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // return <button onClick={getData}>{children}</button>;

  constructor() {
    this.baseUrl = "https://jsonplaceholder.typicode.com";
  }

  _request = (method, url, data = null) => {
    return fetch(`${this.baseUrl}${url}`, {
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

  getAllPosts = () => {
    return this._request("GET", "/posts");
  };
  updatePost = (id, data) => {
    return this._request("PATCH", `/posts/${id}`, data);
  };
}

const service = new Service();

export default service;
