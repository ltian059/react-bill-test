import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import Icon from "@/components/Icon";
import "./index.scss";
import classNames from "classnames";
import { billListData } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addBillToServer } from "@/store/modules/billStore";
import { useDispatch } from "react-redux";
import { setJumpToDate } from "@/store/modules/billStore";
const New = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //1. 控制收入页面和支出页面却换的状态
  const [type, setType] = useState("pay"); // pay 支出 income 收入
  // 2.保存账单实现：
  // 2.1 收集表单数据
  //金额双向绑定
  const [money, setMoney] = useState(); // 账单金额
  const onMoneyChange = (value) => {
    setMoney(value);
  };
  //账单useFor
  const [useFor, setUseFor] = useState("");
  const saveBill = () => {
    // 1.校验数据
    if (!money) return;
    if (!useFor) return;
    const formData = {
      type,
      money: type === "pay" ? -money : +money,
      date: new Date().toISOString(),
      useFor,
    };
    console.log(formData);
    dispatch(addBillToServer(formData));
    //新增账单后，还要做： 1. 跳转到月账单列表页 2. 跳转到新增账单的年月 3. 展开新增账单日的日账单列表(DailyBill组件中)
    dispatch(setJumpToDate(formData.date)); //设置跳转日期
    navigate("/"); //返回首页
  };
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(type === "pay" && "selected")}
            onClick={() => setType("pay")}
          >
            支出
          </Button>
          <Button
            className={classNames(type === "income" && "selected")}
            shape="rounded"
            onClick={() => setType("income")}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{"今天"}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                onChange={onMoneyChange}
                value={money}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      {/* 数据区 */}
      <div className="kaTypeList">
        {billListData[type].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div
                      className={classNames(
                        "item",
                        useFor === item.type && "active"
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  );
};

export default New;
