import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSystemByGroup = createAsyncThunk('models/fetchSystemByGroup', async (groupName) => {
  const res = await axios.get(`http://localhost:5000/api/models/system/group/${groupName}`);
  return res.data;
});