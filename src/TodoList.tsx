/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Todo } from './types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  handleDelete: (id: number) => void;
  handleComplete: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleComplete,
  handleDelete,
}) => {
  const [editId, setEditId] = useState(0);
  const [loadingId, setLoadingId] = useState(0);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map(todo => {
        return (
          <React.Fragment key={todo.id}>
            <div
              data-cy="Todo"
              className={cn('todo', { completed: todo.completed })}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  onChange={() => handleComplete(todo.id)}
                  checked={todo.completed}
                />
              </label>

              {/* This form is shown instead of the title and remove button */}

              {editId === todo.id ? (
                <form>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value="Todo is being edited now"
                  />
                </form>
              ) : (
                <>
                  <span data-cy="TodoTitle" className="todo__title">
                    {todo.title}
                  </span>
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => handleDelete(todo.id)}
                  >
                    ×
                  </button>
                </>
              )}

              <div
                data-cy="TodoLoader"
                className={cn('modal', 'overlay', {
                  'is-active': todo.id === loadingId,
                })}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </section>
  );
};
