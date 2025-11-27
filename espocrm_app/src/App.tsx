import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { ApiProvider } from './providers/ApiProvider';
import { LoginScreen } from './screens/LoginScreen';
import { LeadListScreen } from './screens/LeadListScreen';

export const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <ApiProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          {loggedIn ? (
            <LeadListScreen onLogout={() => setLoggedIn(false)} />
          ) : (
            <LoginScreen onSuccess={() => setLoggedIn(true)} />
          )}
        </View>
      </SafeAreaView>
    </ApiProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
