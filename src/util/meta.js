import metadata from "../data/metadata";

const meta = pathname => {
  const {
    title,
    description,
    index = true,
    follow = true,
    nocache = true,
    og = "/og.png"
  } = metadata[pathname];

  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${url}${pathname}`,
      siteName: "Hion Studios",
      images: [`${url}`],
      type: "website",
    },
    metadataBase: new URL(url),
    alternates: {
      canonical: `${url}${pathname}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@hion_studios",
    },
    robots: {
      index,
      follow,
      nocache,
    },
  };
};

export default meta;
