import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import employeeReducer from "./employeeSlice";
import departmentReducer from "./departmentSlice"
import roleReducer from "./roleSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
    departments: departmentReducer,
    roles: roleReducer,
  },
});

export default store;
