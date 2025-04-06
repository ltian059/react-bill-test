import { useMemo } from "react";
import "./index.scss";

const MonthlyBill = ({ month, billList }) => {
  //根据当前月份的账单数据计算总支出、收入和结余
  const [totalPay, totalIncome, totalBalance] = useMemo(() => {
    let totalPay = 0; //总支出
    let totalIncome = 0; //总收入
    let totalBalance = 0; //总结余
    if (billList) {
      billList.forEach((item) => {
        if (item.type === "pay") {
          totalPay += item.money;
        } else if (item.type === "income") {
          totalIncome += item.money;
        }
      });
      totalBalance = totalIncome + totalPay;
    }
    return [totalPay, totalIncome, totalBalance];
  }, [billList]);
  return (
    <div className="monthUnderAnuual">
      <div className="header">
        <div className="top">
          <div className="left">
            <span>{month}月</span>
          </div>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{totalPay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{totalIncome.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{totalBalance.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBill;
