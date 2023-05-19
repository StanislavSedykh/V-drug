import { StyleSheet, Text, View } from "react-native";
import Navigation from "./components/Navigation";
import { useEffect } from "react";
import axios from "axios";
const ws = new WebSocket("ws://localhost:3000");


export default function App() {
  useEffect(() => {
    axios('http://localhost:3000/ololo')
  });
  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
