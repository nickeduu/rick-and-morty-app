import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Carregando, Erro } from '../components/Estado';
import { buscarEpisodios } from '../services/api';
import { cores } from '../theme';

export default function EpisodiosScreen({ navigation }) {
  const [episodios, setEpisodios] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [temMais, setTemMais] = useState(true);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState(false);
  const [busca, setBusca] = useState('');

  async function carregar(paginaAtual, nome) {
    try {
      setErro(false);
      const dados = await buscarEpisodios(paginaAtual, nome);

      if (paginaAtual === 1) {
        setEpisodios(dados.results);
      } else {
        setEpisodios((anteriores) => [...anteriores, ...dados.results]);
      }

      setTemMais(dados.info.next !== null);
      setPagina(paginaAtual);
    } catch (e) {
      setErro(true);
    } finally {
      setCarregando(false);
      setCarregandoMais(false);
    }
  }

  useEffect(() => {
    setCarregando(true);
    const timer = setTimeout(() => carregar(1, busca), 500);
    return () => clearTimeout(timer);
  }, [busca]);

  function carregarProximaPagina() {
    if (carregandoMais || !temMais || carregando) return;
    setCarregandoMais(true);
    carregar(pagina + 1, busca);
  }

  function renderEpisodio({ item }) {
    // codigo vem no formato S01E01
    const temporada = Number(item.episode.substring(1, 3));
    const numero = Number(item.episode.substring(4, 6));

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('DetalheEpisodio', { id: item.id, nome: item.name })}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>{item.episode}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.nome} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.detalhe}>
            Temporada {temporada} - Episódio {numero}
          </Text>
          <Text style={styles.detalhe}>{item.air_date}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.busca}
        placeholder="Buscar episódio..."
        placeholderTextColor={cores.textoSecundario}
        value={busca}
        onChangeText={setBusca}
      />

      {carregando ? (
        <Carregando />
      ) : erro ? (
        <Erro
          onTentarNovamente={() => {
            setCarregando(true);
            carregar(1, busca);
          }}
        />
      ) : (
        <FlatList
          data={episodios}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderEpisodio}
          onEndReached={carregarProximaPagina}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={<Text style={styles.vazio}>Nenhum episódio encontrado.</Text>}
          ListFooterComponent={
            carregandoMais ? <ActivityIndicator color={cores.destaque} style={{ margin: 16 }} /> : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  busca: {
    backgroundColor: cores.card,
    color: cores.texto,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.card,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  badge: {
    backgroundColor: cores.destaque,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginRight: 12,
  },
  badgeTexto: {
    color: cores.fundo,
    fontWeight: 'bold',
    fontSize: 13,
  },
  nome: {
    color: cores.texto,
    fontSize: 16,
    fontWeight: 'bold',
  },
  detalhe: {
    color: cores.textoSecundario,
    fontSize: 13,
    marginTop: 2,
  },
  vazio: {
    color: cores.textoSecundario,
    textAlign: 'center',
    marginTop: 40,
  },
});
