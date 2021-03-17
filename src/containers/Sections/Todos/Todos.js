import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";

import fbService from "api/fbService";
import Todo from "components/Todo/Todo";
import Button from "components/Button/Button";

import { reduxActionTypes } from "reducers/reduxActionTypes";
import { actionTypes } from "context/actionTypes";
import { AppContext } from "context/AppContext";

const limit = 8;
let startAt = 0;
const Todos = (props) => {
  const [state, setState] = useState({
    hasMore: true,
    loading: false,
    isOpen: false,
    titleValue: "",
    bodyValue: "",
  });

  const context = useContext(AppContext);

  useEffect(() => {
    if (!props.todos) {
      setState({
        loading: true,
      });
      fbService
        .getTodos(startAt, limit)
        .then((data) => {
          // context.dispatch({ type: actionTypes.SET_TODOS, payload: { todos: data } });
          props.setReduxPosts(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setState({
            loading: false,
          });
        });
    }
  }, []);

  const getMore = () => {
    setState({ loading: true }, () => {
      startAt = props.todos.length;
      fbService
        .getPosts(startAt, startAt + limit)
        .then((data) => {
          // this.context.dispatch({ type: actionTypes.GET_MORE_POSTS, payload: { posts: data } });
          props.getReduxPosts(data);
          setState({
            hasMore: data.length > limit,
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  };

  if (!props.todos) {
    return <div>Loading...</div>;
  }
  return (
    <div className="app-todos">
      {props.todos.map((todo) => {
        return <Todo key={todo.id} title={todo.title} />;
      })}
      {state.hasMore && (
        <Button onClick={getMore} disabled={state.loading}>
          {state.loading ? "Loading..." : "Get more"}
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = {
  setReduxPosts: (todos) => ({
    type: reduxActionTypes.SET_TODOS,
    payload: {
      todos: todos,
    },
  }),
  getReduxPosts: (todos) => ({
    type: reduxActionTypes.GET_MORE_TODOS,
    payload: {
      todos: todos,
    },
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
