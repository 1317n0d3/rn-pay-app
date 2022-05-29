import { doc } from "firebase/firestore";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { colors } from "../../constants";
import { db } from "../utils/firebase";

const Balance = ({ cards, activeCard, setBalance }) => {
  const balance = cards.reduce((acc, card) => acc + card.balance, 0);
  // const balance = activeCard.balance;

  useEffect(() => {
    setBalance(balance);
    console.log(balance);
  }, [cards]);

  return (
    <View style={{ marginBottom: 40 }}>
      <Text
        style={{
          color: colors.TEXT_GRAY,
          fontSize: 20,
          marginBottom: 6,
        }}
      >
        Balance
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        ${balance.toLocaleString()}
      </Text>
    </View>
  );
};

export default Balance;
