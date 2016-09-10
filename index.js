var toc = require('markdown-toc');
var slug = require('github-slugid');
var eol = require('os').EOL;

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
      var _notoc = this.config.get('pluginsConfig.etoc.notoc') || false;
      var _existstoc = page.content.indexOf('<!-- toc -->') !== -1;
      var _existsnotoc = page.content.indexOf('<!-- notoc -->') !== -1;
      if (_existsnotoc) return page;
      if (_notoc && (!_existstoc)) return page;
      if (!(_notoc || _existstoc)) {
        // insert <!-- toc --> before the first h2/h3/h4 element
        page.content = page.content.replace(/(\r|\n|\r\n)##/, eol + '<!-- toc -->' + eol + '##');
      }

      var _mindepth = this.config.get('pluginsConfig.etoc.mindepth') || 3;
      var _maxdepth = this.config.get('pluginsConfig.etoc.maxdepth') || 4;
      if (_mindepth > _maxdepth) {
        console.error("!!!mindepth should be no more than maxdepth");
        return page;
      }
      var heading = '#'.repeat(_mindepth);
      var re = new RegExp("(\r|\n|\r\n)" + heading);
      if (!page.content.match(re)) return page;

      page.content = toc.insert(page.content, {
        slugify: function (str) {
          return slug(str);
        },
        maxdepth: _maxdepth
      });
      return page;
    },

    "page": function (page) {
      page.content = page.content.replace('<!-- toc -->', '<!-- toc --><div id="toc" class="toc">\n');
      page.content = page.content.replace('<!-- tocstop -->', '\n</div><!-- tocstop -->');
      return page;
    }
  }
};
