import { NavBar, DatePicker } from "antd-mobile";
import { DownOutline, UpOutline } from "antd-mobile-icons";
import "./index.scss";
import { useState } from "react";
import classNames from "classnames";

const Month = () => {
  //时间选择模块
  const now = new Date();
  //点击打开时间选择器
  const [dateVisible, setDateVisible] = useState(false);
  const onConfirm = (value) => {
    console.log(value);
    setDateVisible(false);
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
            <span className="text">2023 | 3月账单</span>
            <DownOutline
              className={classNames("arrow", dateVisible && "expand")}
              onClick={() => setDateVisible(!dateVisible)}
            />
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <div className="money">{100}</div>
              <div className="type">支出</div>
            </div>
            <div className="item">
              <div className="money">{100}</div>
              <div className="type">收入</div>
            </div>
            <div className="item">
              <div className="money">{100}</div>
              <div className="type">结余</div>
            </div>
          </div>
        </div>
        {/* 时间选择器 */}
        <DatePicker
          title="时间选择"
          precision="month"
          onClose={() => setDateVisible(false)}
          onConfirm={onConfirm}
          max={now}
          visible={dateVisible}
        />
      </div>
    </div>
  );
};
export default Month;
