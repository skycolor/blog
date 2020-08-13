// 用于创建自定义的块级容器
const mdContainer = require('markdown-it-container');
module.exports = options => {
  // 代码层和显示组件名
  const componentName = 'md-container'
  return md => {
    md.use(mdContainer, 'demo', {
      // 当我们写::: demo :::这样的语法时才会进入自定义渲染方法
      validate(params) {
        return params.trim().match(/^demo\s*(.*)$/);
      },
      // 自定义渲染方法,这里为核心代码
      render(tokens, idx) {
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
        // nesting === 1表示标签开始
        if (tokens[idx].nesting === 1) {
          // 代码内容
          const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
          // 最终以钩子的形式把代码模块给了md-container组件
          return `<${componentName}>
            <template slot="demo"><!--pre-render-demo:${content}:pre-render-demo--></template>
            <template slot="source">
          `;
        }
        return `</template></${componentName}>`;
      }
    });
  };
}