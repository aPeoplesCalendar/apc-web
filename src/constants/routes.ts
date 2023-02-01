export const ROUTES = {
  ABOUT: "/about",
  /** this route is a wildcard match for all calendar related pages */
  CALENDAR_GENERIC: "calendar/*",
  SUB_CALENDAR_ROUTES: {
    CALENDAR_DAY: "/day",
    CALENDAR_SEARCH: "/search",
    SPECIFIC_EVENT: "/events/:eventName",
  },
  CALENDAR_DAY: "/calendar/day",
  CALENDAR_SEARCH: "/calendar/search",
  CONTACT: "/contact",
  HOME: "/",
  SPECIFIC_EVENT: "/calendar/events/:eventName",
};
