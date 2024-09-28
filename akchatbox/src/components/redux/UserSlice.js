import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        authUser: null,
        otherUser:[],
        selectedUser: {
            name: '',
            id: '',
        },
        onlineUsers: [],
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setOtherUser: (state, action) => {
            state.otherUser = action.payload;
        },
        selectedUser: (state, action) => {
            state.selectedUser = action.payload;

        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
    },
});

export const { setAuthUser,setOtherUser,selectedUser,setOnlineUsers } = userSlice.actions;
export default userSlice.reducer;