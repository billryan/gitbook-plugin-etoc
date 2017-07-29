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
      var _h2lb = this.config.get('pluginsConfig.etoc.h2lb') || 3;

      var _mindepth = this.config.get('pluginsConfig.etoc.mindepth') || 3;
      var _maxdepth = this.config.get('pluginsConfig.etoc.maxdepth') || 4;
      if (_mindepth > _maxdepth) {
        console.error("!!!mindepth should be less equal than than maxdepth");
        return page;
      }
      var re = new RegExp('^#{' + _mindepth + '}[^#]', 'm');
      var _h2num = (page.content.match(/^##[^#]/gm) || []).length;
      if (!(re.test(page.content) || (_h2num >= _h2lb))) return page;

      var _header = this.config.get('pluginsConfig.etoc.header') || 1;
      var headerReg = new RegExp('(^#{' + _header + '}[^#].*)', 'm');
      if (!(_notoc || _existstoc)) {
        // insert <!-- toc --> after the header _header element
        page.content = page.content.replace(headerReg, '$1' + eol + '<!-- toc -->' + eol);
      }

      // markdown-toc does not pass options to generate,
      // we should escape <!-- toc --> not beginning with whitespace
      page.content = page.content.replace(/^(\S.*)<!-- toc -->(.*)$/m, '$1<!-- rawtoc -->$2');
      page.content = toc.insert(page.content, {
        slugify: function (str) {
          // handle '{#foo-bar}' syntax (urls)
          var m = str.match(/\{#([^\}]+)\}\s*$/);
          return m ? m[1].trim() : slug(str);
        },
        maxdepth: _maxdepth
      });
      page.content = page.content.replace('<!-- rawtoc -->', '<!-- toc -->');

      // handle '{#foo-bar}' syntax (names)
      var parts = page.content.split('<!-- tocstop -->');
      parts[0] = parts[0].replace(
        /\[([^\]\{]+)\{#([^\}]+)\}\]\(#([^\)]+)\)/g,
        function(a, b, c, d) { return c != d ? a : ('[' + b.trim() + '](#' + c + ')'); });
      page.content = parts.join('<!-- tocstop -->');

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
