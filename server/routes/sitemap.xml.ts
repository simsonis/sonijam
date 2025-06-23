import { SitemapStream, streamToPromise } from 'sitemap'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  // Fetch all documents
  const docs = await serverQueryContent(event).find()
  const sitemap = new SitemapStream({
    hostname: process.env.NUXT_PUBLIC_SITE_URL || 'https://simsonis.github.io/sonijam'
  })

  // Add main pages
  sitemap.write({
    url: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date().toISOString()
  })

  // Add blog posts
  for (const doc of docs) {
    if (doc._path && doc._path.startsWith('/posts/')) {
      sitemap.write({
        url: doc._path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: doc.updatedAt || doc.createdAt || new Date().toISOString()
      })
    }
  }
  
  sitemap.end()

  return streamToPromise(sitemap)
})