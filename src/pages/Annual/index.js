import { NavBar } from "antd-mobile";
import { DownOutline } from "antd-mobile-icons";
import MyDatePicker from "@/components/DatePicker";
import { useEffect, useMemo, useState } from "react";
import "./index.scss";
import MonthlyBill from "./components/MonthlyBill";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {groupBy} from "lodash"
import dayjs, { Dayjs } from "dayjs";
import { setLastActiveYear } from "@/store/modules/billStore";
const Annual = () => {
  //选择年份的日期选择器
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const onDatePickerConfirm = (date) => {
    setDatePickerVisible(false);    
    setCurrYear(dayjs(date).format("YYYY"));
  };
  //获取账单数据
  const { billList } = useSelector((state) => state.bill);
  //判断上次是否有访问的年份
  const { lastActiveYear } = useSelector((state) => state.bill);
  //获取当前年份
  const [currYear, setCurrYear] = useState(lastActiveYear || dayjs().format("YYYY"));
  //更新上次访问的年份
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLastActiveYear(currYear));
  }, [currYear, dispatch]);
  
  
  //将所有账单数据按照年份分组，并缓存
  const groupByYearBill = useMemo(() => {
    const groupByYearBill = groupBy(billList, (item) => dayjs(item.date).format("YYYY"));
    return groupByYearBill;
  }, [billList]);

  //选择当前年份的账单数据
  const [currYearBill, setCurrYearBill] = useState(groupByYearBill[currYear]);
  //当年份变化时，更新当前年份的账单数据
  useEffect(() => {
    setCurrYearBill(groupByYearBill[currYear]);
  }, [currYear, groupByYearBill]);

  //1. 计算当前年的总支出、收入和结余
  const [totalPay, totalIncome, totalBalance] = useMemo(() => {
    let totalPay = 0; //总支出
    let totalIncome = 0; //总收入
    let totalBalance = 0; //总结余
    if (currYearBill) {
      currYearBill.forEach((item) => {
        if (item.type === "pay") {
          totalPay += item.money;
        } else if (item.type === "income") {
          totalIncome += item.money;
        }
      });
      totalBalance = totalIncome + totalPay;
    }
    return [totalPay, totalIncome, totalBalance];
  }, [currYearBill]);

  //2. 分组当前年份每个月的账单
  const [keys,groupByMonth] = useMemo(() => {
    const groupByMonth = groupBy(currYearBill, (item) => dayjs(item.date).format("YYYY-MM"));
    const keys = Object.keys(groupByMonth);
    return [keys,groupByMonth];
  }, [currYearBill]);

  
  return (
    <div className="annualBill">
      {/* header顶部区域 */}
      <div className="header">
        <div className="top" onClick={() => setDatePickerVisible(true)}>
          <NavBar
            backIcon={false}
            className="nav"
            onClick={() => {
              setDatePickerVisible(true);
            }}
          >
            {currYear}年
            <DownOutline
              className={classNames("arrow", datePickerVisible && "expand")}
              onClick={() => setDatePickerVisible(true)}
            />
            <MyDatePicker
              precision="year"
              visible={datePickerVisible}
              onClose={() => setDatePickerVisible(false)}
              onConfirm={onDatePickerConfirm}
              defaultValue={dayjs(currYear).toDate()}
            />
          </NavBar>
        </div>
        <div className="annualTotal">
          <div className="item pay">
            <p className="money">{totalPay.toFixed(2)}</p>
            <p className="type">支出</p>
          </div>
          <div className="item income">
            <p className="money">{totalIncome.toFixed(2)}</p>
            <p className="type">收入</p>
          </div>
          <div className="item balance">
            <p className="money">{totalBalance.toFixed(2)}</p>
            <p className="type">结余</p>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="content">
          {keys.map((item) => 
            <MonthlyBill
              key={item}
              month={dayjs(item).format("M")}
              billList={groupByMonth[item]}
            />

          )}

        </div>
      </div>
    </div>
  );
};

export default Annual;
