import { NavBar, DatePicker } from "antd-mobile";
import MyDatePicker from "@/components/DatePicker";
import { DownOutline } from "antd-mobile-icons";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { groupBy, set } from "lodash";
import DailyBill from "./components/DailyBill";
import { setJumpToDate } from "@/store/modules/billStore";
const Month = () => {
  const dispatch = useDispatch();
  //用于添加新帐单后，重新设置当前年月
  const { jumpToDate } = useSelector((state) => state.bill);
  //时间选择模块
  //点击打开时间选择器
  const [dateVisible, setDateVisible] = useState(false);
  //控制时间显示
  const [currDate, setCurrDate] = useState(() => {
    // 如果有跳转日期，则需要跳转到跳转日期的月份
    return dayjs(new Date()).format("YYYY | M");
  });
  //3. 计算当前月份的支出、收入和结余
  const [currMonthBillList, setCurrMonthBillList] = useState([]);

  //按月分组数据，统计月度的支出、收入和结余
  //1. 从redux中获取数据
  const { billList } = useSelector((state) => state.bill);
  //2. 按月分组数据，统计月度的支出、收入和结余
  const groupBillListByMonth = () => {
    const map = groupBy(billList, (item) =>
      dayjs(item.date).format("YYYY | M")
    );
    console.log("按月分组数据", map);
    return map;
  };

  //2. useMemo缓存计算结果，避免重复计算
  const billListGroupedByMonth = useMemo(
    () => groupBillListByMonth(billList),
    [billList]
  );

  //更改时间选择器的值
  const onConfirm = (value) => {
    setDateVisible(false);
    setCurrDate(dayjs(value).format("YYYY | M"));
    console.log("当前时间", currDate);
    // setCurrMonthBillList(billListGroupedByMonth[currDate]);
  };
  //进入页面时，默认显示当前月份的账单，并在切换月份时更新
  useEffect(() => {
    setCurrMonthBillList(billListGroupedByMonth[currDate]);
  }, [billListGroupedByMonth, currDate]);

  //计算当前月份总的支出、收入和结余
  const { pay, income, balance } = useMemo(() => {
    let pay = 0,
      income = 0,
      balance = 0;
    if (currMonthBillList) {
      currMonthBillList.forEach((item) => {
        if (item.type === "pay") {
          pay += item.money;
        } else if (item.type === "income") {
          income += item.money;
        }
      });
      balance = income + pay;
    }
    return { pay, income, balance };
  }, [currMonthBillList]);

  //当前月按照日来分组
  const groupCurrBillListByDay = () => {
    const map = groupBy(currMonthBillList, (item) =>
      dayjs(item.date).format("YYYY-MM-DD")
    );
    const keys = Object.keys(map);
    console.log("按月分组数据", map);
    return [keys, map];
  };

  //2. useMemo缓存计算结果，避免重复计算
  const [keys, currBillListGroupedByDay] = useMemo(
    () => groupCurrBillListByDay(),
    [currMonthBillList]
  );

  //3. 处理跳转日期
  //本地组件保存跳转日期
  const [localJumpToDate, setLocalJumpToDate] = useState(null);
  useEffect(() => {
    if (jumpToDate) {
      setCurrDate(dayjs(jumpToDate).format("YYYY | M"));
      setLocalJumpToDate(jumpToDate);
      dispatch(setJumpToDate(null)); //清空跳转日期，否则会无限循环
    }
  }, [jumpToDate, dispatch]);

  const onJumpComplete = () => {
    setLocalJumpToDate(null); //清空跳转日期
  };

  return (
    <div className="monthlyBill">
      <NavBar backIcon={false} className="nav">
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">{currDate}月账单</span>
            <DownOutline
              className={classNames("arrow", dateVisible && "expand")}
              onClick={() => setDateVisible(!dateVisible)}
            />
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <div className="money">{pay.toFixed(2)}</div>
              <div className="type">支出</div>
            </div>
            <div className="item">
              <div className="money">{income.toFixed(2)}</div>
              <div className="type">收入</div>
            </div>
            <div className="item">
              <div className="money">{balance.toFixed(2)}</div>
              <div className="type">结余</div>
            </div>
          </div>
        </div>
        {/* 每日账单区域 */}
        {keys.map((item) => (
          <DailyBill
            key={item}
            date={item}
            dailyBillList={currBillListGroupedByDay[item]}
            jumpToDate={localJumpToDate}
            onJumpComplete={onJumpComplete} //传递回调函数给子组件
          />
        ))}
        {/* 时间选择器 */}
        <MyDatePicker
          className="datePicker"
          title="时间选择"
          precision="month"
          onClose={() => setDateVisible(false)}
          onConfirm={onConfirm}
          visible={dateVisible}
        ></MyDatePicker>
      </div>
    </div>
  );
};
export default Month;
