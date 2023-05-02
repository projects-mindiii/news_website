import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SublyApi from '../../helpers/Api'

const initialState = {
  latestDeals: [],
  allDeals: [],
  isLoading: false,
}

// Thunk for get deal
export const getDealList = createAsyncThunk(
  "deals/getDealList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.getDealList(data);
      // console.log('getDealList called',response)

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const dealSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // deal login
    builder.addCase(getDealList.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getDealList.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status_code == 200) {
        state.allDeals = response.data;
        state.latestDeals = [...response.data.product_deal_count_list, ...response.data.service_deal_count_list];
      } else {
        state.latestDeals = [];
        state.allDeals = [];
      }
      state.isLoading = false
    })
    builder.addCase(getDealList.rejected, (state, action) => {
      state.isLoading = false
    })
  },
})
export default dealSlice.reducer