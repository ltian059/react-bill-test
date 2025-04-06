import { NavBar } from "antd-mobile";
import { DownOutline } from "antd-mobile-icons";
import MyDatePicker from "@/components/DatePicker";
import { useState } from "react";
import "./index.scss";
import MonthlyBill from "./components/MonthlyBill";

const Annual = () => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const onDatePickerConfirm = (date) => {
    setDatePickerVisible(false);
    console.log("选择的日期", date);
  };

  return (
    <div className="annualBill">
      {/* header顶部区域 */}
      <div className="header">
        <NavBar backIcon={false} className="nav" onClick={() => {}}>
          2025年
          <DownOutline className="arrow" />
          <MyDatePicker
            precision="year"
            visible={datePickerVisible}
            onClose={() => setDatePickerVisible(false)}
            onConfirm={onDatePickerConfirm}
          />
        </NavBar>
        <div className="annualTotal">
          <div className="item pay">
            <p className="money">37001.00</p>
            <p className="type">支出</p>
          </div>
          <div className="item income">
            <p className="money">2888.00</p>
            <p className="type">收入</p>
          </div>
          <div className="item balance">
            <p className="money">-34113.00</p>
            <p className="type">结余</p>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="content">
          <MonthlyBill />
          <MonthlyBill />
          <MonthlyBill />
        </div>
      </div>
    </div>
  );
};

export default Annual;
