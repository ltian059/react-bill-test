import "./index.scss";

const MonthlyBill = () => {
  return (
    <div className="monthUnderAnuual">
      <div className="header">
        <div className="top">
          <div className="left">
            <span>{"4月"}</span>
          </div>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{10000.0}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{5000000.0}</span>
          </div>
          <div className="balance">
            <span className="money">{1600554.0}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBill;
