import Navigation from "./components/Navigation";
import { Provider } from "react-redux";
import store from "./features/redux/store";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
