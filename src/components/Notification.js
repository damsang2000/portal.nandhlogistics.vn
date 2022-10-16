import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default () => {
  const { pathname } = useLocation();

  useEffect(() => {
    alert("Phiên làm việc hết hạn");
  }, [pathname]);

  return null;
};
