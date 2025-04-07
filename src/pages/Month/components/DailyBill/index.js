import { useRef, useState } from "react";
import "./index.scss";
import { UpOutline } from "antd-mobile-icons";
import classNames from "classnames";
import dayjs from "dayjs";
import { useMemo } from "react";
import { billTypeToName } from "@/constants/index";
import Icon from "@/components/Icon";
import { useEffect } from "react";
//TODO: 这里是日账单的组件，后续需要根据实际数据进行渲染
//1.点击箭头展开和收起
const DailyBill = ({ date, dailyBillList, jumpToDate,onCompleteJumpToDate}) => {
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

  //  4 如果有跳转日期，则需要展开跳转日期的日账单列表，并滑动到最底部
  // console.log("jumpToDate", jumpToDate);
  const listRef = useRef(null);
  /* 
     执行过程： 1. MonthlyBill组件中第一次传入jumpToDate时，useEffect会执行，并将expand设置为true,滑到最底部，然后回调清除MonthlyBill组件的localJumpToDate
      2. 由于清除了localJumpToDate，导致MonthlyBill组件重新渲染，这时又传入一个null进入DailyBill组件的jumpToDate，但此时useEffect不会执行，因为不是第一次渲染了，而且依赖项是expand，并没有改变
      3. 再次点击expand箭头时，expand变为false，此时useEffect会执行，由于jumpToDate为null，所以不会再次滑到底部去了

      当一个组件的 state 变化时，只有该组件及其所有子组件会重新渲染，而不是所有组件
      当组件重新渲染时，整个组件函数都会重新执行，生成新的 JSX 结构。React 通过虚拟 DOM 对比（diffing）决定哪些 DOM 元素需要更新
   */
  useEffect(() => {
    if (
      jumpToDate &&
      dayjs(date).format("YYYY-MM-DD") ===
        dayjs(jumpToDate).format("YYYY-MM-DD")
    ) {
      setExpand(true);
      if (expand && jumpToDate && listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
        onCompleteJumpToDate();
      }
    } else {
      listRef.current.scrollTop = 0;
    }
  }, [expand, jumpToDate, date, onCompleteJumpToDate]);
  // 自动滑到日账单列表最底部

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
      <div
        className={classNames("dailyBillList", expand && "shown")}
        ref={listRef}
      >
        {dailyBillList.map((item) => (
          <DailyBillItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default DailyBill;
