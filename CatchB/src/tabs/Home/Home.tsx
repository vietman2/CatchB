import { useSelector } from "react-redux";

import NormalHome from "./NormalHome";
import ProHome from "./ProHome";
import { RootState } from "../../store/store";

export default function Home() {
  const mode = useSelector((state: RootState) => state.mode.mode);

  if (mode === "basic") {
    return <NormalHome />;
  } else {
    return <ProHome />;
  }
}
