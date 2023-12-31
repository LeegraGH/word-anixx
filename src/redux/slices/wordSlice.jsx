import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import useDictionaryService from "../../services/api/DictonaryService";

const initialState = {
    data: null,
    status: 'idle'
};

export const fetchWord = createAsyncThunk(
    "word/fetchWord",
    async ({ word, lang }) => {
        const { getDictionaryEntry } = useDictionaryService();
        return await getDictionaryEntry(word, lang);
    }
)

const wordSlice = createSlice({
    name: "word",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchWord.pending, (state) => { state.status = 'loading' })
            .addCase(fetchWord.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload;
            })
            .addCase(fetchWord.rejected, (state) => { state.status = 'error' })
            .addDefaultCase(() => { })
    }
});

const { reducer } = wordSlice;

export default reducer;