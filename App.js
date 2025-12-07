import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from "./src/navigation/AppNavigation";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </AuthProvider>
  );
}
