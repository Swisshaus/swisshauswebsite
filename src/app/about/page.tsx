import Image from 'next/image';
import Container from "@/app/components/container";
import { CMS_NAME } from "@/lib/constants";

export const metadata = {
  title: `About Swisshaus Design & Build | Custom Home Builders in Kalispell, MT | ${CMS_NAME}`,
  description: 'Learn about Swisshaus Design & Build, a family-owned custom home builder in Kalispell, MT with decades of experience in precision craftsmanship and innovative design.',
  keywords: 'custom home builders, Kalispell MT, Swisshaus, luxury homes, custom design, Mike Arnold, Kevin Arnold, Montana builders',
  openGraph: {
    title: 'About Swisshaus Design & Build | Custom Home Builders in Kalispell, MT',
    description: 'Family-owned custom home builders in Montana with a focus on quality, craftsmanship, and innovative design.',
    url: 'https://swisshaus.com/about',
    siteName: 'Swisshaus Design & Build',
    locale: 'en_US',
    type: 'website',
  },
};

export default function About() {
  // Add LocalBusiness structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Swisshaus Design & Build",
    "url": "https://swisshaus.com",
    "logo": "https://swisshaus.com/assets/logo.png",
    "image": "https://swisshaus.com/assets/about/1985.jpeg",
    "description": "Custom home builder in Kalispell, Montana with decades of experience in quality craftsmanship and innovative design.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Kalispell",
      "addressRegion": "MT",
      "postalCode": "59901",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates", 
      "latitude": 48.1919889,
      "longitude": -114.3168131
    },
    "telephone": "+14064075072",
    "email": "office@swisshaus.com",
    "sameAs": [
      "https://www.houzz.com/pro/swisshausmt/swisshaus"
    ],
    "priceRange": "$$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ]
  };
  
  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="pb-32 mt-28">
        {/* Hero Section */}
        <div className="relative mb-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center">
            About Swisshaus
          </h1>
          <div className="border-b-2 w-24 mx-auto mb-16 border-red-600"></div>
        </div>

        {/* Company Introduction */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="relative w-full h-[400px]">
            <Image 
              src="/assets/about/1985.jpeg"
              alt="Swisshaus award-winning custom home in Kalispell, Montana with mountain views"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg mb-4">
              A generational family owned company, Swisshaus Design & Build brings together decades of experience in custom home construction. Our passion for quality craftsmanship and innovative design has made us one of Kalispell's leading custom home builders.
            </p>
            <p className="text-lg mb-4">
              At Swisshaus, we believe that your home should be a perfect reflection of your lifestyle and aesthetic preferences. From initial concept through final construction, we work closely with our clients to ensure that every detail meets our exacting standards—and exceeds your expectations.
            </p>
            <p className="text-lg">
              Our Swiss-inspired approach combines precision engineering with thoughtful design, creating homes that are as beautiful as they are functional and durable.
            </p>
          </div>
        </div>

        {/* Meet the Team */}
        <div id="team" className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-16">Meet Our Team</h2>
          
          {/* Team Profiles */}
          <div className="grid md:grid-cols-2 gap-16">
            {/* Kevin Profile */}
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64 mb-6">
                <Image 
                  src="/assets/about/KevinProfile.png"
                  alt="Kevin Arnold - Project Management & Designer at Swisshaus Design & Build"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Kevin Arnold</h3>
              <p className="text-gray-600 dark:text-dark-text/80 mb-4">Project Management & Designer</p>
              {/* <p className="text-center">
                Kevin heads our design team, transforming client visions into stunning, functional home designs. His attention to detail and innovative approach have helped
              </p> */}
            </div>
            
            {/* Mike Profile */}
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64 mb-6">
                <Image 
                  src="/assets/about/MikeProfile.png"
                  alt="Mike Arnold - Founder & Master Builder at Swisshaus Design & Build in Kalispell, MT"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Mike Arnold</h3>
              <p className="text-gray-600 dark:text-dark-text/80 mb-4">Founder & Master Builder</p>
              {/* <p className="text-center">
                Mike brings technical expertise and hands-on building experience to every Swisshaus project. His commitment to quality construction and 'No Corners Cut' building practices ensures that each home we build is as durable as it is beautiful.
              </p> */}
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Quality Craftsmanship</h3>
              <p>We never compromise on quality, using the finest materials and most skilled craftsmen.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Client Partnership</h3>
              <p>Your input is valued throughout the process, ensuring your home truly reflects who you are.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">USA MADE Building</h3>
              <p>We're committed to sourcing responsible construction materials and supporting Local Products and Businesses.</p>
            </div>
          </div>
        </div>

        {/* Houzz Badges */}
        <section aria-labelledby="awards-heading" className="mb-10">
          <h2 id="awards-heading" className="text-4xl font-bold text-center mb-8">Awards & Recognition</h2>
          <p className="text-center max-w-2xl mx-auto mb-8">
            Swisshaus Design & Build has been recognized for excellence in custom home construction. 
            Visit our <a href="https://www.houzz.com/pro/swisshausmt/swisshaus" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Houzz profile</a> to see more of our award-winning work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div>
              <a href="https://www.houzz.com/pro/swisshausmt/swisshaus" target="_blank" rel="noopener noreferrer" aria-label="Swisshaus Best of Houzz Service award">
                <img src="https://st.hzcdn.com/static/badge_22_8@2x.png" alt="Swisshaus Best of Houzz Service award" width="80px" height="80px" />
              </a>
            </div>
            <div>
              <a href="https://www.houzz.com/pro/swisshausmt/swisshaus" target="_blank" rel="noopener noreferrer" aria-label="Swisshaus Best of Houzz Design award">
                <img src="https://st.hzcdn.com/static/badge_41_8@2x.png" alt="Swisshaus Best of Houzz Design award" width="80px" height="80px" />
              </a>
            </div>
            <div>
              <a href="https://www.houzz.com/pro/swisshausmt/swisshaus" target="_blank" rel="noopener noreferrer" aria-label="Swisshaus Recommended by Houzz award">
                <img src="https://st.hzcdn.com/static/badge_44_8@2x.png" alt="Swisshaus Recommended by Houzz award" width="80px" height="80px" />
              </a>
            </div>
            <div>
              <a href="https://www.houzz.com/pro/swisshausmt/swisshaus" target="_blank" rel="noopener noreferrer" aria-label="Swisshaus Influencer on Houzz award">
                <img src="https://st.hzcdn.com/static/badge_49_8@2x.png" alt="Swisshaus Influencer on Houzz award" width="80px" height="80px" />
              </a>
            </div>
            <div>
              <a href="https://www.houzz.com/pro/swisshausmt/swisshaus" target="_blank" rel="noopener noreferrer" aria-label="Swisshaus Top Pro on Houzz award">
                <img src="https://st.hzcdn.com/static/badge_54_8@2x.png" alt="Swisshaus Top Pro on Houzz award" width="80px" height="80px" />
              </a>
            </div>
          </div>
        </section>
      </article>
    </Container>
  );
}