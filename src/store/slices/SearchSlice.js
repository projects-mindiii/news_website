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
      return { response: response, loadmore: data.Loadmore };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  searchValue: null,
  reducers: {
    clearSearchData: (state, action) => {
      state.searchTotalCount = 0;
      state.searchList = [];
      state.searchValue = null;
    },

    storeSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },

  extraReducers: (builder) => {
    //search list
    builder.addCase(searchListApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchListApi.fulfilled, (state, action) => {
      const response = action.payload.response;
      if (response.status_code == STATUS_CODES.SUCCESS) {
        // ===here managing load more functionality===
        if (action.payload.loadmore == true) {
          state.searchList = state.searchList.concat(response.data.list);
        } else {
          state.searchList = response.data.list;
        }
        state.searchTotalCount = response.data.total_count;
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
export const { clearSearchData, storeSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
