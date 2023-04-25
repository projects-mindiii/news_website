import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SublyApi from '../../helpers/Api'
import { STATUS_CODES } from "../../utils/StatusCode";

const initialState = {
  forSaleTotalCount: 0,
  forSaleWebList: {},
  wantedWebList: {},
  wantedTotalCount: 0,
  isLoading: false,
}

// Thunk for getWeb list
export const forSaleListApi = createAsyncThunk(
	"classified/forSaleListApi",
	async (data, { rejectWithValue }) => {
    console.log("data", data)
		try {
			const response = await SublyApi.getWebClassiFiedList(data.userToken, data.whereQuery);
			return response;
		} catch (error) {
      console.log("error", error)
			return rejectWithValue(error);
		}
	}
);

export const getWantedListApi = createAsyncThunk(
	"classified/getWantedListApi",
	async (data, { rejectWithValue }) => {
		try {
			const response = await SublyApi.getWebClassiFiedList(data.userToken, data.whereQuery);
			return response;
		} catch (error) {
      console.log("error", error)
			return rejectWithValue(error);
		}
	}
);

export const classifiedSlice = createSlice({
  name: 'classified',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
   //web list
    builder.addCase(forSaleListApi.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(forSaleListApi.fulfilled, (state, action) => {
        const response = action.payload;
        if(response.status_code==200){
          state.forSaleTotalCount = response.data.total_count;
          state.forSaleWebList = response.data.list;
        }else{
          state.forSaleTotalCount = {};
        }
        state.isLoading = false
    })
    builder.addCase(forSaleListApi.rejected, (state, action) => {
        state.isLoading = false
    })

    // wanted list api
    builder.addCase(getWantedListApi.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getWantedListApi.fulfilled, (state, action) => {
      const response = action.payload;

      if (response.status_code === STATUS_CODES.SUCCESS) {
        state.wantedTotalCount = response.data.total_count;
        state.wantedWebList = response.data.list;
        state.success = true;
      } else {
        state.wantedTotalCount = 0;
        state.wantedWebList = {};
        state.success = false;
      }
      state.isLoading = false
    })
    builder.addCase(getWantedListApi.rejected, (state, action) => {
        state.isLoading = false
    })
  },
})
export default classifiedSlice.reducer