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
  increment,
} from "@firebase/firestore";
import React, { useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, TextInput } from "react-native";
import { colors, styles } from "../../constants";
import { useAuth } from "../useAuth";
import { db } from "../utils/firebase";

const QuickActions = ({ activeCard, balance }) => {
  const [transActive, setTransActive] = useState(false),
    [money, setMoney] = useState(0),
    [cardTo, setCardTo] = useState(""),
    [showHistory, setShowHistory] = useState(false),
    [userTransactions, setUserTransactions] = useState([]),
    [userTransactionsIn, setUserTransactionsIn] = useState([]),
    [showTransactionIn, setShowTransactionIn] = useState(false);

  console.log(activeCard);

  const makeTransaction = async (money, cardTo) => {
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
      const activeCardRef = doc(db, "cards", activeCard);
      const cardToRef = collection(db, "cards");

      const q = query(cardToRef, where("number", "==", activeCard));

      console.log(q);

      // let moneyCard = 0;

      // await onSnapshot(q, (snapshot) => {
      // console.log(
      // moneyCard = snapshot.docs.map((doc) => ({
      //   ...doc.data(),
      // }))[0].balance;
      // );

      // snapshot.docs.forEach((doc) => {
      //   moneyCard = doc.data().balance;
      // });
      // });

      // await updateDoc(cardsRef, {
      //   balance: Number(moneyCard) + Number(money),
      // });

      await updateDoc(cardsRef, {
        balance: increment(money),
      });

      await updateDoc(activeCardRef, {
        balance: increment(-money),
      });

      // alert("✅ Transaction completed!");
    } catch (error) {
      console.log(error);
    }
  };

  const loadTransaction = async () => {
    try {
      const collectionRef = collection(db, "transactions");

      const q = query(collectionRef, where("card_from", "==", activeCard));

      await onSnapshot(q, (snapshot) => {
        console.log(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
        );

        const transactions = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        setUserTransactions(transactions);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loadTransactionIn = async () => {
    try {
      const collectionRef = collection(db, "transactions");

      const q = query(collectionRef, where("card_to", "==", activeCard));

      await onSnapshot(q, (snapshot) => {
        console.log(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
        );

        const transactions = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        setUserTransactionsIn(transactions);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const parseUserTransactions = (transactions) => {
    return transactions
      .map((v, i) => (
        <TouchableHighlight
          key={i}
          style={styles.transactionCard}
          onPress={() => {
            setMoney(v.value);
            showTransactionIn ? setCardTo(v.card_to) : setCardTo(v.card_from);
            setTransActive(true);
          }}
        >
          <View>
            <Text style={styles.transactionCardText}>From: {v.card_from}</Text>
            <Text style={styles.transactionCardText}>To: {v.card_to}</Text>
            <Text style={styles.transactionCardText}>Money: {v.value}</Text>
            {/* <Text>
              Time: {new Date(1970, 0, 1).setSeconds(v.created_at.seconds)}
            </Text> */}
          </View>
        </TouchableHighlight>
      ))
      .reverse();
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
          onPress={() => {
            makeTransaction(money, cardTo);
            setTransActive(!transActive);
          }}
          title="Send money"
          color={"#289256"}
          disabled={balance < money}
        />
      </View>
      <View
        style={{
          ...styles.flexDefault,
          justifyContent: "space-around",
          marginTop: 12,
        }}
      >
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
          onPress={() => {
            setShowHistory(!showHistory);
            loadTransaction();
            loadTransactionIn();
          }}
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

      <View style={{ display: showHistory ? "flex" : "none" }}>
        <Button
          onPress={() => {
            setShowTransactionIn(!showTransactionIn);
          }}
          title="Switch"
          color={"#289256"}
        />
        <Text style={{ color: "#fff", fontSize: 18 }}>History</Text>
        {showTransactionIn
          ? parseUserTransactions(userTransactions)
          : parseUserTransactions(userTransactionsIn)}
      </View>
    </View>
  );
};

export default QuickActions;
