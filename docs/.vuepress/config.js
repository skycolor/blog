module.exports = {
    // 基础配置
    title: 'HF\'s blog',
    base: '/blog/dist/',
    dest: 'docs/dist',
    description: '记录一些个人前端文档',
    // 主题
    themeConfig: {
        logo: '/img/logo.jpg',
        // 导航栏
        nav: [
            { text: '首页', link: '/' },
            { text: '编程', link: '/programme/' },
            { text: '读书笔记', link: '/reading/' },
            { text: '小果冻', link: '/child/' },
            { text: '标签', link: '/tag/' },
            { text: 'GitHub', link: 'https://github.com/skycolor' },
        ],
        // 文件流
        directories: [
            { id: 'programme',title: '程序人生', dirname: '_programme', path: '/programme/', },
            { id: 'reading',title: '隨筆', dirname: '_reading', path: '/reading/', },
            { id: 'child',title: '小果冻', dirname: '_child', path: '/child/', }
        ],
        smoothScroll: true
    }
}