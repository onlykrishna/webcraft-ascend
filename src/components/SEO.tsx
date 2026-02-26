import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: "website" | "article";
    publishedTime?: string;
    author?: string;
    keywords?: string;
}

const SITE_NAME = "Scalvicon";
const DEFAULT_TITLE = "Scalvicon — Professional Website Development for Indian SMEs";
const DEFAULT_DESC =
    "Get a stunning, SEO-optimized website for your Indian business. Starting at ₹14,999. Fast delivery, real results — Restaurants, Clinics, Salons, Retail & more.";
const DEFAULT_IMAGE = "https://scalvicon-9bf2f.web.app/og-image.png";
const SITE_URL = "https://scalvicon-9bf2f.web.app";
const DEFAULT_KEYWORDS =
    "website development India, affordable website, Indian SME website, web design India, SEO India, Scalvicon";

export const SEO = ({
    title = DEFAULT_TITLE,
    description = DEFAULT_DESC,
    image = DEFAULT_IMAGE,
    url = SITE_URL,
    type = "website",
    publishedTime,
    author,
    keywords = DEFAULT_KEYWORDS,
}: SEOProps) => {
    const fullTitle = title === DEFAULT_TITLE
        ? title
        : `${title} | ${SITE_NAME}`;

    return (
        <Helmet>
            {/* Primary */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="author" content={author ?? SITE_NAME} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            {publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {author && <meta property="article:author" content={author} />}

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@scalvicon" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Canonical */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};
