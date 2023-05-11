import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SublyApi from '../../helpers/Api'
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
  classifiedFilterData:[],
  
}

// Thunk for your advert list
export const yourAdvertListApi = createAsyncThunk(
	"classified/yourAdvertListApi",
	async (data, { rejectWithValue }) => {
		try {
			const response = await SublyApi.getWebClassiFiedList(data.userToken, data.whereQuery);
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

export const getJobOfferListApi = createAsyncThunk(
	"jobtypes/getJobOfferListApi",
	async (data, { rejectWithValue }) => {
		try {
			const response = await SublyApi.getWebClassiFiedList(data.userToken, data.whereQuery);
			return response;
		} catch (error) {
      console.log("error", error)
			return rejectWithValue(error);
		}
	}
)


export const getJobSeekerListApi = createAsyncThunk(
	"jobtypes/getJobSeekerListApi",
	async (data, { rejectWithValue }) => {
		try {
			const response = await SublyApi.getWebClassiFiedList(data.userToken, data.whereQuery);
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
)

export const classifiedSlice = createSlice({
  name: 'classified',
  
  initialState,
  reducers: {
    setClassfiedType: (state, action) => {
      state.classifiedType = action.payload;
      
    },

    setClassifiedFilterData: (state, action) => {
      state.classifiedFilterData = action.payload;
    }
   

  },
  extraReducers: (builder) => {
    //web list
    builder.addCase(forSaleListApi.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(forSaleListApi.fulfilled, (state, action) => {
        const response = action.payload;
        if(response.status_code==STATUS_CODES.SUCCESS){
          state.forSaleTotalCount = response.data.total_count;
          state.forSaleWebList = response.data.list;
        }else{
          state.forSaleTotalCount = 0;
          state.forSaleWebList = [];
        }
        state.isLoading = false
    })
    builder.addCase(forSaleListApi.rejected, (state, action) => {
        state.isLoading = false
    })

    //your advert list
    builder.addCase(yourAdvertListApi.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(yourAdvertListApi.fulfilled, (state, action) => {
        const response = action.payload;
        if(response.status_code==STATUS_CODES.SUCCESS){
          state.yourAdvertTotalCount = response.data.total_count;
          state.yourAdvertWebList = response.data.list;
        }else{
          state.yourAdvertTotalCount = 0;
          state.yourAdvertWebList = [];
        }
        state.isLoading = false
    })
    builder.addCase(yourAdvertListApi.rejected, (state, action) => {
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
        state.wantedWebList = [];
        state.success = false;
      }
      state.isLoading = false
    })
    builder.addCase(getWantedListApi.rejected, (state, action) => {
        state.isLoading = false
    })

     // JobOffer list api
     builder.addCase(getJobOfferListApi.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getJobOfferListApi.fulfilled, (state, action) => {
      const response = action.payload;

      if (response.status_code === STATUS_CODES.SUCCESS) {
        state.jobOfferTotalCount = response.data.total_count;
        state.jobOfferWebList = response.data.list;
        state.success = true;
      } else {
        state.jobOfferTotalCount = 0;
        state.jobOfferWebList = [];
        state.success = false;
      }
      state.isLoading = false
    })
    builder.addCase(getJobOfferListApi.rejected, (state, action) => {
        state.isLoading = false
    })

     // JobSeeker list api
     builder.addCase(getJobSeekerListApi.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getJobSeekerListApi.fulfilled, (state, action) => {
      const response = action.payload;

      if (response.status_code === STATUS_CODES.SUCCESS) {
        state.jobSeekerTotalCount = response.data.total_count;
        state.jobSeekerWebList = response.data.list;
        state.success = true;
      } else {
        state.jobSeekerTotalCount = 0;
        state.jobSeekerWebList = [];
        state.success = false;
      }
      state.isLoading = false
    })
    builder.addCase(getJobSeekerListApi.rejected, (state, action) => {
        state.isLoading = false
    })
  },
})
export const { setClassfiedType,setClassifiedFilterData } = classifiedSlice.actions;
// export const { setClassifiedFilterData } = classifiedSlice.actions;
export default classifiedSlice.reducer