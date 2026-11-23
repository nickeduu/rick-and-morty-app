export const cores = {
  fundo: '#1B1F24',
  card: '#272B33',
  texto: '#F5F5F5',
  textoSecundario: '#9E9E9E',
  destaque: '#97CE4C',
  vivo: '#55CC44',
  morto: '#D63D2E',
  desconhecido: '#9E9E9E',
};

export function corDoStatus(status) {
  if (status === 'Alive') return cores.vivo;
  if (status === 'Dead') return cores.morto;
  return cores.desconhecido;
}

export function traduzirStatus(status) {
  if (status === 'Alive') return 'Vivo';
  if (status === 'Dead') return 'Morto';
  return 'Desconhecido';
}

export function traduzirGenero(genero) {
  const generos = {
    Male: 'Masculino',
    Female: 'Feminino',
    Genderless: 'Sem gênero',
    unknown: 'Desconhecido',
  };
  return generos[genero] || genero;
}
