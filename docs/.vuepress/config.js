module.exports = {
    // 基础配置
    title: 'HF\'s blog',
    base: '/blog/dist/',
    dest: 'docs/dist',
    description: '记录一些个人前端文档',
    // 使用插件
    plugins: [],
    // 主题
    theme: '@vuepress/blog',
    themeConfig: {
        nav: [
          {
            text: 'Blog',
            link: '/',
          },
          {
              text: 'child',
              link: '/child/',
          },
          {
            text: 'Tags',
            link: '/tag/',
          }
        ],
        directories: [
          {
            id: 'post',
            dirname: '_posts',
            path: '/',
          },
          {
            id: 'test',
            dirname: '_test2',
            path: '/child/',
          }
        ]
    }
}