# gitbook-plugin-etoc

[![npm](https://img.shields.io/npm/v/gitbook-plugin-etoc.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-etoc) [![npm](https://img.shields.io/npm/dm/gitbook-plugin-etoc.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-etec) [![npm](https://img.shields.io/npm/dt/gitbook-plugin-etoc.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-etoc)

This plugin will add table of content to the page.
When you build the book, it will insert a table of content automatically or to place where you insert `<!-- toc -->`

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

## LICENSE

MIT
