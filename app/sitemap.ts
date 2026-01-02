import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://global-parts-hub.vercel.app' // CHANGE THIS to your real Vercel URL

  // Define your static routes
  const routes = ['', '/blog', '/product'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  return [...routes]
}