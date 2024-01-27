import { useEffect, useState } from "react";
import {
  CalendarList as CalendarComponent,
  CalendarProvider,
} from "react-native-calendars";

import { themeColors } from "../../../variables/colors";

export default function CalendarMain() {
  const [today, setToday] = useState<string>("");
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    // getToday's date
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    setToday(
      `${year}-
      ${month < 10 ? `0${month}` : month}-
      ${
        date < 10 ? `0${date}` : date
      }`
    );

    setReady(true);
  }, []);

  return (
    <>
      <CalendarProvider date="2024-01-15">
        <CalendarComponent
          displayLoadingIndicator={!ready}
          horizontal
          pagingEnabled
          pastScrollRange={24}
          futureScrollRange={24}
          markedDates={{
            [today]: { selected: true, selectedColor: themeColors.primary },
          }}
        />
      </CalendarProvider>
    </>
  );
}
