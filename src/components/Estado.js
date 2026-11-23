import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { cores } from '../theme';

export function Carregando() {
  return (
    <View style={styles.centro}>
      <ActivityIndicator size="large" color={cores.destaque} />
    </View>
  );
}

export function Erro({ mensagem, onTentarNovamente }) {
  return (
    <View style={styles.centro}>
      <Text style={styles.texto}>{mensagem || 'Não foi possível carregar os dados.'}</Text>
      {onTentarNovamente && (
        <TouchableOpacity style={styles.botao} onPress={onTentarNovamente}>
          <Text style={styles.textoBotao}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cores.fundo,
    padding: 20,
  },
  texto: {
    color: cores.texto,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  botao: {
    backgroundColor: cores.destaque,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotao: {
    color: cores.fundo,
    fontWeight: 'bold',
  },
});
