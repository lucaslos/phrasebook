# Desafio Front-End Voxus - Lucas Santos

[Clique aqui para acessar o PWA](https://lucassantos.net/desafio-voxus/)

Neste repositório há todo o código usado para o desenvolvimento da interface do desafio. Meu principal objetivo aqui foi demonstrar a partir do desafio como meus mais recentes projetos são desenvolvidos, buscando sempre usar o que há de mais moderno e eficiente no desenvolvimento front-end. Abaixo há um pequeno guia sobre as tecnologias e conceitos utilizados.

# Codebase

## Principais Tecnologias e Conceitos Usados

Todo o código da interface é escrito em [Typescript](https://www.typescriptlang.org/), uma espécie de Javascript com tipagem que facilita um pouco o desenvolvimento e elimina alguns vários bugs durante o desenvolvimento. Quanto a isso, vale também uma menção honrosa ao [VSCode](https://code.visualstudio.com/), que se integra perfeitamente ao Typescript. Além disso, muito do código segue a abordagem de programação funcional, buscando sempre usar funções puras e evitando ao máximo a mutabilidade dos dados.

A interface foi criada com a mais recente versão do [React](https://reactjs.org/) e usando novas funcionalidades da biblioteca, principalmente os Hooks. E para a estilização dos componentes é usado a biblioteca de CSS-in-JS [emotion](https://github.com/emotion-js/emotion). Com isso, todos os componentes tem JSX, lógica e estilo num só arquivo e de forma que é fácil buscar pelas dependências, já que tudo está interligado por meio de módulos Es6. Dessa forma é possível reforcar a atomicidade do sistema, facilitando a reutilização e escalabilidade do código.

Além disso há todo um conjunto de tecnologias por trás que facilita o desenvovilmente, como por exemplo o [Hot-reload](https://github.com/gaearon/react-hot-loader) e o [eslint](https://eslint.org/), e optimiza o código, a exemplo do Babel, Terser, etc...

Em relação ao mobile, o destaque fica para os [service workers](https://developers.google.com/web/tools/workbox/), que permitem o cache do código do aplicatio e o conceito de [PWA](https://developers.google.com/web/progressive-web-apps/), uma forma de tornar a experiência de aplicativos web mais próxima dos aplicativos nativos para smartphone.

## Estrutura das pastas
```
desafio-voxus/
├── docs          # Arquivos usados no deploy online do github pages
├── scripts       # Scripts em node.js
├── src           # Código do aplicativo em typescript
└── test          # Arquivos de teste
```

# Comandos e desenvolvimento

## Desenvolvimento

O comando `npm run dev` abre o servidor de desenvolvimento no endereço http://localhost:5000/

## Produção

O comando `npm run build` gera os arquivos de produção do app


## Teste produção

O comando `npm run serve` abre o servidor de teste da distribuição do aplictivo no endereço http://localhost:5050/
