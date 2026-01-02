import { MetadataRoute } from 'next'

// 1. IMPORT DATA SAFELY
let phoneDatabase: any[] = [];
try {
  // We use the same data file as your pages
  phoneDatabase = require("./data/phones.json");
} catch (e) { phoneDatabase = []; }

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://global-parts-hub.vercel.app'; // Your Live URL

  // 1. STATIC PAGES (Home, Privacy, Contact)
  const staticRoutes = [
    '',
    '/blog/privacy-policy',
    '/blog/contact-us',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }));

  // 2. PRODUCT PAGES (Review Pages for each phone)
  const productRoutes = phoneDatabase.map((phone) => ({
    url: `${baseUrl}/product/${phone.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. VERSUS PAGES (The Money Maker)
  // Logic: Loop through every phone and compare it to every OTHER phone
  let versusRoutes: any[] = [];
  
  phoneDatabase.forEach((phoneA, index) => {
    phoneDatabase.forEach((phoneB, subIndex) => {
      // Avoid comparing phone to itself OR duplicates (A vs B is same as B vs A)
      if (index < subIndex) {
        versusRoutes.push({
          url: `${baseUrl}/versus/${phoneA.slug}-vs-${phoneB.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    });
  });

  // Combine everything into one giant list for Google
  return [...staticRoutes, ...productRoutes, ...versusRoutes];
}