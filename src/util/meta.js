import metadata from "../data/metadata";

const meta = pathname => {
  const {
    title,
    description,
    index = true,
    follow = true,
    nocache = true,
    og = "/og-image.webp"
  } = metadata[pathname];   

  const url = "https://weekly-sales.tranzindia.in";

  return {
        category: 'technology',
        title,
        description,
        authors: [
            {
                name: "Karthikeyan K"
            },
            {
                name: "Rajaganapathy D"
            },
            {
                name: "Hion Studios"
            },
        ],
        creator: "Karthikeyan, Hion Studios",
        openGraph: {
            title,
            description,
            url: `${url}${pathname}`,
            siteName: 'Hion Studios',
            type: 'website',
            images: [`${url}${og}`]
        },
        metadataBase: new URL(url),
        alternates: {
            canonical: `${url}${pathname}`,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            creator: '@hion_studios',
        },
        robots: {
            index,
            follow,
            nocache,
        },
    }
};

export default meta;
