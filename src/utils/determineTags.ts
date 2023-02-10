const tagsAndKeywords = [
  {
    tag: "Communism",
    keywordsToMatch: ["communism", "communist", "central committee"],
  },
  {
    tag: "Socialism",
    keywordsToMatch: ["socialism", "socialist"],
  },
  {
    tag: "Labor",
    keywordsToMatch: [
      "striking",
      "on strike",
      "labor",
      "labour",
      "union",
      "work stoppage",
      "labor stoppage",
    ],
  },
  {
    tag: "General Strikes",
    keywordsToMatch: ["general strike"],
  },
  {
    tag: "Marxism",
    keywordsToMatch: [
      "marxism",
      "marxist",
      "lenin",
      "leninist",
      "marx",
      "leninism",
    ],
  },
  {
    tag: "Pan-Africanism",
    keywordsToMatch: ["pan-african"],
  },
  {
    tag: "Feminism",
    keywordsToMatch: [
      "feminism",
      "women's liberation",
      "suffragette",
      "women's strike",
      "women's right",
      "women's convention",
      "women's movement",
      "women's liberation",
      "feminine",
    ],
  },
  {
    tag: "Civil Rights",
    keywordsToMatch: [
      "civil rights",
      "sncc",
      "sit-in",
      "bus boycott",
      "apartheid",
      "colour bar",
      "nelson mandela",
    ],
  },
  {
    tag: "Birthdays",
    keywordsToMatch: ["born on this day", "born on this day"],
  },
  {
    tag: "Assassinations",
    keywordsToMatch: ["assassinated", "assassination", "assassin"],
  },
  {
    tag: "IWW",
    keywordsToMatch: [
      "iww",
      "one big union",
      "industrial workers of the world",
    ],
  },
  {
    tag: "Anarchism",
    keywordsToMatch: [
      "anarchism",
      "anarcha",
      "anarchist",
      "anarcho",
      "anarchy",
      "libertarian socialism",
      "mutualism",
      "emma goldman",
      "durruti",
    ],
  },
  {
    tag: "Imperialism",
    keywordsToMatch: [
      "imperialism",
      "imperialist",
      "empire",
      "spanish-american war",
      "winter soldier",
      "vietnam war",
      "u.s. occupation",
      "keanu sai",
    ],
  },
  {
    tag: "Colonialism",
    keywordsToMatch: [
      "colonizer",
      "colonial",
      "colonized",
      "white settler",
      "dakota war",
      "sioux uprising",
    ],
  },
  {
    tag: "Indigenous",
    keywordsToMatch: [
      "indigenous",
      "native american",
      "aboriginal",
      "creek nation",
      "sioux",
      "cherokee",
    ],
  },
  {
    tag: "Riots",
    keywordsToMatch: ["riot"],
  },
  {
    tag: "Massacre",
    keywordsToMatch: ["massacre", "[^man]slaughter", "mass shoot"],
  },
  {
    tag: "Genocide",
    keywordsToMatch: ["genocide"],
  },
  {
    tag: "Journalism",
    keywordsToMatch: ["journalist", "reporter", "muckrak"],
  },
  {
    tag: "Tenant",
    keywordsToMatch: ["tenant", "anti-rent", "rent strike", "squatter"],
  },
  {
    tag: "Queer",
    keywordsToMatch: [
      "homosexual",
      "queer",
      "trans right",
      "transsexual",
      "gay right",
      "lesbian",
      "gay man",
      "gay woman",
      "bisexual",
    ],
  },
  {
    tag: "Fascism",
    keywordsToMatch: [
      "fascism",
      "fascist",
      "nazi",
      "mussolini",
      "franco",
      "final solution",
    ],
  },
  {
    tag: "Abolitionism",
    keywordsToMatch: ["abolitionist", "abolitionism"],
  },
  {
    tag: "Terrorism",
    keywordsToMatch: [
      "terrorism",
      "terrorist",
      "ku klux klan",
      "bombed",
      "bombing",
    ],
  },
  {
    tag: "Mutinies",
    keywordsToMatch: ["mutiny", "mutinies"],
  },
  {
    tag: "Protests",
    keywordsToMatch: ["protest", "demonstrators", "hunger strike"],
  },
  {
    tag: "Independence",
    keywordsToMatch: ["independence", "free from"],
  },
];

export const determineTags = (
  title: string,
  description: string,
  imgAltText: string | null
) => {
  const lowercaseTitle = title.toLowerCase();
  const lowercaseDescription = description.toLowerCase();
  const lowercaseImgAltText = imgAltText?.toLowerCase() ?? "";
  const matchedTags: string[] = [];
  tagsAndKeywords.forEach(({ tag, keywordsToMatch }) => {
    let matchedCount: number = 0;
    keywordsToMatch.forEach((keyword) => {
      const re = new RegExp(keyword, "g");
      const totalMatches =
        (lowercaseTitle.match(re)?.length ?? 0) +
        (lowercaseDescription.match(re)?.length ?? 0) +
        (lowercaseImgAltText.match(re)?.length ?? 0);
      matchedCount += totalMatches;
    });
    if (matchedCount > 1) {
      matchedTags.push(tag);
    }
  });
  if (matchedTags.includes("Birthdays")) {
    return matchedTags.filter(
      (tag) => tag !== "Assassinations" && tag !== "Terrorism"
    );
  }
  return matchedTags;
};
