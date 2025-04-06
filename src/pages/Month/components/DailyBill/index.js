import { useState } from "react";
import "./index.scss";
import { UpOutline } from "antd-mobile-icons";
import classNames from "classnames";
import dayjs from "dayjs";
import { useMemo } from "react";
import { billTypeToName } from "@/constants/index";
import Icon from "@/components/Icon";
const DailyBill = ({ date, dailyBillList }) => {
  //TODO: 这里是日账单的组件，后续需要根据实际数据进行渲染
  //1.点击箭头展开和收起
  const [expand, setExpand] = useState(false);
  const onExpand = () => {
    setExpand(!expand);
  };

  //   2.格式化时间
  const formatedDate = dayjs(date).format("YYYY年MM月DD日");

  //计算当前日的总的支出、收入和结余
  const { pay, income, balance } = useMemo(() => {
    let pay = 0,
      income = 0,
      balance = 0;
    dailyBillList.forEach((item) => {
      if (item.type === "pay") {
        pay += item.money;
      } else if (item.type === "income") {
        income += item.money;
      }
    });
    balance = income + pay;
    return { pay, income, balance };
  }, [dailyBillList]);

  //   3.渲染日账单列表
  const DailyBillItem = ({ item }) => {
    return (
      <div className="bill">
        <div className="detail">
          {/* 图标 */}
          <Icon type={item.useFor} />
          <div className="billType">{billTypeToName[item.useFor]}</div>
        </div>
        <div className={classNames("money", item.type)}>
          {item.money.toFixed(2)}
        </div>
      </div>
    );
  };
  return (
    <div className="dailyBill">
      <div className="header">
        <div className="top">
          <div className="left">
            <span>{formatedDate}</span>
          </div>
          <div className="right"></div>
          <span>
            <UpOutline
              className={classNames("arrow", expand && "expand")}
              onClick={onExpand}
            />
          </span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{balance.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      <div className={classNames("dailyBillList", expand && "shown")}>
        {dailyBillList.map((item) => (
          <DailyBillItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default DailyBill;
