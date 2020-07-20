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
            { text: 'js基础', link: '/javascript/' },
            { text: '工具', link: '/tool/' },
            { text: '读书笔记', link: '/reading/' },
            { text: '小果冻', link: '/child/' },
            { text: '标签', link: '/tag/' },
            { text: 'GitHub', link: 'https://github.com/skycolor' },
        ],
        // 文件流
        directories: [
            { id: 'javascript', title: 'js基础', dirname: '_javascript', path: '/javascript/' },
            { id: 'tool', title: '工具', dirname: '_tool', path: '/tool/' },
            { id: 'reading',title: '隨筆', dirname: '_reading', path: '/reading/' },
            { id: 'child',title: '小果冻', dirname: '_child', path: '/child/' },
        ],
        smoothScroll: true
    }
}