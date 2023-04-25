import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SublyApi from '../../helpers/Api'

const initialState = {
  classifiedTotalCount: {},
  classifiedWebList: {},
  isLoading: false,
}

// Thunk for getWeb list
export const getWebList = createAsyncThunk(
	"classified/getWebList",
	async (data, { rejectWithValue }) => {
    console.log("data", data)
		try {
			const details = await SublyApi.getWebClassiFiedList(data.userToken, data.classifiedValue);
      console.log("detail", details)
			return details;
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
    builder.addCase(getWebList.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(getWebList.fulfilled, (state, action) => {
        const details = action.payload;
        console.log("detail", details)
        if(details.status_code==200){
          state.classifiedTotalCount = details.data.total_count;
          state.classifiedWebList = details.data.list;
         
         
        }else{
          state.classifiedTotalCount = {};
         
        }
        state.isLoading = false
    })
    builder.addCase(getWebList.rejected, (state, action) => {
        state.isLoading = false
    })
  },
})
export default classifiedSlice.reducer