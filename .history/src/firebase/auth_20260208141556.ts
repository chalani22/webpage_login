import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

export type GoogleLoginResult = {
  accessToken: string;
  idToken: string;
  email: string | null;
  photoURL: string | null;
};

export async function signInWithGoogle(): Promise<GoogleLoginResult> {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const googleAccessToken = credential?.accessToken ?? "";

  const user = result.user;
  const firebaseIdToken = await user.getIdToken();

  return {
    accessToken: googleAccessToken || firebaseIdToken,
    idToken: firebaseIdToken,
    email: user.email,
    name: user.displayName,,
  };
}