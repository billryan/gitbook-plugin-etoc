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
      if (this.output.name != 'website') return page;
      var _notoc = this.config.get('pluginsConfig.etoc.notoc') || false;
      var _existstoc = /^\s*<!-- toc -->\s*$/im.test(page.content);
      var _existsnotoc = /^\s*<!-- notoc -->\s*$/im.test(page.content);
      if (_existsnotoc) return page;
      if (_notoc && (!_existstoc)) return page;

      var _mindepth = this.config.get('pluginsConfig.etoc.mindepth') || 3;
      var _maxdepth = this.config.get('pluginsConfig.etoc.maxdepth') || 4;
      if (_mindepth > _maxdepth) {
        console.error("!!!mindepth should be no more than maxdepth");
        return page;
      }
      var re = new RegExp('^#{' + _mindepth + '}[^#]', 'm');
      if (!re.test(page.content)) return page;

      if (!(_notoc || _existstoc)) {
        // insert <!-- toc --> before the first h2 element
        page.content = page.content.replace(/^##([^#])/m, eol + '<!-- toc -->' + eol + '##' + '$1');
      }

      // markdown-toc do not pass options to generate,
      // we should escape <!-- toc --> not beginning with whitespace
      page.content = page.content.replace(/^(\S.*)<!-- toc -->(.*)$/m, '$1<!-- rawtoc -->$2');
      page.content = toc.insert(page.content, {
        slugify: function (str) {
          return slug(str);
        },
        maxdepth: _maxdepth
      });
      page.content = page.content.replace('<!-- rawtoc -->', '<!-- toc -->');
      return page;
    },

    "page": function (page) {
      // add toc id and class
      page.content = page.content.replace('<!-- toc -->', '<!-- toc --><div id="toc" class="toc">' + eol);
      page.content = page.content.replace('<!-- tocstop -->', eol + '</div><!-- tocstop -->');
      return page;
    }
  }
};
