import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const FetchCandidates = createAsyncThunk('candidates/FetchCandidates', async () => {
  try {
    const res = await axios.get('http://localhost:8080/candidates');
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const FetchSingleCandidate = createAsyncThunk(
  'candidates/FetchSingleCandidate',
  async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/candidates/${id}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const AddCandidate = createAsyncThunk('candidates/AddCandidate', async (newData) => {
  try {
    const res = await axios.post('http://localhost:8080/candidates', newData);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState: {
    loading: false,
    error: '',
    candidates: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchCandidates.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(FetchCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = action.payload;
      })
      .addCase(FetchCandidates.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(FetchSingleCandidate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(FetchSingleCandidate.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = [action.payload];
      })
      .addCase(FetchSingleCandidate.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(AddCandidate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(AddCandidate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(AddCandidate.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default candidatesSlice.reducer;
