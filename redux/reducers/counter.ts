import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { UseDispatch, useSelector, Provider } from 'react-redux'


const initialState = {
  count: 0,
}


const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increment:(state)=>{
            state.count++
        },
        decrement:(state)=>{
            state.count--
        },
        incrementByvalue:(state, action:PayloadAction<number>)=>{
            state.count+=action.payload;
        }
        
    },
    extraReducers:(builder)=>{
        builder.addCase(incrementAsync.pending,()=> console.log("incrementAsync pending"))
        .addCase(incrementAsync.fulfilled,(state,action)=>{
            state.count+=action.payload;
        })
    }
});
export const incrementAsync= createAsyncThunk(
    "counter/incrementAsync", async(amount:number) => {
        await new Promise(resolve=> setTimeout(resolve, 1000))
        return amount;
    }
)
export const {increment,decrement, incrementByvalue} = counterSlice.actions;
export default counterSlice.reducer;