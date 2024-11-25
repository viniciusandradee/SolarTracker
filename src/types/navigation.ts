import { NavigationProp } from "@react-navigation/native";

type AuthStack = {
  Login: undefined;
  Register: undefined;
  PasswordRecovery: undefined;
};

type AuthNavigation = NavigationProp<AuthStack>;

type LoggedDrawer = {
  Home: undefined;
  Profile: undefined;
  IAChat: undefined;
  ResidenceAddition: undefined;
  ResidenceDetails: { residenceId: string };
  SolarPanelAddition: { residenceId: string };
};

type LoggedNavigation = NavigationProp<LoggedDrawer>;


export { AuthStack, AuthNavigation, LoggedDrawer, LoggedNavigation };