```javascript
const scrollTop =
  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
const scrollLeft =
  window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
```

| API                                  | Chrome 68 | IE 11 | EDGE 42 |
| :----------------------------------- | :-------: | :---: | :-----: |
| `window.pageYOffset`                 |   true    | true  |  true   |
| `document.documentElement.scrollTop` |   true    | true  |  false  |
| `document.body.scrollTop`            |   false   | false |  true   |

## 参考

- [Window.scrollY - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollY)
