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
import CardPersonagem from '../components/CardPersonagem';
import { Carregando, Erro } from '../components/Estado';
import { buscarPersonagens } from '../services/api';
import { cores } from '../theme';

const FILTROS = [
  { label: 'Todos', valor: '' },
  { label: 'Vivos', valor: 'alive' },
  { label: 'Mortos', valor: 'dead' },
  { label: 'Desconhecido', valor: 'unknown' },
];

export default function PersonagensScreen({ navigation }) {
  const [personagens, setPersonagens] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [temMais, setTemMais] = useState(true);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState(false);
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState('');

  async function carregar(paginaAtual, nome, filtroStatus) {
    try {
      setErro(false);
      const dados = await buscarPersonagens(paginaAtual, nome, filtroStatus);

      if (paginaAtual === 1) {
        setPersonagens(dados.results);
      } else {
        setPersonagens((anteriores) => [...anteriores, ...dados.results]);
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

  // espera o usuario parar de digitar antes de buscar
  useEffect(() => {
    setCarregando(true);
    const timer = setTimeout(() => {
      carregar(1, busca, status);
    }, 500);

    return () => clearTimeout(timer);
  }, [busca, status]);

  function carregarProximaPagina() {
    if (carregandoMais || !temMais || carregando) return;
    setCarregandoMais(true);
    carregar(pagina + 1, busca, status);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.busca}
        placeholder="Buscar personagem..."
        placeholderTextColor={cores.textoSecundario}
        value={busca}
        onChangeText={setBusca}
      />

      <View style={styles.filtros}>
        {FILTROS.map((filtro) => (
          <TouchableOpacity
            key={filtro.valor}
            style={[styles.filtro, status === filtro.valor && styles.filtroAtivo]}
            onPress={() => setStatus(filtro.valor)}
          >
            <Text style={[styles.textoFiltro, status === filtro.valor && styles.textoFiltroAtivo]}>
              {filtro.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {carregando ? (
        <Carregando />
      ) : erro ? (
        <Erro
          onTentarNovamente={() => {
            setCarregando(true);
            carregar(1, busca, status);
          }}
        />
      ) : (
        <FlatList
          data={personagens}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CardPersonagem
              personagem={item}
              onPress={() =>
                navigation.navigate('DetalhePersonagem', { id: item.id, nome: item.name })
              }
            />
          )}
          onEndReached={carregarProximaPagina}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={<Text style={styles.vazio}>Nenhum personagem encontrado.</Text>}
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
    marginBottom: 10,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  filtro: {
    borderWidth: 1,
    borderColor: cores.destaque,
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 6,
  },
  filtroAtivo: {
    backgroundColor: cores.destaque,
  },
  textoFiltro: {
    color: cores.destaque,
    fontSize: 13,
  },
  textoFiltroAtivo: {
    color: cores.fundo,
    fontWeight: 'bold',
  },
  vazio: {
    color: cores.textoSecundario,
    textAlign: 'center',
    marginTop: 40,
  },
});
