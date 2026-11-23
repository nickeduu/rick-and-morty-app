import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Carregando, Erro } from '../components/Estado';
import { buscarPersonagem, buscarVarios } from '../services/api';
import { cores, corDoStatus, traduzirStatus, traduzirGenero } from '../theme';

function Info({ titulo, valor }) {
  return (
    <View style={styles.infoLinha}>
      <Text style={styles.infoTitulo}>{titulo}</Text>
      <Text style={styles.infoValor}>{valor}</Text>
    </View>
  );
}

export default function DetalhePersonagemScreen({ route, navigation }) {
  const { id } = route.params;
  const [personagem, setPersonagem] = useState(null);
  const [episodios, setEpisodios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  async function carregar() {
    try {
      setCarregando(true);
      setErro(false);
      const dados = await buscarPersonagem(id);
      const listaEpisodios = await buscarVarios('episode', dados.episode);
      setPersonagem(dados);
      setEpisodios(listaEpisodios);
    } catch (e) {
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [id]);

  if (carregando) return <Carregando />;
  if (erro || !personagem) return <Erro onTentarNovamente={carregar} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Image source={{ uri: personagem.image }} style={styles.imagem} />

      <Text style={styles.nome}>{personagem.name}</Text>

      <View style={styles.linhaStatus}>
        <View style={[styles.bolinha, { backgroundColor: corDoStatus(personagem.status) }]} />
        <Text style={styles.status}>{traduzirStatus(personagem.status)}</Text>
      </View>

      <View style={styles.card}>
        <Info titulo="Espécie" valor={personagem.species} />
        {personagem.type ? <Info titulo="Tipo" valor={personagem.type} /> : null}
        <Info titulo="Gênero" valor={traduzirGenero(personagem.gender)} />
        <Info titulo="Origem" valor={personagem.origin.name} />
        <Info titulo="Localização atual" valor={personagem.location.name} />
      </View>

      <Text style={styles.subtitulo}>Episódios ({episodios.length})</Text>

      {episodios.map((ep) => (
        <TouchableOpacity
          key={ep.id}
          style={styles.episodio}
          onPress={() => navigation.push('DetalheEpisodio', { id: ep.id, nome: ep.name })}
        >
          <Text style={styles.codigo}>{ep.episode}</Text>
          <Text style={styles.nomeEpisodio} numberOfLines={1}>
            {ep.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    padding: 16,
  },
  imagem: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: cores.destaque,
    marginTop: 8,
  },
  nome: {
    color: cores.texto,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
  },
  linhaStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  bolinha: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  status: {
    color: cores.texto,
    fontSize: 16,
  },
  card: {
    backgroundColor: cores.card,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  infoLinha: {
    paddingVertical: 6,
  },
  infoTitulo: {
    color: cores.textoSecundario,
    fontSize: 12,
  },
  infoValor: {
    color: cores.texto,
    fontSize: 15,
  },
  subtitulo: {
    color: cores.destaque,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  episodio: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.card,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  codigo: {
    color: cores.destaque,
    fontWeight: 'bold',
    width: 70,
  },
  nomeEpisodio: {
    color: cores.texto,
    flex: 1,
  },
});
