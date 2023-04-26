import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserStage {
    isLoading: boolean,
    isOpenModal: boolean
}

const initialState: UserStage = {
    isLoading: false,
    isOpenModal: false
};

export const counterSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setOpenModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenModal = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {setLoading} = counterSlice.actions;

export default counterSlice.reducer;