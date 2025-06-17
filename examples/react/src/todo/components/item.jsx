import React, { memo, useState, useCallback } from "react";
import classnames from "classnames";

import { Input } from "./input";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";

export const Item = memo(function Item({ todo, dispatch }) {
  const [isWritable, setIsWritable] = useState(false);
  const { title, completed, id } = todo;

  const toggleItem = useCallback(() => dispatch({ type: TOGGLE_ITEM, payload: { id } }), [dispatch, id]);
  const removeItem = useCallback(() => dispatch({ type: REMOVE_ITEM, payload: { id } }), [dispatch, id]);
  const updateItem = useCallback(
    (title) => {
      if (title.length === 0) removeItem();
      else dispatch({ type: UPDATE_ITEM, payload: { id, title } });
      setIsWritable(false);
    },
    [dispatch, id, removeItem]
  );

  const handleDoubleClick = useCallback(() => setIsWritable(true), []);
  const handleBlur = useCallback(() => setIsWritable(false), []);

  return (
    <li className={classnames({ completed })} data-testid="todo-item">
      <div className="view">
        {isWritable ? (
          <Input onSubmit={updateItem} label="Edit Todo Input" defaultValue={title} onBlur={handleBlur} />
        ) : (
          <>
            <input
              className="toggle"
              type="checkbox"
              data-testid="todo-item-toggle"
              checked={completed}
              onChange={toggleItem}
            />
            <label data-testid="todo-item-label" onDoubleClick={handleDoubleClick}>
              {title}
            </label>
            <button className="destroy" data-testid="todo-item-button" onClick={removeItem} />
          </>
        )}
      </div>
    </li>
  );
});
