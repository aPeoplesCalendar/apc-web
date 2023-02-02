import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { SpecificEvent } from "../SpecificEvent/SpecificEvent";
import { CalendarParams } from "./CalendarParams";
import { SpecificDay } from "./SpecificDay/SpecificDay";
import { SpecificSearch } from "./SpecificSearch/SpecificSearch";

export const Calendar = () => {
  return (
    <div>
      <CalendarParams />
      <Routes>
        <Route
          path={ROUTES.SUB_CALENDAR_ROUTES.CALENDAR_DAY}
          element={<SpecificDay />}
        />
        <Route
          path={ROUTES.SUB_CALENDAR_ROUTES.CALENDAR_SEARCH}
          element={<SpecificSearch />}
        />
        <Route
          path={ROUTES.SUB_CALENDAR_ROUTES.SPECIFIC_EVENT}
          element={<SpecificEvent />}
        />
      </Routes>
    </div>
  );
};
