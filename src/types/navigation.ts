import { NavigationProp } from "@react-navigation/native";

type AuthStack = {
  Login: undefined;
  Register: undefined;
  PasswordRecovery: undefined;
};

type AuthNavigation = NavigationProp<AuthStack>;

type LoggedStack = {
  Home: undefined;
  Profile: undefined;
};

type LoggedNavigation = NavigationProp<LoggedStack>;


export { AuthStack, AuthNavigation, LoggedStack, LoggedNavigation };