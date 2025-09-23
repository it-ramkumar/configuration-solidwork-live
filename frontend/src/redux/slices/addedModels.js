import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 addedModels : [], // ya {} if you're storing an object
};

const AddedModelsSlice = createSlice({
  name: 'addedModels',
  initialState,
  reducers: {
    setAddedModels: (state, action) => {
      state.addedModels = action.payload;
    },

    clearAddedModels: (state) => {
      state.addedModels = [];
    },
    setPartColor: (state, action) => {
  const { modelId, partId, color } = action.payload;
  const model = state.addedModels.find(m => m._id === modelId);
  if (model) {
    const part = model.parts.find(p => p.label === partId);
    if (part) {
      part.selectedColor = color;
    }
  }
},
  },
});

export const { setAddedModels, clearAddedModels, setPartColor } = AddedModelsSlice.actions;

export default AddedModelsSlice.reducer;
