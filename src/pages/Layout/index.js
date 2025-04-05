import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "antd-mobile";
import { fetchBillList } from "@/store/modules/billStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, TabBar } from "antd-mobile";
import {
  BillOutline,
  AddCircleOutline,
  CalculatorOutline,
} from "antd-mobile-icons";
import "./index.scss";

//首页布局tab-bar
const tabs = [
  {
    key: "/",
    title: "月度账单",
    icon: <BillOutline />,
    badge: Badge.dot,
  },
  {
    key: "/new",
    title: "记账",
    icon: <AddCircleOutline />,
    badge: "5",
  },
  {
    key: "/annual",
    title: "年度账单",
    icon: <CalculatorOutline />,
  },
];

const Layout = () => {
  //Tab-bar点击 配合路由 切换二级路由页面
  const navigate = useNavigate();
  const switchRoute = (path) => {
    navigate(path);
  };
  //管理月度账单列表的redux
  const dispatch = useDispatch();
  const { billList } = useSelector((state) => state.bill);
  useEffect(() => {
    dispatch(fetchBillList());
  }, [dispatch]);

  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <TabBar onChange={(value) => switchRoute(value)}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};
export default Layout;
