import { useSelector } from "react-redux";

import NormalHome from "./NormalHome";
import ProHome from "./ProHome";
import { RootState } from "../../../store/store";

export default function HomeMain() {
  const mode = useSelector((state: RootState) => state.general.mode);

  if (mode === "basic") {
    return <NormalHome />;
  } else {
    return <ProHome />;
  }
}
