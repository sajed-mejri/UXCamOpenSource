import { useState, useRef } from 'react';
import { TextInput, TouchableOpacity, Text, View } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { SafeScreen } from '@/components/templates';
import { useTheme } from '@/theme';
import type { RootScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';

function Login({ navigation }: RootScreenProps<Paths.Login>) {
  const { layout, gutters, fonts } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef<View | null>(null);

  const handleLogin = () => {
    try {
      RNUxcam.logEvent('Login_Submitted', {
        username,
        timestamp: Date.now(),
      });
    } catch (e) {
      console.error('UXCam error on login:', e);
    }
  
    navigation.replace(Paths.Example, {
        user: { id: 1, name: 'Sajed' }, // or real user data
      });
  };

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
          gutters.paddingHorizontal_32,
        ]}
      >
        <Text style={[fonts.size_24, fonts.bold, gutters.marginBottom_24]}>
          Login
        </Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={[gutters.marginBottom_16]}
        />

<View
  collapsable={false}
  ref={ref => {
    passwordRef.current = ref;
    if (ref) RNUxcam.occludeSensitiveView(ref);
  }}
>
  <TextInput
    placeholder="Password"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
    style={[gutters.marginBottom_24]}
  />
</View>

        <TouchableOpacity
          onPress={handleLogin}
          style={[layout.itemsCenter]}
        >
          <Text style={[fonts.size_16]}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
}

export default Login;
