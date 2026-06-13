# Siteyi Baskalariyla Paylasma

`localhost` linki baskalarinda acilmaz. `localhost:3000`, linke tiklayan kisinin kendi bilgisayarini ifade eder. Siteyi paylasmak icin asagidaki yollardan biri gerekir.

## 1. Ayni Wi-Fi / ayni yerel ag

Uygulamayi tum ag arayuzlerine ac:

```bash
npm run dev:lan
```

Sonra kendi bilgisayarinin yerel IP adresini bul ve linki su formatta paylas:

```text
http://BILGISAYAR_IP_ADRESIN:3000
```

Ornek:

```text
http://192.168.1.42:3000
```

Not: Windows Firewall 3000 portunu engelliyorsa izin vermek gerekir.

## 2. Internet uzerinden herkes acsin

Ayni agda olmayan kisiler icin en dogru cozum deploy etmektir:

```bash
npm run build
```

Sonra projeyi Vercel, Render, Netlify veya kendi sunucuna yukle. Next.js icin en kolay secenek Vercel'dir.

## 3. Gecici demo linki / tunnel

Deploy yapmadan gecici bir public link icin ngrok veya Cloudflare Tunnel kullan:

```bash
npm run dev:lan
ngrok http 3000
```

veya:

```bash
npm run dev:lan
cloudflared tunnel --url http://localhost:3000
```

Tunnel/proxy domaini nedeniyle Next.js gelistirme sunucusu `_next/*` dosyalarinda cross-origin uyarisi veya engeli verirse, sunucuyu baslatmadan once domaini izin listesine ekle:

```bash
ALLOWED_DEV_ORIGINS=abc123.ngrok-free.app npm run dev:lan
```

Windows PowerShell icin:

```powershell
$env:ALLOWED_DEV_ORIGINS="abc123.ngrok-free.app"; npm run dev:lan
```

Birden fazla domain:

```powershell
$env:ALLOWED_DEV_ORIGINS="abc123.ngrok-free.app,preview.example.com"; npm run dev:lan
```

## Ozet

- Sadece kendi bilgisayarinda: `http://localhost:3000`
- Ayni agdaki birine: `npm run dev:lan` ve `http://yerel-ip:3000`
- Herkese acik link: deploy veya tunnel gerekir
