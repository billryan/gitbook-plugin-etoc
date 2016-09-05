var toc = require('markdown-toc');
var slug = require('github-slugid');

module.exports = {
    book: {
      assets: './assets',
      css: [
        "plugin.css"
      ],
      js: [
        "plugin.js"
      ]
    },
    hooks: {
        "page:before": function (page) {
            page.content = toc.insert(page.content, {
                slugify: function (str) {
                  return slug(str);
                }
            });
            if (this.options.pluginsConfig.etoc.addClass) {
                var className = this.options.pluginsConfig.etoc.className || 'etoc';
                page.content = page.content + '\n\n\n<script type="text/javascript">var className=\'' + className + '\';</script>';
            }
            return page;
        }
    }
};
