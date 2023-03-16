import { Loading } from "@components/Loading";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { StatusBar } from "react-native";
import { Routes } from "./src/routes";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";

export default function App() {
  const [isFontLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {isFontLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}
