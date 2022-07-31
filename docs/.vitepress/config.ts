import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  lastUpdated: true,
  title: 'Vooks',
  description: 'Just playing around',
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/07akioni/vooks' },
    ],
    sidebar: [
      {
        text: 'Get Started',
        items:[{
          text: 'Introduction',
          link: '/get-started/'
        }]
      },
      {
        text: 'API',
        items:[{
          text:'API Reference',
          link: '/api/'
        }]
      }
    ]
  }
})
