import { createSlice } from "@reduxjs/toolkit";
import { EditorState } from "draft-js";

const emailInitialState = {
    subject: '',
    body: EditorState.createEmpty(),
}
export const emailSlice = createSlice({
    name: 'email',
    initialState: emailInitialState,
    reducers: {
        setEmailSubject: (state, action) => {
            state.subject = action.payload;
        },
        setEmailBody: (state, action) => {
            state.body = action.payload;
        },
        resetEmailComposition: (state) => {
            state.subject = '';
            state.body = EditorState.createEmpty();
        }
    }

})

export const emailActions = emailSlice.actions