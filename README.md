# gitbook-plugin-etoc

[![npm](https://img.shields.io/npm/v/gitbook-plugin-etoc.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-etoc) [![npm](https://img.shields.io/npm/dm/gitbook-plugin-etoc.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-etoc) [![npm](https://img.shields.io/npm/dt/gitbook-plugin-etoc.svg?style=plastic)](https://npmjs.org/package/gitbook-plugin-etoc)

This plugin will add table of content to the page automatically.
When you build the book, it will insert a table of content automatically or to place where you insert `<!-- toc -->`. Sometimes you may want to disable toc on some page, just add `<!-- notoc -->` on the the markdown page.

Demo site ==> https://yuanbin.gitbooks.io/test/content/

## Sample

![screenshot 2016-09-13 23 21 36](https://cloud.githubusercontent.com/assets/1292567/18479788/e05bf126-7a08-11e6-83b4-0322d20fcd94.png)

## Config

Add `etoc` in `book.json` is enough for most users.

```
{
  "plugin": ["etoc"]
}
```

It will add toc automatically if the markdown page meets following requirements.

- `###` header3 - `mindepth` required to generate toc
- `##` number of header2 greater or equal than lower bound(3 by default, controled by `h2lb`)

The maxdepth of toc is `####` header4 by default. You can also change the default parameter such as:
```
{
  "plugins": [
    "etoc"
  ],
  "pluginsConfig": {
    "etoc": {
      "h2lb": 3,
      "mindepth": 3,
      "maxdepth": 4,
      "notoc": false
    }
  }
}
```

The configuration json schema can be found in [gitbook-plugin-etoc/package.json](https://github.com/billryan/gitbook-plugin-etoc/blob/master/package.json)

## LICENSE

MIT
