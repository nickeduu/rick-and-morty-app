import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PersonagensScreen from './src/screens/PersonagensScreen';
import { cores } from './src/theme';

const Stack = createNativeStackNavigator();

const opcoesHeader = {
  headerStyle: { backgroundColor: cores.card },
  headerTintColor: cores.destaque,
  headerTitleStyle: { color: cores.texto },
  contentStyle: { backgroundColor: cores.fundo },
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={opcoesHeader}>
        <Stack.Screen
          name="Personagens"
          component={PersonagensScreen}
          options={{ title: 'Rick and Morty' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
