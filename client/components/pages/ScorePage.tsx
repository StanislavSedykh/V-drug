import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../features/redux/hooks";
import ButtonStandart from "../UI/ButtonStandart";

export default function ScorePage({ navigation }): JSX.Element {
  const score = useAppSelector((state) => state.game.score);
  const allPlayers = useAppSelector((state) => state.game.allPlayers);
  const trueanswers = useAppSelector((state) => state.game.trueVote);
  console.log(trueanswers.length);
  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>
        Вы ответили правильно на {score} из {allPlayers.length} вопросов
      </Text>
      {trueanswers.length === 0 ? (
        <Text style={styles.noAnswersText}>Не Ваш день</Text>
      ) : (
        trueanswers.map((el, index) => (
          <View style={styles.itemContainer} key={index}>
            <Text style={styles.factText}>✅ Факт: {el.fact.fact}</Text>
            <Text style={styles.userNameText}>Чей он: {el.user_name}</Text>
          </View>
        ))
      )}
      <ButtonStandart title="Новая игра" onPress={()=> navigation.navigate("CreateLobbyPage")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 20,
  },
  noAnswersText: {
    fontSize: 16,
    color: "red",
    fontStyle: "italic",
  },
  itemContainer: {
    flexDirection: "col",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  factText: {
    fontSize: 25,
    marginRight: 8,
  },
  userNameText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
