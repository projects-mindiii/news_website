import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SublyApi from '../../helpers/Api'

const initialState = {
  ClassifiedMetaList: {},
  isLoading: false,
}

// Thunk for getWeb list
export const getWebList = createAsyncThunk(
	"deals/getWebList",
	async (data, { rejectWithValue }) => {
		try {
			const response = await SublyApi.getWebClassiFiedList(data);
			return response;
		} catch (error) {
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
        const response = action.payload;
        if(response.status_code==200){
          state.categoryType = response.data;
         
        }else{
          state.categoryType = {};
         
        }
        state.isLoading = false
    })
    builder.addCase(getWebList.rejected, (state, action) => {
        state.isLoading = false
    })
  },
})
export default classifiedSlice.reducer