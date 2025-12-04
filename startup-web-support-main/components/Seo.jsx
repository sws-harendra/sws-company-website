import Head from "next/head";

export default function Seo({ title, description, canonical, image }) {
    return (
        <Head>
            {/* Title */}
            <title>{title}</title>

            {/* Description */}
            <meta name="description" content={description} />

            {/* Canonical */}
            <link rel="canonical" href={canonical} />

            {/* OG Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            <meta property="og:url" content={canonical} />
            <meta property="og:site_name" content="Startup Web Support" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />


            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Startup Web Support",
                        "url": "https://startupwebsupport.com",
                        "logo": "https://startupwebsupport.com/sws-logo.png",
                        "description": "Professional website development, SEO services, and digital branding."
                    })
                }}
            />

        </Head>
    );
}
