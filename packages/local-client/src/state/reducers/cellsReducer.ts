import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import produce from "immer";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (state: CellsState = initialState, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        draft.data[id].content = content;
        break;
      case ActionType.DELETE_CELL:
        delete draft.data[action.payload];
        draft.order = state.order.filter((id) => id !== action.payload);
        break;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          // return state;
          break;
        }
        draft.order[index] = state.order[targetIndex];
        draft.order[targetIndex] = action.payload.id;
        // return state;
        break;
      case ActionType.INSERT_CELL_AFTER:
        const cell: Cell = {
          content: "",
          type: action.payload.type,
          id: randomId(),
        };

        draft.data[cell.id] = cell;
        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );
        if (foundIndex < 0) {
          draft.order.unshift(cell.id);
        } else {
          draft.order.splice(foundIndex + 1, 0, cell.id);
        }
        // return state;
        break;
      // default:
      // return state;
    }
  });

const randomId = () => {
  return Math.random().toString(36).substring(2, 6);
};

export default reducer;
