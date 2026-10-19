# Camila Jales Arquitetura

Landing page da arquiteta e urbanista Camila Jales (Paraíba). HTML, CSS e JS puro, sem build.

```
index.html      página
styles.css      estilos
script.js       WhatsApp, quiz, galeria e animações
assets/         vídeo do hero, fotos em WebP, monograma, favicon e imagem de prévia
vercel.json     cache dos arquivos estáticos
```

O número do WhatsApp fica numa constante no topo do `script.js`:

```js
const WHATSAPP = "5583981271525";
```

## Rodar localmente

```bash
python3 -m http.server 8080
# abrir http://localhost:8080
```

## Deploy na Vercel

1. Em vercel.com, **Add New > Project** e importe este repositório.
2. Framework Preset: **Other**. Build Command e Output Directory: vazios (a raiz já é o site).
3. **Deploy**.
4. Com o domínio final definido, troque `https://camilajales.vercel.app/` no `index.html` (canonical, `og:url`, `og:image` e JSON-LD).

Pela linha de comando: `npx vercel` e depois `npx vercel --prod`.

O `.vercelignore` deixa de fora do site o material de briefing e as skills que estão na raiz do repositório.

## Pendências com a cliente

Procure por `CONFIRMAR` e `TROCAR` no `index.html`.
