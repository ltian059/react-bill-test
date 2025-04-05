import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const billSlice = createSlice({
  name: "billList",
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList: (state, action) => {
      state.billList = action.payload;
    },
  },
});

//获取bill列表actionCreator，异步逻辑
const fetchBillList = () => {
  return async (dispatch) => {
    const URL = "http://localhost:8888/ka";
    const res = await axios.get(URL);
    dispatch(setBillList(res.data));
  };
};

//解构出来actionCreators函数
const { setBillList } = billSlice.actions;

//导出reducer和actionCreators函数
export { setBillList, fetchBillList };

export default billSlice.reducer;
