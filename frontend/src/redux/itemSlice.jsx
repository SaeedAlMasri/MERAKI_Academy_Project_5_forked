import { createSlice } from "@reduxjs/toolkit";


const itemsSlice = createSlice({

    name:"items",
    initialState:{
        items:[],
        loading:false,
        categoryId:""
    },
    reducers:{
        setiItems: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            
          },
          addItems: (state, action) => {
            state.items.push(action.payload);
          },
          
          updateItems: (state, action) => {
            const index = state.items.findIndex(p => p._id === action.payload._id);
            if (index !== -1) {
              state.items[index] = action.payload;
            }
          },
        
          removeItems: (state, action) => {
            state.items = state.items.filter(p => p._id !== action.payload);
          },
          setLoading: (state) => {
            state.loading = true;
          },
          categoryIdFun:(state,action)=>{
            state.categoryId = action.payload
          }

    }

})

export const {setiItems,addItems,updateItems,removeItems,setLoading,categoryIdFun} = itemsSlice.actions
export default itemsSlice.reducer