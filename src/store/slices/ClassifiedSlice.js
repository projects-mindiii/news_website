import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SublyApi from "../../helpers/Api";
import { STATUS_CODES } from "../../utils/StatusCode";

const initialState = {
  yourAdvertTotalCount: 0,
  yourAdvertWebList: [],
  forSaleTotalCount: 0,
  forSaleWebList: [],
  wantedTotalCount: 0,
  wantedWebList: [],
  jobOfferTotalCount: 0,
  jobOfferWebList: [],
  jobSeekerTotalCount: 0,
  jobSeekerWebList: [],
  classifiedType: 4,
  isLoading: false,
  classifiedTotalCount: 0,
  classifiedFilterValues: {
    name: "All South Africa",
    refrenceType: "1",
    refrenceId: "all",
    countryId: "0",
    city: "",
  },
};

// Thunk for your advert list
export const yourAdvertListApi = createAsyncThunk(
  "classified/yourAdvertListApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.getWebClassiFiedList(
        data.userToken,
        data.whereQuery
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for for sale classfied list
export const forSaleListApi = createAsyncThunk(
  "classified/forSaleListApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.getWebClassiFiedList(
        data.userToken,
        data.whereQuery
      );
      return { response: response, loadmore: data.loadmore };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for for wanted classfied list
export const getWantedListApi = createAsyncThunk(
  "classified/getWantedListApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.getWebClassiFiedList(
        data.userToken,
        data.whereQuery
      );
      return { response: response, loadmore: data.loadmore };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for for job classfied list
export const getJobOfferListApi = createAsyncThunk(
  "jobtypes/getJobOfferListApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.getWebClassiFiedList(
        data.userToken,
        data.whereQuery
      );
      return { response: response, loadmore: data.loadmore };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for for job seeker classfied list
export const getJobSeekerListApi = createAsyncThunk(
  "jobtypes/getJobSeekerListApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SublyApi.getWebClassiFiedList(
        data.userToken,
        data.whereQuery
      );
      return { response: response, loadmore: data.loadmore };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const classifiedSlice = createSlice({
  name: "classified",

  initialState,
  reducers: {
    setJobOfferTotalCount: (state, action) => {
      state.jobOfferTotalCount = action.payload;
    },
    setJobSeekerTotalCount: (state, action) => {
      state.jobSeekerCount = action.payload;
    },
    setClassfiedType: (state, action) => {
      state.classifiedType = action.payload;
    },
    setClassifiedFilterName: (state, action) => {
      state.classifiedFilterValues = action.payload;
    },
  },

  extraReducers: (builder) => {
    //your advert list
    builder.addCase(yourAdvertListApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(yourAdvertListApi.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status_code == STATUS_CODES.SUCCESS) {
        state.yourAdvertTotalCount = response.data.total_count;
        state.yourAdvertWebList = response.data.list;
      } else {
        state.yourAdvertTotalCount = 0;
        state.yourAdvertWebList = [];
      }
      state.isLoading = false;
    });
    builder.addCase(yourAdvertListApi.rejected, (state, action) => {
      state.isLoading = false;
    });

    //Forsale list api
    builder.addCase(forSaleListApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forSaleListApi.fulfilled, (state, action) => {
      const response = action.payload.response;
      if (response.status_code == STATUS_CODES.SUCCESS) {
        if (action.payload.loadmore == true) {
          state.forSaleWebList = state.forSaleWebList.concat(
            response.data.list
          );
        } else {
          state.forSaleWebList = response.data.list;
        }
        state.forSaleTotalCount = response.data.total_count;
      } else {
        state.forSaleTotalCount = 0;
        state.forSaleWebList = [];
      }
      state.isLoading = false;
    });
    builder.addCase(forSaleListApi.rejected, (state, action) => {
      state.isLoading = false;
    });

    // wanted list api
    builder.addCase(getWantedListApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWantedListApi.fulfilled, (state, action) => {
      const response = action.payload.response;
      if (response.status_code === STATUS_CODES.SUCCESS) {
        if (action.payload.loadmore == true) {
          state.wantedWebList = state.wantedWebList.concat(response.data.list);
        } else {
          state.wantedWebList = response.data.list;
        }
        state.wantedTotalCount = response.data.total_count;
        state.success = true;
      } else {
        state.wantedTotalCount = 0;
        state.wantedWebList = [];
        state.success = false;
      }
      state.isLoading = false;
    });
    builder.addCase(getWantedListApi.rejected, (state, action) => {
      state.isLoading = false;
    });

    // JobOffer list api
    builder.addCase(getJobOfferListApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJobOfferListApi.fulfilled, (state, action) => {
      const response = action.payload.response;
      if (response.status_code === STATUS_CODES.SUCCESS) {
        if (action.payload.loadmore == true) {
          state.jobOfferWebList = state.jobOfferWebList.concat(
            response.data.list
          );
        } else {
          state.jobOfferWebList = response.data.list;
        }
        state.jobOfferTotalCount = response.data.total_count;
        state.success = true;
      } else {
        state.jobOfferTotalCount = 0;
        state.jobOfferWebList = [];
        state.success = false;
      }
      state.isLoading = false;
    });
    builder.addCase(getJobOfferListApi.rejected, (state, action) => {
      state.isLoading = false;
    });

    // JobSeeker list api
    builder.addCase(getJobSeekerListApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJobSeekerListApi.fulfilled, (state, action) => {
      const response = action.payload.response;
      if (response.status_code === STATUS_CODES.SUCCESS) {
        if (action.payload.loadmore == true) {
          state.jobSeekerWebList = state.jobSeekerWebList.concat(
            response.data.list
          );
        } else {
          state.jobSeekerWebList = response.data.list;
        }
        state.jobSeekerTotalCount = response.data.total_count;
        state.success = true;
      } else {
        state.jobSeekerTotalCount = 0;
        state.jobSeekerWebList = [];
        state.success = false;
      }
      state.isLoading = false;
    });
    builder.addCase(getJobSeekerListApi.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export const {
  setClassifiedFilterName,
  setClassfiedType,
  setJobOfferTotalCount,
  setJobSeekerTotalCount,
} = classifiedSlice.actions;

export default classifiedSlice.reducer;
