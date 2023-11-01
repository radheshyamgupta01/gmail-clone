import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    inboxData:[],
    unread:0,
    getReq:true
}

const InboxReducer=createSlice({
    name:'Inbox',
    initialState:initialState,
    reducers:{
        changeInbox(state,action){
            state.inboxData=action.payload
        },
        updateUnread(state,action)
        {
            state.unread=action.payload
        },
        updateGet(state){
            state.getReq =! state.getReq
        }

    }
})

export const InboxActions = InboxReducer.actions

export default InboxReducer.reducer