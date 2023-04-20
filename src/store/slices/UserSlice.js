import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SublyApi from '../../helpers/Api'
import { STATUS_CODES } from "../../utils/StatusCode";

const initialState = {
  guestUser: {},
  currentUser: {},
  sessionExpire: "",
  isLoading: false,
  userToken: null,
  success: false,
  message: false,
  error: null,
}

// Thunk for user login
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.loginProcess(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for guest user
export const guestUserLogin = createAsyncThunk(
  "user/guestUserLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.guestUserLogin();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for social login
export const isSocialLogin = createAsyncThunk(
  "user/isSocialLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.checkSocialLogin(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for Social Signup login
export const socialSignup = createAsyncThunk(
  "user/socialSignup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.socialSignup(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


// Thunk for user profile detail get
export const userDetails = createAsyncThunk(
  "user/userDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.userProfile(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for user profile update
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.updateProfile(data.requestData, data.userToken);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// manage user login session 
const userSessionLogin = (state, response) => {
  if (response.status_code === STATUS_CODES.SUCCESS) {
    state.currentUser = response.data;
    state.userToken = response.data.token;
    state.success = true;
  } else {
    state.currentUser = {};
    state.userToken = null;
    state.success = false;
  }
  state.isLoading = false
};

// manage user session expire
export const isUserSessionExpire = (state, response) => {
  if (response.status_code === STATUS_CODES.INVALID_TOKEN) {
    state.sessionExpire = response.data.message;
    state.currentUser = {};
    state.guestUser = {};
    state.userToken = null;
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state, action) => {
      state.currentUser = {};
      state.guestUser = {};
      state.userToken = null;
    }
  },
  extraReducers: (builder) => {
    // guest user login
    builder.addCase(guestUserLogin.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status_code === STATUS_CODES.SUCCESS) {
        state.guestUser = response.data;
        state.userToken = response.data.token;
        state.success = true;
      } else {
        state.guestUser = {};
        state.userToken = null;
        state.success = false;
      }
    })

    // user login
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(userLogin.fulfilled, (state, action) => {
      const response = action.payload;
      userSessionLogin(state, response);
    })
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    // social signup
    builder.addCase(socialSignup.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(socialSignup.fulfilled, (state, action) => {
      const response = action.payload;
      userSessionLogin(state, response);
    })
    builder.addCase(socialSignup.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    // check social login
    builder.addCase(isSocialLogin.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(isSocialLogin.fulfilled, (state, action) => {
      const response = action.payload;
      userSessionLogin(state, response);
    })
    builder.addCase(isSocialLogin.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

     // check get user detail
     builder.addCase(userDetails.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(userDetails.fulfilled, (state, action) => {
      const response = action.payload;
      isUserSessionExpire(state, response);
    })
    builder.addCase(userDetails.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    // check update profile 
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      const response = action.payload;
      isUserSessionExpire(state, response);
    })
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })


  },
})
export const { userLogout } = userSlice.actions;
export default userSlice.reducer