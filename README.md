# AI Text Assistant website

Static English and Chinese website for AI Text Assistant for Windows.

- English: https://fasterate.github.io/
- 中文: https://fasterate.github.io/zh/
- Terms of service: https://fasterate.github.io/terms/
- 服务条款: https://fasterate.github.io/zh/terms/
- Desktop application and downloads: https://github.com/0x140ED8/intelligent-writing-free

## Deploy

In repository **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.
The **Deploy project page** workflow publishes `page/` after changes are pushed to `main`.
It can also be started manually from the Actions tab. No build step is required.

## Preview locally

```sh
python -m http.server 8080 --directory page --bind 127.0.0.1
```

Open http://127.0.0.1:8080/ or http://127.0.0.1:8080/zh/.
