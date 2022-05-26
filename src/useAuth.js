import { onAuthStateChanged } from "@firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { auth } from "./utils/firebase";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    // const getFromAsyncStorage = async () => {
    // 	const userAS = await AsyncStorage.setItem('user', user)
    // 	if (userAS) {
    // 		setUser(userAS)
    // 		setIsLoggedIn(true)
    // 	}
    // }

    // getFromAsyncStorage()

    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
        // await AsyncStorage.setItem('user', user)
      } else {
        setIsLoggedIn(false);
        setUser({});
        // await AsyncStorage.setItem('user', {})
      }
    });

    return unSub;
  }, []);

  const values = {
    user,
    isLoggedIn,
  };

  return values;
};
