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
    extraReducers: (builder) => {
        builder.addCase(fetchAddEmployee.pending, (state, action) => {
            state.addEmployeeLoading = true;
        })
        builder.addCase(fetchAddEmployee.fulfilled, (state, action) => {
            state.addEmployeeLoading = false;
            state.employeesData.push(action.payload);
        })
        builder.addCase(fetchAddEmployee.rejected, (state, action) => {
            state.addDetailsLoading = false;
            state.addDetailsError = action.payload
        })
        builder.addCase(fetchUpdateEmployee.pending, (state, action) => {

        })
        builder.addCase(fetchUpdateEmployee.fulfilled, (state, action) => {

        })
        builder.addCase(fetchUpdateEmployee.rejected, (state, action) => {

        })
    },
});

export default employeeSlice.reducer;