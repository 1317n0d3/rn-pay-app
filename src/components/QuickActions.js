import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  updateDoc,
} from "@firebase/firestore";
import React, { useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, TextInput } from "react-native";
import { colors, styles } from "../../constants";
import { useAuth } from "../useAuth";
import { db } from "../utils/firebase";

const QuickActions = ({ activeCard }) => {
  const [transActive, setTransActive] = useState(false),
    [money, setMoney] = useState(0),
    [cardTo, setCardTo] = useState("");

  const makeTransaction = async () => {
    const collectionRef = collection(db, "transactions");
    const payload = {
      card_from: activeCard,
      card_to: cardTo,
      created_at: serverTimestamp(),
      value: +money,
    };

    try {
      await addDoc(collectionRef, payload);
      const cardsRef = doc(db, "cards", cardTo);
      const cardToRef = collection(db, "cards");

      const q = query(cardToRef, where("number", "==", cardTo));

      let moneyCard = 0;

      onSnapshot(q, (snapshot) => {
        // console.log(
        moneyCard = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))[0].balance;
        // );
      });

      console.log(moneyCard);

      updateDoc(cardsRef, {
        balance: Number(moneyCard) + Number(money),
      });

      // alert("✅ Transaction completed!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={{ display: transActive ? "flex" : "none" }}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Transaction</Text>

        <TextInput
          style={styles.input}
          onChangeText={setCardTo}
          value={cardTo}
          // autoFocus
          placeholder="Enter card number"
        />
        <TextInput
          style={styles.input}
          onChangeText={setMoney}
          value={money}
          placeholder="Money"
        />
        <Button
          onPress={() => makeTransaction()}
          title="Send money"
          color={"#000"}
        />
      </View>
      <View style={{ ...styles.flexDefault, justifyContent: "space-around" }}>
        <TouchableHighlight
          underlayColor={colors.ACCENT}
          style={{
            justifyContent: "center",
            borderRadius: 30,
            padding: 20,
            marginBottom: 15,
            height: 160,
            backgroundColor: "#2C2C2C",
          }}
          onPress={() => {
            setTransActive(!transActive);
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Icon name="money" size={35} color="#fff" />
            <Text
              style={{
                color: "white",
                fontSize: 16,
                marginTop: 12,
                marginBottom: 4,
                fontWeight: "700",
              }}
            >
              Transaction
            </Text>
            <Text style={{ color: colors.TEXT_GRAY, fontSize: 12 }}>
              Send Money
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={colors.ACCENT}
          style={{
            justifyContent: "center",
            borderRadius: 30,
            padding: 20,
            marginBottom: 15,
            height: 160,
            backgroundColor: "#2C2C2C",
          }}
          onPress={() => makeTransaction(610)}
        >
          <View style={{ alignItems: "center" }}>
            <Icon name="user" size={35} color="#fff" />
            <Text
              style={{
                color: "white",
                fontSize: 16,
                marginTop: 12,
                marginBottom: 4,
                fontWeight: "700",
              }}
            >
              History
            </Text>
            <Text style={{ color: colors.TEXT_GRAY, fontSize: 12 }}>
              Transaction history
            </Text>
            {/* <Text
              style={{
                color: "white",
                fontSize: 18,
                marginTop: 10,
                fontWeight: "700",
              }}
            >
              $610
            </Text> */}
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default QuickActions;
