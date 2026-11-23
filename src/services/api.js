const BASE_URL = 'https://rickandmortyapi.com/api';

async function get(caminho) {
  const resposta = await fetch(BASE_URL + caminho);

  // a API retorna 404 quando a busca nao encontra nada
  if (resposta.status === 404) {
    return { info: { next: null, count: 0 }, results: [] };
  }

  if (!resposta.ok) {
    throw new Error('Erro ao buscar dados: ' + resposta.status);
  }

  return resposta.json();
}

export function buscarPersonagens(pagina = 1, nome = '', status = '') {
  let url = `/character/?page=${pagina}`;
  if (nome) url += `&name=${encodeURIComponent(nome)}`;
  if (status) url += `&status=${status}`;
  return get(url);
}

export function buscarPersonagem(id) {
  return get(`/character/${id}`);
}

export function buscarEpisodios(pagina = 1, nome = '') {
  let url = `/episode/?page=${pagina}`;
  if (nome) url += `&name=${encodeURIComponent(nome)}`;
  return get(url);
}

export function buscarEpisodio(id) {
  return get(`/episode/${id}`);
}

export function buscarLocais(pagina = 1) {
  return get(`/location/?page=${pagina}`);
}

// recebe uma lista de urls (ex: personagem.episode) e busca tudo numa requisicao so
export async function buscarVarios(tipo, urls) {
  if (!urls || urls.length === 0) return [];

  const ids = urls.map((url) => url.split('/').pop()).join(',');
  const dados = await get(`/${tipo}/${ids}`);

  // quando vai so um id a API devolve objeto em vez de array
  return Array.isArray(dados) ? dados : [dados];
}
