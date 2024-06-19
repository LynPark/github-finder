import { useContext } from "react";
import AlertContext from "../../../context/alert/AlertContext";

function Alert() {
  const { alert } = useContext(AlertContext);
  return (
    alert !== null && (
      <p className="flex items-start mb-2 space-x-2">
        <span className="flex-1 text-base font-semibold leading-7">
          <span>💥</span>
          <strong>{alert.msg}</strong>
          <span>💥</span>
        </span>
      </p>
    )
  );
}

export default Alert;
