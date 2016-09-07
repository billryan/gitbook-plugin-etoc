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
      var _maxdepth = this.config.get('pluginsConfig.etoc.maxdepth') || 3;
      page.content = toc.insert(page.content, {
        slugify: function (str) {
          return slug(str);
        },
        append: '\n---\n',
        maxdepth: _maxdepth
      });
      if (this.config.get('pluginsConfig.etoc.addClass')) {
        var className = this.config.get('pluginsConfig.etoc.className') || 'etoc';
        page.content = page.content + '\n\n\n<script type="text/javascript">var className=\'' + className + '\';</script>';
      }
      return page;
    },

    "page": function (page) {
      page.content = page.content.replace('<!-- toc -->', '<!-- toc --><div id="toc" class="toc">\n');
      page.content = page.content.replace('<!-- tocstop -->', '\n</div><!-- tocstop -->');
      return page;
    }
  }
};
