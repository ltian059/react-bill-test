import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const billSlice = createSlice({
  name: "billList",
  initialState: {
    billList: [],
    jumpToDate: null,
    lastActiveDate: null,
    lastActiveYear: null,
  },
  reducers: {
    setBillList: (state, action) => {
      state.billList = action.payload;
    },
    //编写同步方法，用于异步成功添加一条账单到后端服务器后，前端添加账单
    addBill: (state, action) => {
      console.log(action.payload);
      // state.billList.push(action.payload);
    },
    //设置跳转日期，用于添加新帐单后跳转到新帐单的日期
    setJumpToDate: (state, action) => {
      state.jumpToDate = action.payload;
    },
    //设置上一次访问的日期，用于进入其他页面后返回月度账单时，重新显示上一次访问的日期
    setLastActiveDate: (state, action) => {
      state.lastActiveDate = action.payload;
    },
    //设置上一次访问的年份，用于进入其他页面后返回年度账单时，重新显示上一次访问的年份
    setLastActiveYear: (state, action) => {
      state.lastActiveYear = action.payload;
    },
  },
});

//解构出来actionCreators函数
const { setBillList, addBill, setJumpToDate, setLastActiveDate, setLastActiveYear} = billSlice.actions;
//获取bill列表actionCreator，异步逻辑
const fetchBillList = () => {
  return async (dispatch) => {
    const URL = "http://localhost:8888/ka";
    const res = await axios.get(URL);
    dispatch(setBillList(res.data));
  };
};
//添加账单异步方法
const addBillToServer = (data) => {
  return async (dispatch) => {
    const URL = "http://localhost:8888/ka";
    const res = await axios.post(URL, data);
    console.log(res);
    //后端成功添加一条账单后，前端更新数据
    dispatch(addBill(data));
  };
};

//导出reducer和actionCreators函数

export default billSlice.reducer;
export { setBillList, fetchBillList, addBillToServer, setJumpToDate, setLastActiveDate, setLastActiveYear };
