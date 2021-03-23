import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import fbService from "api/fbService";
import Todo from "components/Todo/Todo";
import Button from "components/Button/Button";
import TodoModal from "components/TodoModal/TodoModal";
import {
  setReduxTodos,
  getReduxTodos,
  setTodosHasMore,
  updateTodo,
  checkTodo,
  deleteTodo,
} from "store/todo/action";

import "./Todos.scss";

const limit = 8;

const Todos = (props) => {
  const [state, setState] = useState({
    startAt: props.todos ? props.todos.length : 0,
    loading: false,
    isOpenEdit: false,
    isOpenCreate: false,
    activeItem: {},
  });

  useEffect(() => {
    if (!props.todos) {
      setState({
        ...state,
        loading: true,
      });

      props.setReduxTodos(state.startAt, limit);

      setState({
        ...state,
        loading: false,
      });
    }
    // eslint-disable-next-line
  }, []);

  const getMore = () => {
    setState({ ...state, loading: true });
    state.startAt = props.todos.length;
    props.getReduxTodos(state.startAt, state.startAt + limit);
    setState({ ...state, loading: false });
  };

  const deleteTodo = (id) => {
    fbService.fbServiceTodo.deleteTodo(id).then(() => {
      fbService.fbServiceTodo
        .getTodos(0, state.startAt !== 0 ? state.startAt + limit : limit)
        .then((res) => {
          props.deleteTodo(res);
        });
    });
  };

  const createTodo = () => {
    const { titleValue } = state;
    if (titleValue) {
      fbService.fbServiceTodo
        .createTodo({
          title: titleValue,
        })
        .then(() => {
          handleCloseCreate();
        });
    } else {
      alert("Fields are empty!");
    }
  };

  const updateTodo = (id) => {
    fbService.fbServiceTodo.updateTodo(state.activeItem).then((res) => {
      const updatedPost = {
        ...res,
      };
      setState({
        ...state,
        isOpenEdit: false,
      });
      if (props.todos && props.todos.some((el) => el.id === id)) {
        props.updateTodo(updatedPost);
      }
    });
  };

  const handleOpenEdit = (item) => {
    setState({
      ...state,
      isOpenEdit: true,
      activeItem: item,
    });
  };
  const handleOpenCreate = () => {
    setState({
      ...state,
      isOpenCreate: true,
    });
  };

  const handleCloseEdit = () => {
    setState({
      ...state,
      isOpenEdit: false,
      titleValue: "",
    });
  };
  const handleCloseCreate = () => {
    setState({
      ...state,
      isOpenCreate: false,
      titleValue: "",
    });
  };

  const handleCheckBox = (todo) => {
    fbService.fbServiceTodo.updateTodo({ ...todo, completed: !todo.completed }).then(() => {
      props.checkTodo(todo.id);
    });
  };

  if (!props.todos) {
    return <div>Loading...</div>;
  }
  return (
    <div className="app-todos">
      <div className="app-todos__todo-container">
        {props.todos.map((todo) => {
          return (
            <Todo
              className="app-todos__todo-container__todo"
              key={todo.id}
              title={todo.title}
              checked={todo.completed}
              onChangeCheckBox={() => handleCheckBox(todo)}
              onEdit={() => handleOpenEdit(todo)}
              onRemove={() => deleteTodo(todo.id)}
            />
          );
        })}
      </div>

      <TodoModal
        isOpen={state.isOpenEdit}
        handleClose={handleCloseEdit}
        action={() => updateTodo(state.activeItem.id)}
        titleValue={state.activeItem.title}
        changeValue={(e) => {
          setState({ ...state, activeItem: { ...state.activeItem, title: e.target.value } });
        }}
        buttonTitle="Save"
      />
      <TodoModal
        isOpen={state.isOpenCreate}
        handleClose={handleCloseCreate}
        action={createTodo}
        titleValue={state.titleValue}
        changeValue={(e) => {
          setState({ ...state, titleValue: e.target.value });
        }}
        buttonTitle="Save"
      />
      <Button onClick={handleOpenCreate} className="app-todos__create-button">
        Create Todo
      </Button>
      {props.todosHasMore && (
        <Button onClick={getMore} disabled={state.loading}>
          {state.loading ? "Loading..." : "Get more"}
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state.todo.todos,
    todosHasMore: state.todo.todosHasMore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { setReduxTodos, getReduxTodos, setTodosHasMore, updateTodo, checkTodo, deleteTodo },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
