import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { SpecificDay } from "./SpecificDay/SpecificDay";
import { SpecificEvent } from "./SpecificEvent/SpecificEvent";
import { SpecificSearch } from "./SpecificSearch/SpecificSearch";

export const Calendar = () => {
  return (
    <div>
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
