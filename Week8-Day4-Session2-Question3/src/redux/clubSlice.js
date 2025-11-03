import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchClubs = createAsyncThunk('clubs/fetchClubs', async () => {
    return ['Photography Club', 'Literarure Club', 'Tech Club'];
})

const initialState = {
    availableClubs: [],
    members: {},
    loading: false
};

const clubSlice = createSlice({
    name: 'clubs',
    initialState,
    reducers: {
        addMember: (state, action) => {
            console.log(action.payload);
            const {club, fullName, email, interest} = action.payload;
            if(!state.members[club]){
                state.members[club] = [];
            }
            console.log(state.members[club]);
            const emailExists = state.members[club].find(member => member.email === email);
            if(emailExists){
                return;
            }
            const newMember = {
                id : nanoid(),
                fullName,
                email,
                interest
            }
            state.members[club].push(newMember);
        },
        updateMember: (state, action) => {
            const {id, club, fullName, email, interest} = action.payload;
            const members = state.members[club];

            const index = members.findIndex((member) => member.id === id);
            if(index !== -1) {
                members[index] = {id, fullName, email, interest};
            }
        },
        removeMember: (state, action) => {
            const {club, id} = action.payload;
            
            if(state.members[club]) {
                state.members[club] = state.members[club].filter(member => member.id !== id);
            }
        },
        clearMembers: (state) => {
            state.members = {};
        }
    },
    extraReducers: async (builder) => {
        builder
            .addCase(fetchClubs.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchClubs.fulfilled, (state, action) => {
                state.loading = false;
                state.availableClubs = action.payload
            })
            .addCase(fetchClubs.rejected, (state, action) => {
                console.log(action, state);
            })
    }
})

export const { addMember, updateMember, removeMember, clearMembers } = clubSlice.actions;
export default clubSlice.reducer;