import React from "react";

import "./Todo.scss";

const Todo = ({ title }) => {
  return (
    <div className="todo-component">
      <p>{title}</p>
    </div>
  );
};

export default Todo;
