import { DatePicker } from "antd-mobile";
import { useCallback } from "react";
import "./index.scss";
const MyDatePicker = (props) => {
  const labelRenderer = useCallback((type, data) => {
    switch (type) {
      case "year":
        return data + "年";
      case "month":
        return data + "月";
      case "day":
        return data + "日";
      case "hour":
        return data + "时";
      case "minute":
        return data + "分";
      case "second":
        return data + "秒";
      default:
        return data;
    }
  }, []);
  return <DatePicker {...props} renderLabel={labelRenderer} />;
};

export default MyDatePicker;
