import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" w-3/5 h-full bg-gray-900 flex flex-col gap-16 max-w-7xl">
      <div className="text-white flex flex-col gap-3 mt-5">
        <h1 className="font-mono text-5xl">Hi Rookie!</h1>
        <p className="font-mono text-xl">Let&apos;s create your account</p>
      </div>
      <form
        action=""
        className="flex flex-col gap-8"
        onSubmit={handleEmailSignUp}
      >
        <input
          type="email"
          className="font-sans font-thin focus:font-light text-3xl text-white bg-gray-900 border-[1px] border-white focus:border-0 focus:border-b-[1px] focus:mt-[1px] focus:pl-[14px] focus:border-emerald-400 w-3/4 outline-0 p-3 focus:placeholder:text-emerald-400 focus:text-emerald-400 transition-all duration-100"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="font-sans font-thin text-3xl text-white bg-gray-900 border-[1px] border-white focus:border-0 focus:border-b-[1px] focus:mt-[1px] focus:pl-[14px] focus:border-emerald-400 w-3/4 outline-0 p-3 focus:placeholder:text-emerald-400 focus:text-emerald-400 focus:font-normal transition-all duration-100"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button
          type="submit"
          className="bg-emerald-400 text-3xl font-mono font-thin w-1/4 p-3"
        >
          Sign Up
        </button>
      </form>

      <div className="font-mono text-white flex flex-row gap-10 text-2xl">
        <p className="font-thin">Login with</p>
        <button
          className="hover:-translate-y-1 text-3xl transition-all duration-300"
          onClick={handleGoogleLogin}
        >
          <i className="fa-brands fa-google"></i>
        </button>
        <button className="hover:-translate-y-1 text-3xl transition-all duration-300">
          <i className="fa-brands fa-facebook"></i>
        </button>
      </div>
    </div>
  );
}
