import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
import { fetchBillList } from "@/store/modules/billStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Layout = () => {
  //管理月度账单列表的redux
  const dispatch = useDispatch();
  const { billList } = useSelector((state) => state.bill);
  useEffect(() => {
    dispatch(fetchBillList());
  }, []);

  return (
    <div>
      <Outlet />
      <h1>Layout</h1>
      {/* 测试全局生效样式 */}
      <Button color="primary">测试全局生效样式</Button>
    </div>
  );
};
export default Layout;
