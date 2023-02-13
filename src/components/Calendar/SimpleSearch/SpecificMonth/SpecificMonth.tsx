import { SpecificWeek } from "../SpecificWeek/SpecificWeek";
import { generateListOfWeekDayStarts } from "./SpecificMonth.utils";

export const SpecificMonth = ({ month }: { month: string }) => {
  const startsOfEachWeek = generateListOfWeekDayStarts(month);
  return (
    <div>
      {startsOfEachWeek.map(({ month, day }) => (
        <SpecificWeek key={`${month}-${day}`} month={month} day={day} />
      ))}
    </div>
  );
};
