import type { MetadataRoute } from "next";

import { paths, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

function url(path: string) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-09-25T00:00:00Z");
  const routePairs = Object.values(paths);

  return [
    ...routePairs.flatMap((pair) => [
    {
      url: url(pair.en),
      lastModified: pair === paths.privacy || pair === paths.terms || pair === paths.about || pair === paths.home ? new Date("2026-09-30T00:00:00+02:00") : now,
      changeFrequency: pair === paths.home ? ("weekly" as const) : ("monthly" as const),
      priority: pair === paths.home ? 1 : 0.8,
      alternates: {
        languages: {
          en: url(pair.en),
          cs: url(pair.cs),
        },
      },
    },
    {
      url: url(pair.cs),
      lastModified: pair === paths.privacy || pair === paths.terms || pair === paths.about || pair === paths.home ? new Date("2026-09-30T00:00:00+02:00") : now,
      changeFrequency: pair === paths.home ? ("weekly" as const) : ("monthly" as const),
      priority: pair === paths.home ? 0.9 : 0.75,
      alternates: {
        languages: {
          en: url(pair.en),
          cs: url(pair.cs),
        },
      },
    },
  ]),
    {
      url: url(paths.fantasy.cs + "/armady"),
      lastModified: new Date("2026-10-08T00:00:00+02:00"),
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: {
          en: url(paths.fantasy.en + "/armies"),
          cs: url(paths.fantasy.cs + "/armady"),
        },
      },
    },
    {
      url: url(paths.fantasy.en + "/armies"),
      lastModified: new Date("2026-10-08T00:00:00+02:00"),
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: {
          en: url(paths.fantasy.en + "/armies"),
          cs: url(paths.fantasy.cs + "/armady"),
        },
      },
    },
  ];
}
