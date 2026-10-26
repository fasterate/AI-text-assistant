# AI Text Assistant website

Static English and Chinese website for AI Text Assistant for Windows.

- English: https://fasterate.github.io/
- 中文: https://fasterate.github.io/zh/
- Pricing and feature comparison: https://fasterate.github.io/#pricing
- 价格与版本对照: https://fasterate.github.io/zh/#pricing
- Terms of service: https://fasterate.github.io/terms/
- 服务条款: https://fasterate.github.io/zh/terms/
- Privacy policy: https://fasterate.github.io/privacy/
- 隐私政策: https://fasterate.github.io/zh/privacy/
- Desktop application and downloads: https://github.com/0x140ED8/intelligent-writing-free

Free software: USD 0. Paid: USD 5 once for the licensed device, including perpetual use and all future publicly released version updates on that device. Paid adds personalized themes, local OCR, screenshot input, the shortcut wheel, and quick scenario switching. Model API charges are separate.

Official customer support for orders and product questions: lj188640@gmail.com. This address is displayed in every page footer. The Paid purchase inquiry button leads to this contact; no payment checkout URL has been supplied.

## Deploy

In repository **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.
The **Deploy project page** workflow publishes `page/` after changes are pushed to `main`.
It can also be started manually from the Actions tab. No build step is required.

## Preview locally

```sh
python -m http.server 8080 --directory page --bind 127.0.0.1
```

Open http://127.0.0.1:8080/ or http://127.0.0.1:8080/zh/.
