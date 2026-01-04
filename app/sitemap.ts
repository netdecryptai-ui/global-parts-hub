import { MetadataRoute } from 'next';
// @ts-ignore
import phoneDatabase from './data/phones.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://global-parts-hub.vercel.app'; // Your live domain

  // 1. Generate URLs for all 50 Product Pages
  // @ts-ignore
  const productUrls = phoneDatabase.map((phone) => ({
    url: `${baseUrl}/product/${phone.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 2. Generate URLs for Versus Battles (The "Infinite Content" Engine)
  // This loop pairs every phone with every other phone (approx 1,200 combinations)
  const versusUrls = [];
  // @ts-ignore
  for (let i = 0; i < phoneDatabase.length; i++) {
    // @ts-ignore
    for (let j = i + 1; j < phoneDatabase.length; j++) {
      versusUrls.push({
        // @ts-ignore
        url: `${baseUrl}/versus/${phoneDatabase[i].slug}-vs-${phoneDatabase[j].slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      });
    }
  }

  // 3. Return the full map to Google
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...productUrls,
    ...versusUrls,
  ];
}