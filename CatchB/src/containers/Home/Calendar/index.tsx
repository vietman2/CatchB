import { useEffect, useState } from "react";
import {
  CalendarList as CalendarComponent,
  CalendarProvider,
} from "react-native-calendars";

import { themeColors } from "../../../variables/colors";

export default function Calendar() {
  const [today, setToday] = useState<string>("");
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    // getToday's date
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    const monthString = month < 10 ? `0${month}` : month;
    const dateString = date < 10 ? `0${date}` : date;

    setToday(`${year}-${monthString}-${dateString}`);

    setReady(true);
  }, []);

  return (
    <CalendarProvider date="2024-02-15">
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
  );
}
