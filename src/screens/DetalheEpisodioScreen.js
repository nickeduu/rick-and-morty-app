import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Carregando, Erro } from '../components/Estado';
import { buscarEpisodio, buscarVarios } from '../services/api';
import { cores, corDoStatus } from '../theme';

export default function DetalheEpisodioScreen({ route, navigation }) {
  const { id } = route.params;
  const [episodio, setEpisodio] = useState(null);
  const [personagens, setPersonagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  async function carregar() {
    try {
      setCarregando(true);
      setErro(false);
      const dados = await buscarEpisodio(id);
      const elenco = await buscarVarios('character', dados.characters);
      setEpisodio(dados);
      setPersonagens(elenco);
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
  if (erro || !episodio) return <Erro onTentarNovamente={carregar} />;

  const cabecalho = (
    <View style={styles.cabecalho}>
      <Text style={styles.codigo}>{episodio.episode}</Text>
      <Text style={styles.nome}>{episodio.name}</Text>
      <Text style={styles.data}>Exibido em: {episodio.air_date}</Text>
      <Text style={styles.subtitulo}>Personagens ({personagens.length})</Text>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={personagens}
      keyExtractor={(item) => String(item.id)}
      numColumns={3}
      ListHeaderComponent={cabecalho}
      contentContainerStyle={{ padding: 12, paddingBottom: 30 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.push('DetalhePersonagem', { id: item.id, nome: item.name })}
        >
          <Image
            source={{ uri: item.image }}
            style={[styles.foto, { borderColor: corDoStatus(item.status) }]}
          />
          <Text style={styles.nomePersonagem} numberOfLines={2}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  cabecalho: {
    marginBottom: 8,
  },
  codigo: {
    color: cores.destaque,
    fontSize: 16,
    fontWeight: 'bold',
  },
  nome: {
    color: cores.texto,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  data: {
    color: cores.textoSecundario,
    fontSize: 14,
    marginTop: 4,
    marginBottom: 20,
  },
  subtitulo: {
    color: cores.destaque,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    flex: 1 / 3,
    alignItems: 'center',
    marginBottom: 16,
  },
  foto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
  },
  nomePersonagem: {
    color: cores.texto,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 4,
  },
});
