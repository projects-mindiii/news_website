import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SublyApi from "../../helpers/Api";
import { STATUS_CODES } from "../../utils/StatusCode";

const initialState = {
  searchTotalCount: 0,
  searchList: [],
  isLoading: false,
};

// Thunk for search list
export const searchListApi = createAsyncThunk(
  "searchbar/serachListApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.getWebSearchList(
        data.userToken,
        data.searchValues
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchData: (state, action) => {
      state.isLoading = false;
      state.searchTotalCount = 0;
      state.searchList = [];
    },
  },

  extraReducers: (builder) => {
    //search list
    builder.addCase(searchListApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchListApi.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status_code == STATUS_CODES.SUCCESS) {
        state.searchTotalCount = response.data.total_count;
        state.searchList = response.data.list;
      } else {
        state.searchTotalCount = 0;
        state.searchList = [];
      }
      state.isLoading = false;
    });
    builder.addCase(searchListApi.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export const { clearSearchData } = searchSlice.actions;
export default searchSlice.reducer;
