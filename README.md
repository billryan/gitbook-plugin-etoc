# gitbook-plugin-etoc

[![npm](https://img.shields.io/npm/v/gitbook-plugin-etoc.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-etoc) [![npm](https://img.shields.io/npm/dm/gitbook-plugin-etoc.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-etec) [![npm](https://img.shields.io/npm/dt/gitbook-plugin-etoc.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-etoc)

This plugin will add table of content to the page.
When you build the book, it will insert a table of content automatically or to place where you insert `<!-- toc -->`

## Sample

![screenshot 2016-09-07 23 00 26](https://cloud.githubusercontent.com/assets/1292567/18316915/f26e401c-754e-11e6-9a63-ec3763e4e385.png)

## Config

`book.json` Config:

```
{
  "plugin": ["etoc"]
}
```

You can also config some parameter such as:
```
{
  "plugins": [
    "etoc"
  ],
  "pluginsConfig": {
    "etoc": {
      "mindepth": 3,
      "maxdepth": 4,
      "notoc": false
    }
  }
}
```

```
"gitbook": {
		"properties": {
				"mindepth": {
						"type": "number",
						"description": "minimal heading level required to generate toc",
						"default": 3
				},
				"maxdepth": {
						"type": "number",
						"description": "maximal heading level to generate toc",
						"default": 4
				},
				"notoc": {
						"type": "boolean",
						"description": "whether to generate toc automatically",
						"default": false
				}
		}
}
```

## LICENSE

MIT
