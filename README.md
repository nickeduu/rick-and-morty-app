# Rick and Morty App

Trabalho da disciplina de Programação Mobile (ADS - 5º semestre).

App feito em React Native com Expo que consome a [Rick and Morty API](https://rickandmortyapi.com/) para listar os personagens e episódios da série.

## Integrantes

- Nicolas Pupo
- Fernando Fonseca

## Telas

1. **Personagens** - lista todos os personagens com rolagem infinita, campo de busca pelo nome e filtro por status (vivo, morto ou desconhecido).
2. **Detalhes do personagem** - mostra foto, status, espécie, gênero, origem, localização atual e a lista de episódios em que o personagem aparece.
3. **Episódios** - lista todos os episódios com busca pelo nome, mostrando temporada, número e data de exibição.
4. **Detalhes do episódio** - mostra as informações do episódio e todos os personagens que aparecem nele.

A navegação entre Personagens e Episódios é feita por abas na parte de baixo da tela. Dá pra ir do personagem para um episódio e do episódio para outro personagem.

## Tecnologias

- React Native
- Expo
- React Navigation (stack e bottom tabs)
- Fetch API para as requisições

## Como rodar

Precisa ter o Node.js instalado.

```bash
git clone <url-do-repositorio>
cd rick-and-morty-app
npm install
npx expo start
```

Depois é só ler o QR Code com o app **Expo Go** no celular. Também dá pra abrir no navegador apertando `w` no terminal.

## Estrutura

```
src/
  components/   -> componentes reutilizados (card do personagem, loading e erro)
  screens/      -> telas do app
  services/     -> funções que chamam a API
  theme.js      -> cores e funções de tradução dos dados
```
