import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import ButtonStandart from "../UI/ButtonStandart";
import { useAppDispatch, useAppSelector } from "../../features/redux/hooks";
import {
  nextRound, scoreUp, trueVote,
} from "../../features/redux/slices/game/gameSlice";
import { voteAction } from "../../features/redux/slices/game/gameAction";
import { clearVote } from "../../features/redux/slices/game/gameAction";
import { addVote } from "../../features/redux/slices/user/thunkAction";

export default function GamePage({ navigation }): JSX.Element {
  const facts = useAppSelector((state) => state.fact.facts);
  const { allPlayers, round, vote } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const [voteUser, setVoteUser] = useState(false);
  const owner = useAppSelector((state)=> state.user);

  useEffect(() => {
    if (allPlayers.length === vote.length) {
      dispatch(nextRound());
      setVoteUser(false);
      dispatch(clearVote(''));
    }
  }, [vote]);
  
  const voteHandler = (participant_id, name) => {
    if (participant_id === facts[round - 1].user_id) {
      dispatch(addVote({user_id: owner.id, participant_id: participant_id, status: true}))
      dispatch(scoreUp());
      dispatch(trueVote({fact: facts[round-1], user_name: name}))
    } else {
      dispatch(addVote({user_id: owner.id, participant_id: participant_id, status: false}))
    }
  };

  useEffect(() => {
    if (allPlayers.length === round - 1  || round - 1 === facts.length) {
      navigation.navigate("ResultPage");
    }
  }, [round]);


  return (
    <View style={styles.container}>
      {!voteUser ? (
        <>
          <Text style={styles.text}>
            Раунд {`${round}`} из {`${allPlayers.length}`}
          </Text>
          <Text style={styles.text1}>{`${facts[round - 1]?.fact}`}</Text>
          {allPlayers.map((user) => (
            <ButtonStandart key={user.id}
              onPress={() => {
                voteHandler(user.id,  user.name);
                dispatch(voteAction(user.name));
                setVoteUser(true);
              }}
              title={user.name}
            />
          ))}
        </>
      ) : (
        <Text>Ожидание игроков</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    position: "absolute",
    top: "10%",
    marginTop: 2,
    fontStyle: "italic",
    color: "#000000",
    fontSize: 30,
  },
  text1: {
    position: "absolute",
    top: "15%",
    marginTop: 2,
    fontStyle: "italic",
    color: "#000000",
    fontSize: 30,
  },
});
