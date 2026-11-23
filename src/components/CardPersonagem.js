import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { cores, corDoStatus, traduzirStatus } from '../theme';

export default function CardPersonagem({ personagem, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: personagem.image }} style={styles.imagem} />

      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={1}>
          {personagem.name}
        </Text>

        <View style={styles.linhaStatus}>
          <View style={[styles.bolinha, { backgroundColor: corDoStatus(personagem.status) }]} />
          <Text style={styles.texto}>
            {traduzirStatus(personagem.status)} - {personagem.species}
          </Text>
        </View>

        <Text style={styles.label}>Última localização:</Text>
        <Text style={styles.texto} numberOfLines={1}>
          {personagem.location.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: cores.card,
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
  imagem: {
    width: 110,
    height: 110,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  nome: {
    color: cores.texto,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  linhaStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bolinha: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 6,
  },
  label: {
    color: cores.textoSecundario,
    fontSize: 12,
  },
  texto: {
    color: cores.texto,
    fontSize: 14,
  },
});
