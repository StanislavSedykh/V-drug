import { StyleSheet } from "react-native";
import Navigation from "./components/Navigation";
import { Provider } from "react-redux";
import store from "./features/redux/store";
import axios from "axios";

const ws = new WebSocket("ws://localhost:3001");

axios.defaults.withCredentials = true;

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />;
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
