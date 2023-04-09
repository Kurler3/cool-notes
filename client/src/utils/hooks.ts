import type { ActionCreator, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import {
    useDispatch
} from "react-redux";

export const useActionDispatch = (
    action: ActionCreatorWithoutPayload | ActionCreator<any>,
    payload?: any,
) => {
    const dispatch = useDispatch();

    if (typeof action === 'function' && 'type' in action) {
        if (typeof payload !== 'undefined') {
          return dispatch(action(payload));
        }
        return dispatch(action());
    }

    return;
}