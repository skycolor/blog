module.exports = {
    // 基础配置
    title: '文枫的小站',
    base: '/blog/dist/',
    dest: 'docs/dist',
    description: '记录一些个人前端文档',
    // 主题
    theme: 'reco',
    themeConfig: {
        nav: [
            { text: '首页', link: '/', icon: 'reco-home' },
            { text: '时间线', link: '/timeline/', icon: 'reco-date' }
        ],
        sidebar: {
            '/views/sidebar/': [
                '',
                'bar1',
                'bar2'
            ],
            '/views/sidebargroup/': [
                {
                    title: '基础',
                    collapsable: true,
                    children: [
                        '',
                        'bar1'
                    ]
                },
                {
                    title: '进阶',
                    collapsable: true,
                    children: [
                        'bar2'
                    ]
                },
            ]
        },
        type: 'blog',
        // 博客设置
        blogConfig: {
            category: {
                location: 2, // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认 “分类”
            },
            tag: {
                location: 3, // 在导航栏菜单中所占的位置，默认3
                text: '标签' // 默认 “标签”
            }
        },
        logo: '/logo.jpg',
        authorAvatar: '/logo.jpg',
        // 搜索设置
        search: true,
        searchMaxSuggestions: 10,
        // 自动形成侧边导航
        // sidebar: 'auto',
        sidebarDepth: 4,
        // 最后更新时间
        lastUpdated: 'Last Updated',
        // 作者
        author: 'hf'
    }
}