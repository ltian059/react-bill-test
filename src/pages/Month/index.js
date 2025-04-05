import { NavBar, DatePicker } from "antd-mobile";
import { DownOutline, UpOutline } from "antd-mobile-icons";
import "./index.scss";

const Month = () => {
  //时间选择模块
  const now = new Date();

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
            <DownOutline className="arrow expand" />
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
          max={now}
          visible={false}
        />
      </div>
    </div>
  );
};
export default Month;
