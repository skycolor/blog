module.exports = {
    // 基础配置
    title: 'HF\'s blog',
    base: '/blog/dist/',
    dest: 'docs/dist',
    description: '记录一些个人前端文档',
    // 使用插件
    plugins: [],
    // 主题
    themeConfig: {
        logo: '/img/logo.jpg',
        // 导航栏
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'External', link: 'https://google.com' },
        ]
    }
}