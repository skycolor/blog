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
            { text: '首页', link: '/' },
            {
                text: '编程',
                items: [
                    { text: '前端', link: '/programme/front/' },
                    { text: '后台', link: '/programme/background/' },
                    { text: '工具', link: '/programme/tool/' },
                ]
            },
            { text: '读书笔记', link: '/reading/' },
            { text: '小果冻', link: '/child/' },
            { text: 'GitHub', link: 'https://github.com/skycolor' },
        ]
    }
}