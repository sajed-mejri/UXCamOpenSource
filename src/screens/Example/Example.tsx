import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import RNUxcam from 'react-native-ux-cam';

import { useI18n } from '@/hooks';
import { useTheme } from '@/theme';
import { AssetByVariant, IconByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import type { RootScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';

function Example({ route }: RootScreenProps<Paths.Example>) {
  const { t } = useTranslation();
  const { toggleLanguage } = useI18n();
  const {
    backgrounds,
    changeTheme,
    colors,
    components,
    fonts,
    gutters,
    layout,
    variant,
  } = useTheme();

  const { user } = route.params || {};

  useEffect(() => {
    RNUxcam.tagScreenName('Example');
    RNUxcam.setUserIdentity(user.name);
    RNUxcam.setUserProperty('user_id', user.id.toString());

    Alert.alert(t('screen_example.hello_user', { name: user.name }));
  }, [user, t]);

  const handleSend = () => {
    try {
      RNUxcam.logEvent('Send_Message_Clicked', { user_id: user.id });
    } catch (e) {
      console.error('UXCam error:', e);
    }
  };

  const handleChangeTheme = () => {
    try {
      RNUxcam.logEvent('Change_Theme_Clicked', 'Theme change button clicked');
    } catch (e) {
      console.error('UXCam error:', e);
    }
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  const handleChangeLanguage = () => {
    try {
      RNUxcam.logEvent('Change_Language_Clicked', 'Language change button clicked');
    } catch (e) {
      console.error('UXCam error:', e);
    }
    toggleLanguage();
  };

  return (
    <SafeScreen>
      <ScrollView>
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.marginTop_80,
          ]}
        >
          <View
            style={[layout.relative, backgrounds.gray100, components.circle250]}
          />
          <View style={[layout.absolute, gutters.paddingTop_80]}>
            <AssetByVariant
              path="tom"
              resizeMode="contain"
              style={{ height: 300, width: 300 }}
            />
          </View>
        </View>

        <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
          <View style={[gutters.marginTop_40]}>
            <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
              {t('screen_example.title')}
            </Text>
            <Text
              style={[fonts.size_16, fonts.gray200, gutters.marginBottom_40]}
            >
              {t('screen_example.description')}
            </Text>
          </View>

          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.fullWidth,
              gutters.marginTop_16,
            ]}
          >
            <TouchableOpacity
              onPress={handleSend}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="fetch-user-button"
            >
              <IconByVariant path="send" stroke={colors.purple500} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleChangeTheme}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-theme-button"
            >
              <IconByVariant path="theme" stroke={colors.purple500} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleChangeLanguage}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-language-button"
            >
              <IconByVariant path="language" stroke={colors.purple500} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
