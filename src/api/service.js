import React from "react";

const Service = ({ children }) => {
  const sendData = (method, url, body = null) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.responseType = "json";
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.send(JSON.stringify(body));
    });
  };

  const getData = () => {
    sendData("POST", "https://jsonplaceholder.typicode.com/users", {
      name: "Anna",
      age: 27,
    })
      .then((data) => {
        console.log(data, 11);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <button onClick={getData}>{children}</button>;
};

export default Service;
