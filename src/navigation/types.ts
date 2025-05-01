import { User } from '@/hooks/domain/user/schema';
import type { Paths } from '@/navigation/paths';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type RootStackParamList = {
  [Paths.Example]: { user: User }; 
  [Paths.Login]: undefined;
  [Paths.Startup]: undefined;
};
