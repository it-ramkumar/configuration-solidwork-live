import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExteriorByGroup = createAsyncThunk('models/fetchExteriorByGroup', async (groupName) => {
  const res = await axios.get(`http://localhost:5000/api/models/exterior/group/${groupName}`);
  return res.data;
});