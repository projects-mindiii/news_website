import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SublyApi from "../../helpers/Api";
import { STATUS_CODES } from "../../utils/StatusCode";

const initialState = {
  bookMarkTotalCount: 0,
  bookMarkList: [],
  isLoading: false,
};

// Thunk for getWeb list
export const bookMarkListApi = createAsyncThunk(
  "bookMark/bookMarkListApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.getBookMarkList(
        data.userToken,
        data.requiredValue
      );
      return { response: response, loadmore: data.loadMore };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addBookMarkApi = createAsyncThunk(
  "addBookMark/addBookMarkApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.addBookMark(
        data.userToken,
        data.requestData
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const bookMarkSlice = createSlice({
  name: "bookMark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bookMarkListApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(bookMarkListApi.fulfilled, (state, action) => {
      const response = action.payload.response;
      if (response.status_code == STATUS_CODES.SUCCESS) {
        if (action.payload.loadmore == true) {
          state.bookMarkList = state.bookMarkList.concat(response.data.list);
        } else {
          state.bookMarkList = response.data.list;
        }
        state.bookMarkTotalCount = response.data.total_count;
      } else {
        state.bookMarkTotalCount = 0;
        state.bookMarkList = [];
      }
      state.isLoading = false;
    });
    builder.addCase(bookMarkListApi.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Cases while adding or removing bookmark
    builder.addCase(addBookMarkApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addBookMarkApi.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status_code == STATUS_CODES.SUCCESS) {
        state.isLoading = false;
      } else {
        state.isLoading = false;
      }
    });
    builder.addCase(addBookMarkApi.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export default bookMarkSlice.reducer;
