import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../features/redux/hooks";

export default function ScorePage(): JSX.Element {
  const score = useAppSelector((state) => state.game.score);
  const allPlayers = useAppSelector((state) => state.game.allPlayers);
  const trueanswers = useAppSelector((state) => state.game.trueVote);
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {
            correct: "✅",
            name: "Alex",
            fact: "Alex is a good boy",
          },
        ]}
        style={styles.itemContainer}
        style={styles.correct}
        renderItem={({ item }) => (
          <Text style={styles.text}>
            {item.correct} name: {item.name} fact: {item.fact}
          </Text>
        )}
      />
      <Text>
        Вы ответили правильно на {`${score}`} из {`${allPlayers.length}`}{" "}
        вопросов{" "}
      </Text>
      {trueanswers?.length !== 0 ? (
        trueanswers.map((elem) => {
          <>
            <Text>{elem.fact}</Text>
            <Text>{elem.user_name}</Text>
          </>;
        })
      ) : (
        <Text>Вы самое слабое звено, сосите хуй</Text>
      )}
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
  itemContainer: {
    flexDirection: "row",
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
  correct: {
    fontSize: 24,
    marginRight: 8,
  },
  text: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  fact: {
    fontSize: 16,
  },
});
