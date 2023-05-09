import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SublyApi from '../../helpers/Api'
import { STATUS_CODES } from "../../utils/StatusCode";

const initialState = {
    bookMarkTotalCount: 0,
    bookMarkList: [],
    isLoading: false,
  }


  // Thunk for getWeb list
export const bookMarkListApi = createAsyncThunk(
	"bookMark/bookMarkListApi",
	async (data, { rejectWithValue }) => {
    console.log("data", data)
		try {
			const response = await SublyApi.getBookMarkList(data.userToken, data.requiredValue);
            console.log("responseBookMark", response)
			return response;
		} catch (error) {
      console.log("error", error)
			return rejectWithValue(error);
		}
	}
);

export const bookMarkSlice = createSlice({
    name: 'bookMark',
    initialState,
    reducers: {
  
    },
    extraReducers: (builder) => {
      builder.addCase(bookMarkListApi.pending, (state) => {
        state.isLoading = true
      })
      builder.addCase(bookMarkListApi.fulfilled, (state, action) => {
        const response = action.payload;
        if (response.status_code == 200) {
          state.bookMarkList = response.data;
          console.log("responseBookMarkData", response.data)
        } else {
          state.bookMarkTotalCount = 0;
          state.bookMarkList = [];
        }
        state.isLoading = false
      })
      builder.addCase(bookMarkListApi.rejected, (state, action) => {
        state.isLoading = false
      })
    },
  })
  export default bookMarkSlice.reducer