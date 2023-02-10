type SortByModesArrType = [
  "alphabetical-ascending",
  "alphabetical-descending",
  "date-ascending",
  "date-descending"
];

export const SortByModes: SortByModesArrType = [
  "alphabetical-ascending",
  "alphabetical-descending",
  "date-ascending",
  "date-descending",
];

export type PossibleSortByModes = SortByModesArrType[number];

export const SortByMetaData = new Map<
  PossibleSortByModes,
  { displayText: string; column: string; ascending: boolean }
>([
  [
    "alphabetical-ascending",
    { displayText: "Alphabetical Ascending", column: "title", ascending: true },
  ],
  [
    "alphabetical-descending",
    {
      displayText: "Alphabetical Descending",
      column: "title",
      ascending: false,
    },
  ],
  [
    "date-ascending",
    { displayText: "Date Ascending", column: "date", ascending: true },
  ],
  [
    "date-descending",
    { displayText: "Date Descending", column: "date", ascending: false },
  ],
]);

export const allTags = [
  "Communism",
  "Socialism",
  "Labor",
  "General Strikes",
  "Marxism",
  "Pan-Africanism",
  "Feminism",
  "Civil Rights",
  "Birthdays",
  "Assassinations",
  "IWW",
  "Anarchism",
  "Imperialism",
  "Colonialism",
  "Indigenous",
  "Riots",
  "Massacre",
  "Genocide",
  "Journalism",
  "Tenant",
  "Queer",
  "Fascism",
  "Abolitionism",
  "Terrorism",
  "Mutinies",
  "Protests",
  "Independence",
].sort();
