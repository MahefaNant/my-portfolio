export function Head() {
  return(
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mahefa Nantenaina",
              "jobTitle": "Développeur Fullstack",
              "url": process.env.NEXT_PUBLIC_SITE_URL,
              "sameAs": [
                "https://www.linkedin.com/in/mahefa-nantenaina-419a98271/", 
                "https://github.com/MahefaNant"
              ],
              "skills": ["React", "Next.js", "TypeScript", "Java", "PHP", "Spring", "Node", "C#"]
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Mahefa Nantenaina",
              "url": process.env.NEXT_PUBLIC_SITE_URL,
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/static/images/mahefa-logo.png`
            }
          ])
        }}
      />

    </>
  );
}