import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../config/firebaseConfigure";
import { loginSuccess } from "../redux/slice/authSlice";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export function useDataUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("email", "==", user.email)); // Thay email bằng trường người dùng thích hợp
        onSnapshot(userQuery, (snapshot) => {
          let result = [];
          snapshot.forEach((doc) => {
            result = {
              id: doc.id,
              ...doc.data(),
            };
          });
          dispatch(loginSuccess(result));
        });
      } else {
        dispatch(loginSuccess(null));
      }
    });
    return () => unsubscribe();
  }, []);
}
