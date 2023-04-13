import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SublyApi from '../../helpers/Api'

const initialState = {
  currentUser: {},
  isLoading: false,
  userToken:null,
  success:false,
  message:false,
  error: null,
}

// Thunk for user login
export const userLogin = createAsyncThunk(
	"user/userLogin",
	async (data, { rejectWithValue }) => {
		try {
			const response = await SublyApi.loginProcess(data);
      console.log('userLogin responseresponse',response)
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state, action) => {
      state.currentUser = {};
      state.userToken = null;
    }
  },
  extraReducers: (builder) => {
    // user login
    builder.addCase(userLogin.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log('fulfilled action',action)
        const response = action.payload;
      console.log('response response',response)

        if(response.status_code==200){
          state.currentUser = response.data;
          state.userToken = response.data.token;
          state.success = true;
        }else{
          state.currentUser = {};
          state.userToken = null;
          state.success = false;
        }
        state.isLoading = false
    })
    builder.addCase(userLogin.rejected, (state, action) => {
        console.log('rejected action',action)
        state.isLoading = false
        state.error = action.error.message
    })
  },
})
export const { userLogout } = userSlice.actions;
export default userSlice.reducer