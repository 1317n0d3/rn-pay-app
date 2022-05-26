import React, { useEffect, useState, Context } from "react";
import { View, ScrollView } from "react-native";
import { colors } from "./constants";
import Balance from "./src/components/Balance";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import Cards from "./src/components/Cards";
import QuickActions from "./src/components/QuickActions";
import { useAuth } from "./src/useAuth";
import { db } from "./src/utils/firebase";
import Logout from "./src/components/Logout";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import AuthForm from "./src/components/AuthForm";

export default function App() {
  const { isLoggedIn, user } = useAuth();

  const [cards, setCards] = useState([]);
  const [activeCard, setActiveCard] = useState("");

  useEffect(() => {
    if (user && user.uid) {
      console.log(user.uid);
      const collectionRef = collection(db, "cards");
      const q = query(collectionRef, where("user_id", "==", user.uid));

      const unSub = () => {
        onSnapshot(q, (snapshot) => {
          console.log(snapshot, "wedf");

          setCards(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
      };

      unSub();
    }
  }, [user]);

  return (
    // cards.length > 0 && (
    <ScrollView>
      <View
        style={{
          padding: 24,
          paddingTop: 55,
          paddingBottom: 90,
          backgroundColor: colors.BG_GRAY,
          // height: "100%",
        }}
      >
        <View>
          {isLoggedIn ? (
            <>
              <Header />
              <Cards cards={cards} setActiveCard={setActiveCard} />
              <Balance cards={cards} />
              <QuickActions activeCard={activeCard} />
              <Logout />
              {/* <Footer /> */}
            </>
          ) : (
            <AuthForm />
          )}
        </View>
      </View>
    </ScrollView>
    // )
  );
}
