# gitbook-plugin-etoc

[![npm](https://img.shields.io/npm/v/gitbook-plugin-etoc.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-etoc) [![npm](https://img.shields.io/npm/dm/gitbook-plugin-etoc.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-etec) [![npm](https://img.shields.io/npm/dt/gitbook-plugin-atoc.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-etoc)

This plugin will add table of content to the page and provide navigation function inside a page.

When you build the book, it will insert a table of content automatically or to place where you insert `<!-- toc -->`

`book.json` Config:

```
{
	"plugine": ["atoc"],
	"pluginsConfig": {
		"etoc": {
			"addClass": true
			"className": "etoc"
		}
	}
}
```

You can add this config to add a HTML ClassName to the TOC `ul` element

## LICENSE

MIT
