import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk('/courses/fetchCourses', async () => {
    console.log('in fetch');
    return ['React JS', 'Java Fullstack', 'Data Science']
})

const initialState = {
    availableCourses: [],
    enrollments: {},
    loading: false
}


const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        enrollMember: (state, action) => {
            const { course, newMember } = action.payload;
            // console.log(action.payload);
            if (!state.enrollments[course]) {
                state.enrollments[course] = []
            }

            if (state.enrollments[course].some(mem => mem.name === newMember.name)) {
                alert('Same user not allowed')
                return;
            }
            state.enrollments[course].push(newMember)
            console.log(current(state));
        },
        editMember: (state, action) => {

        },
        deleteMember: (state, action) => {
            const {id, course} = action.payload
            const index = state.enrollments[course].findIndex((user)=> user.id === id)
            if(index !== -1){
                state.enrollments[course].splice(index, 1)
            }
        }

    },
    extraReducers: async (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                // console.log(current(state));
                state.loading = true
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.availableCourses = action.payload
                state.loading = false
            })
    }
})
export const { enrollMember, editMember, deleteMember } = courseSlice.actions
export default courseSlice.reducer
