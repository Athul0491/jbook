import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import bundle from "../../bundler/index";

interface BundleState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundleState = {};

const reducer = (state: BundleState = initialState, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        // state[action.payload.cellId] = {
        //   loading: true,
        //   code: "",
        //   err: "",
        // };
        // return state;
        draft[action.payload.cellId] = {
          loading: true,
          code: "",
          err: "",
        };
        break;
      case ActionType.BUNDLE_COMPLETE:
        draft[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        break;
      // default:
      //   return state;
    }
  });

export default reducer;
