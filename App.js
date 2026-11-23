import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import PersonagensScreen from './src/screens/PersonagensScreen';
import DetalhePersonagemScreen from './src/screens/DetalhePersonagemScreen';
import EpisodiosScreen from './src/screens/EpisodiosScreen';
import DetalheEpisodioScreen from './src/screens/DetalheEpisodioScreen';
import { cores } from './src/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const opcoesHeader = {
  headerStyle: { backgroundColor: cores.card },
  headerTintColor: cores.destaque,
  headerTitleStyle: { color: cores.texto },
};

function Abas() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...opcoesHeader,
        tabBarStyle: { backgroundColor: cores.card, borderTopColor: cores.fundo },
        tabBarActiveTintColor: cores.destaque,
        tabBarInactiveTintColor: cores.textoSecundario,
        tabBarIcon: ({ color, size }) => {
          const icone = route.name === 'Personagens' ? 'people' : 'tv';
          return <Ionicons name={icone} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Personagens" component={PersonagensScreen} />
      <Tab.Screen name="Episodios" component={EpisodiosScreen} options={{ title: 'Episódios' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{ ...opcoesHeader, contentStyle: { backgroundColor: cores.fundo } }}
      >
        <Stack.Screen name="Inicio" component={Abas} options={{ headerShown: false }} />
        <Stack.Screen
          name="DetalhePersonagem"
          component={DetalhePersonagemScreen}
          options={({ route }) => ({ title: route.params.nome })}
        />
        <Stack.Screen
          name="DetalheEpisodio"
          component={DetalheEpisodioScreen}
          options={({ route }) => ({ title: route.params.nome })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
