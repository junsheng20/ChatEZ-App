import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkUser, createUser } from "../slice/usersSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const auth = getAuth();
  const dispatch = useDispatch();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);
    } catch (error) {
      console.error(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, provider);
      console.log(res.user);

      const data = {
        uid: res.user.uid,
        photoURL: res.user.photoURL,
        displayName: res.user.displayName,
      };
      try {
        console.log(data.uid);
        const check = await dispatch(checkUser(data.uid));
        console.log(check);
        if (checkUser.fulfilled.match(check)) {
          const checkResult = check.payload;

          if (checkResult.length === 0) {
            dispatch(createUser(data));
          }
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, provider);
      console.log(res.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-1/2 h-full mx-auto pt-10 bg-gray-800 flex flex-col gap-16 max-w-7xl overflow-hidden">
      <div className="text-white flex flex-col gap-3 mt-5 text-center">
        <h1 className="font-mono text-5xl">Welcome Back!</h1>
        <p className="font-mono text-xl">
          <span className="text-teal-500">Login</span> to continue
        </p>
      </div>
      <form
        action=""
        className="flex flex-col gap-8"
        onSubmit={handleEmailSignIn}
      >
        <div className="flex justify-center">
          <input
            type="email"
            className="font-sans font-thin focus:font-thin text-3xl text-white bg-gray-900 border-0 border-white focus:border-0 focus:border-b-[1px] focus:-mt-[1px]  focus:border-teal-500 w-3/4 outline-0 p-3 focus:placeholder:text-teal-500 focus:text-teal-500 transition-all duration-100"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex justify-center">
          <input
            type="password"
            className="font-sans font-thin text-3xl text-white bg-gray-900 border-0 border-white focus:border-0 focus:border-b-[1px] focus:-mt-[1px]  focus:border-teal-500 w-3/4 outline-0 p-3 focus:placeholder:text-teal-500 focus:text-teal-500 transition-all duration-100"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {error ? (
          <div className="flex justify-center">
            <p className="font-mono text-red-500">Invalid email / password</p>
          </div>
        ) : (
          ""
        )}

        <div className="flex justify-center">
          {loading ? (
            <button
              type="submit"
              className="bg-teal-500 text-3xl font-mono font-thin w-1/4 p-3"
              disabled
            >
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="animate-spin h-[36px] w-[36px]"
                  fill="gray-800"
                >
                  <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                </svg>
              </div>
            </button>
          ) : (
            <button
              type="submit"
              className="bg-teal-500 text-3xl font-mono font-thin w-1/4 p-3"
            >
              Login
            </button>
          )}
        </div>
      </form>

      <div className="font-mono text-white flex flex-row gap-10 text-2xl justify-center">
        <div className="flex flex-col justify-center">
          <p className="font-thin">Login with</p>
        </div>
        <button
          className="hover:-translate-y-1 text-3xl transition-all duration-300"
          onClick={handleGoogleLogin}
        >
          {/* <i className="fa-brands fa-google"></i> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="45"
            height="45"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
        </button>
        <button
          className="hover:-translate-y-1 text-3xl transition-all duration-300 text-blue-700"
          onClick={handleFacebookLogin}
        >
          {/* <i className="fa-brands fa-facebook"></i> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="45"
            height="45"
            viewBox="0 0 48 48"
          >
            <linearGradient
              id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
              x1="9.993"
              x2="40.615"
              y1="9.993"
              y2="40.615"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#2aa4f4"></stop>
              <stop offset="1" stopColor="#007ad9"></stop>
            </linearGradient>
            <path
              fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
              d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
            ></path>
            <path
              fill="#fff"
              d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
