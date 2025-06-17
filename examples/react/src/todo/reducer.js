import {
  ADD_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM,
  REMOVE_ALL_ITEMS,
  TOGGLE_ALL,
  REMOVE_COMPLETED_ITEMS,
} from "./constants";

/* Borrowed from https://github.com/ai/nanoid/blob/3.0.2/non-secure/index.js
   License: MIT
   ... (deixo o mesmo texto da licença aqui para manter os créditos) ...
*/

// Alphabet otimizado para compressão gzip/brotli
const urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

function nanoid(size = 21) {
  let id = "";
  let i = size;

  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }

  return id;
}

export const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        {
          id: nanoid(),
          title: action.payload.title,
          completed: false,
        },
      ];

    case UPDATE_ITEM:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo
      );

    case REMOVE_ITEM:
      return state.filter((todo) => todo.id !== action.payload.id);

    case TOGGLE_ITEM:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case REMOVE_ALL_ITEMS:
      return [];

    case TOGGLE_ALL:
      return state.map((todo) =>
        todo.completed !== action.payload.completed
          ? { ...todo, completed: action.payload.completed }
          : todo
      );

    case REMOVE_COMPLETED_ITEMS:
      return state.filter((todo) => !todo.completed);

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
