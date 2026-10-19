# Landing page premium: Arquiteta Camila Jales (Paraíba)

Crie do zero uma landing page premium, pronta para produção, para a arquiteta e urbanista Camila Jales, da Paraíba, que faz projetos autorais no Brasil e no exterior. Público: famílias que esperam um bebê, casais montando a casa e empresas que querem um ponto comercial com identidade. Objetivo: o visitante se encanta com os projetos e chama no WhatsApp já dizendo que tipo de projeto quer. Não pergunte nada: onde faltar dado, use o marcador indicado e siga.

## 0. ANTES DE CODAR
1. Leia `INFORMACOES.md` e `referencias/LEIA.md` e olhe com atenção as imagens de `referencias/` (ref2 manda no hero, ref1 na estrutura) e todas as fotos de `1-hero/`, `2-sobre/` e `4-projetos/`.
2. Use as skills de `.claude/skills/`: landing-page-guide-v2 para a estrutura; design-taste-frontend e frontend-design para a direção visual; copywriting para os textos; emil-design-eng para animações; impeccable e web-design-guidelines para revisar tudo no final.

## 1. CONVERSÃO
WhatsApp numa constante única no topo do `script.js`: `const WHATSAPP = "5583981271525";`
Todo botão abre o WhatsApp com mensagem pronta. A peça central é o quiz "Qual é o seu projeto?".

## 2. IDENTIDADE
- Paleta: terracota #9A4E33 (principal), marrom café #3B2A22, creme #F4EDE4 (fundo), rosa queimado #D9A99A e madeira clara #C9A27A só em detalhes.
- Tipografia (Google Fonts): títulos em "Cormorant Garamond" 500/600 com uma palavra em itálico terracota; texto em "Inter".
- Logo: monograma "CJ" em SVG, serifado, versão terracota e versão creme. Marque `<!-- CONFIRMAR LOGO OFICIAL -->`.
- Clima de revista de decoração: muito respiro, fotos grandes, cantos levemente arredondados, fio fino terracota como grafismo.

## 3. SEÇÕES, NA ORDEM
1. **Topo**: monograma, links (Projetos, Como funciona, Sobre, Contato) e botão "Iniciar meu projeto". Fundo creme com blur ao rolar.
2. **Hero** com o vídeo pronto, sem áudio: `0-video/hero.mp4` (1280x720) e `0-video/hero-mobile.mp4` (720x1280), com `hero-poster.jpg` e `hero-mobile-poster.jpg`. Copie para `assets/` sem recomprimir. Duas `<source>` por media query, autoplay, muted, loop, playsinline, poster. Overlay creme suave só onde tiver texto.
   - Composição no estilo da `ref2` (veja `referencias/LEIA.md`): a palavra "JALES" enorme em sans clara (creme) atravessando o hero, atrás do berço, e por cima, em script elegante terracota, a palavra "afeto". No celular, a palavra fica menor e no topo, sem cobrir o berço.
   - Card de vidro (estilo `ref2`) ligado por uma linha fina a um ponto no berço, com a ficha: "Projeto: Baby room · Estilo: autoral, botânico · Local: Paraíba". Marque `<!-- CONFIRMAR DADOS DO PROJETO -->`.
   - Topo com botões em pílula e contorno fino, como na `ref1`.
   - Etiqueta: "ARQUITETA E URBANISTA · CASACOR PARAÍBA 2026"
   - Título (H1, menor que a palavra gigante): "Arquitetura com *identidade* e afeto."
   - Subtítulo: "Projetos autorais de interiores, quartos de bebê e espaços comerciais, na Paraíba e à distância para todo o Brasil e o exterior."
   - Botões: "Iniciar meu projeto" (rola até o quiz) e "Falar no WhatsApp".
3. **Faixa de especialidades**: Quartos de bebê · Interiores residenciais · Closets e suítes · Projetos comerciais · Flats e hotelaria · Móveis.
4. **Projetos** no estilo da seção escura da `ref1`: fundo marrom café, uma foto grande central de cantos bem arredondados e as outras menores dos lados, cada uma com tag em pílula ("residencial", "infantil", "comercial") e legenda curta. Título em duas cores: "Projetos que *contam histórias*". Fotos:
   - `4-projetos/baby-room-armario-canelado.jpg` "Baby room com armário canelado"
   - `4-projetos/quarto-infantil-maria-melina.jpg` "O mundo cor de rosa da Maria Melina"
   - `4-projetos/closet-casal-integrado.jpg` "Closet do casal, integrado à suíte"
   - `4-projetos/master-suite-painel-madeira.jpg` "Master suite"
   - `4-projetos/fachada-comercial-vitoria-pharma.jpg` "Fachada comercial, Vitória Pharma"
   - `4-projetos/loja-otica-mylan-eyewear.jpg` "Loja Mylan Eyewear"
   Clique abre a foto em tela cheia (lightbox acessível).
5. **Quiz "Qual é o seu projeto?"** (um passo por tela, barra de progresso terracota):
   - Passo 1: Quarto de bebê ou infantil · Casa ou apartamento · Closet ou suíte · Projeto comercial · Flat ou hotelaria · Móveis
   - Passo 2, fase: Ainda na planta · Em obra · Imóvel pronto
   - Passo 3, onde fica: Paraíba · Outra cidade do Brasil · Exterior
   - Passo 4: nome e, para quarto de bebê, "previsão de chegada do bebê" (mês)
   - Fim: resumo e botão "Enviar para a Camila", com a mensagem:
     ```
     Olá, Camila! Vim pelo site.
     Nome: [nome]
     Projeto: [tipo] | Fase: [fase]
     Local: [local]
     [Previsão do bebê: mês]
     ```
6. **Projeto à distância, do Brasil ao exterior** (seção da dor): texto curto dizendo que dá para ter um projeto autoral sem estar na mesma cidade, e o passo a passo: conversa por vídeo, briefing com medidas e fotos do espaço, projeto em 3D para aprovar cada ambiente, entrega com detalhamento para a obra. Botão "Quero um projeto à distância". Sem prometer prazo ou preço.
7. **Quarto de bebê no tempo certo**: bloco curto e afetivo para gestantes, com `1-hero/baby-room-lavinia.jpg`, dizendo que o ideal é começar o projeto com antecedência para o quarto ficar pronto antes da chegada. Botão "Planejar o quarto do meu bebê". <!-- CONFIRMAR prazo médio com a Camila antes de citar números -->
8. **Como funciona** em 3 passos: Conversa e briefing · Projeto em 3D · Entrega e acompanhamento.
9. **Sobre a Camila**: foto `2-sobre/camila-jales-retrato.jpg` em moldura arredondada (tamanho médio, a foto original é pequena; sem esticar), título "Arquitetura, *identidade* & experiência", texto curto: arquiteta e urbanista, à frente do Studio Home Camila Jales desde 2015, CASACOR Paraíba 2026, projetos no Brasil e no exterior. Marque `<!-- CONFIRMAR CAU -->`.
10. **Depoimentos**: espaço para 3 depoimentos reais, com `<!-- TROCAR POR DEPOIMENTOS REAIS DO DESTAQUE "DEPOIMENTOS" -->`. Não invente textos: deixe os cards com o marcador e esconda a seção se estiver vazia.
11. **Chamada final**: fundo terracota, "Seu próximo ambiente começa com uma *conversa*." e botão "Iniciar meu projeto".
12. **Rodapé**: monograma, Camila Jales arquiteta e urbanista, CAU (marcador), cidade (`<!-- CONFIRMAR CIDADE -->`), WhatsApp (83) 98127-1525, e-mail studiohomecj@gmail.com, Instagram @arquitetacamilajales, ano automático.
13. **Botão flutuante de WhatsApp** depois do hero ("Olá, Camila! Vim pelo site e quero iniciar um projeto.").

## 4. ANIMAÇÕES
Entradas suaves com fade e leve subida, galeria com revelação em cascata, fio terracota que se desenha ao rolar, transição deslizante entre os passos do quiz. Nada chamativo. Respeitar `prefers-reduced-motion`.

## 5. TÉCNICO
- HTML, CSS e JS puro, sem build: `index.html`, `styles.css`, `script.js`, `assets/`. Caminhos relativos. Funciona na Vercel.
- Converta as fotos para WebP com srcset e lazy loading (menos a do hero).
- Mobile first; testar em 360, 390, 768, 1440 e 1920px; sem rolagem horizontal.
- Meta tags, Open Graph 1200x630 (foto do baby room com o monograma, para a prévia no WhatsApp), favicon com o monograma, JSON-LD de LocalBusiness (arquitetura).
- Acessibilidade AA e Lighthouse 90+.
- `.gitignore` e `README.md` curto com o deploy na Vercel.

## 6. SEM CARA DE IA
- Proibido travessão (o caractere "—") em qualquer texto. Usar vírgula, ponto ou dois-pontos.
- Proibido emoji no layout.
- Proibidas frases clichê: "transformando sonhos em realidade", "excelência e qualidade", "soluções inovadoras", "sua melhor escolha", "projetos que encantam".
- Textos curtos e concretos. Nunca inventar números, prêmios, depoimentos ou anos de experiência além do que está em `INFORMACOES.md`.
- Nada de gradiente roxo, cards todos iguais ou ícones de banco de imagem.

## 7. ANTES DE ENTREGAR
1. Screenshots da página inteira em 390px e 1440px; revisar e corrigir.
2. Testar o quiz com cada tipo de projeto e conferir a mensagem do WhatsApp.
3. Procurar "—" e emojis em todos os arquivos e remover.
4. Listar os marcadores TROCAR e CONFIRMAR.
5. Commit inicial: "Site Camila Jales Arquitetura".
