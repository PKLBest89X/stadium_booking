import { createSlice } from '@reduxjs/toolkit';
import { fetchAddEmployee, fetchUpdateEmployee } from '../../../../middlewares/stadiumUser/fetchCRUDEmployee/fetchCRUDEmployee';

const initialState = {
    addEmployeeLoading: false,
    employeesData: [],
    addEmployeeError: null
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAddEmployee.pending]: (state, action) => {
            state.addEmployeeLoading = true;
        },
        [fetchAddEmployee.fulfilled]: (state, action) => {
            state.addEmployeeLoading = false;
            state.employeesData.push(action.payload);
        },
        [fetchAddEmployee.rejected]: (state, action) => {
            state.addDetailsLoading = false;
            state.addDetailsError = action.payload
        },
        [fetchUpdateEmployee.pending]: (state, action) => {

        },
        [fetchUpdateEmployee.fulfilled]: (state, action) => {

        },
        [fetchUpdateEmployee.rejected]: (state, action) => {

        },
    },
});

export default employeeSlice.reducer;