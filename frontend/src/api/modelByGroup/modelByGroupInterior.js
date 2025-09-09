import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInteriorByGroup = createAsyncThunk('models/fetchInteriorByGroup', async (groupName) => {
  const res = await axios.get(`http://localhost:5000/api/models/interior/group/${groupName}`);
  return res.data;
});