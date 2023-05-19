import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SublyApi from "../../helpers/Api";
import { STATUS_CODES } from "../../utils/StatusCode";

const initialState = {
  bookmarkTotalCount: 0,
  bookmarkList: [],
  isLoading: false,
};

// Thunk for getting bookmark list
export const bookmarkListApi = createAsyncThunk(
  "bookmark/bookmarkListApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.getBookmarkList(
        data.userToken,
        data.requiredValue
      );
      return { response: response, loadmore: data.loadMore };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ====add or remove bookmark====
export const addBookmarkApi = createAsyncThunk(
  "addBookmark/addBookmarkApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.addBookmark(
        data.userToken,
        data.requestData
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bookmarkListApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(bookmarkListApi.fulfilled, (state, action) => {
      const response = action.payload.response;
      if (response.status_code == STATUS_CODES.SUCCESS) {
        // ===here managing load more functionality===
         if (action.payload.loadmore == true) {   
          state.bookmarkList = state.bookmarkList.concat(response.data.list);
        } else {
          state.bookmarkList = response.data.list;
        }
        state.bookmarkTotalCount = response.data.total_count;
      } else {
        state.bookmarkTotalCount = 0;
        state.bookmarkList = [];
      }
      state.isLoading = false;
    });
    builder.addCase(bookmarkListApi.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Cases while adding or removing bookmark
    builder.addCase(addBookmarkApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addBookmarkApi.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status_code == STATUS_CODES.SUCCESS) {
        state.isLoading = false;
      } else {
        state.isLoading = false;
      }
    });
    builder.addCase(addBookmarkApi.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export default bookmarkSlice.reducer;
