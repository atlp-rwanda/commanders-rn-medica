import { supabase } from "@/app/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getReview = createAsyncThunk(
  "doctors/getReview",
  async (doctorId:string, { dispatch }) => {
    try {
    
let { data: reviews, error } = await supabase
.from('reviews')
.select('*')
.eq("doctorId",doctorId)
if (error) {
    console.error("Error fetching data:", error);
  }
  else {
    // console.log("Reviews:----->", reviews);
    return reviews;
  }
  
    } catch (error) {
  
    }});