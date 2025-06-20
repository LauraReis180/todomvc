import React, { useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { Item } from "./item";
import classnames from "classnames";

import { TOGGLE_ALL } from "../constants";

export const Main = React.memo(function Main({ todos, dispatch }) {
  const { pathname: route } = useLocation();

  const visibleTodos = useMemo(() => {
    if (route === "/active") return todos.filter(({ completed }) => !completed);
    if (route === "/completed") return todos.filter(({ completed }) => completed);
    return todos;
  }, [todos, route]);

  const toggleAll = useCallback(
    (e) => dispatch({ type: TOGGLE_ALL, payload: { completed: e.target.checked } }),
    [dispatch]
  );

  return (
    <main className="main" data-testid="main">
      {visibleTodos.length > 0 && (
        <div className="toggle-all-container">
          <input
            className="toggle-all"
            type="checkbox"
            id="toggle-all"
            data-testid="toggle-all"
            checked={visibleTodos.every(({ completed }) => completed)}
            onChange={toggleAll}
          />
          <label className="toggle-all-label" htmlFor="toggle-all">
            Toggle All Input
          </label>
        </div>
      )}

      <ul className={classnames("todo-list")} data-testid="todo-list">
        {visibleTodos.map((todo, index) => (
          <Item todo={todo} key={todo.id} dispatch={dispatch} index={index} />
        ))}
      </ul>
    </main>
  );
});
