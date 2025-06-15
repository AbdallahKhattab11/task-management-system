import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import PrimaryButton from "../Shared/PrimaryButton";
import SecondaryButton from "../Shared/SecondaryButton";

import bgImage from "../../assets/images/login-right-img.jpg";
import { FaCheck } from "react-icons/fa6";
import Loading from "../Shared/Loading";
import Alert from "../Shared/Alert";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);

  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const [firebaseError, setFirebaseError] = useState(null);

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const duration = 3000;

  useEffect(() => {
    if (firebaseError) {
      setIsDisplayed(true);

      const timer = setTimeout(() => {
        setIsDisplayed(false);
        setFirebaseError(null);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [firebaseError]);

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/invalid-email":
        setEmailError("invalid email");
        break;
      case "auth/user-disabled":
        setEmailError(
          "This account has been disabled, please contact the support"
        );
        break;
      case "auth/user-not-found":
        setEmailError("There is no account with this email");
        break;
      case "auth/wrong-password":
        setPasswordError("The password is incorrect");
        break;
      case "auth/too-many-requests":
        setFirebaseError("too many attempts please try again later");
        break;
      case "auth/network-request-failed":
        setFirebaseError("A network error occurred. Please try again");
        break;
      case "auth/internal-error":
        setFirebaseError(
          "An unexpected error occurred. Please try again later."
        );
        break;
      case "auth/email-already-in-use":
        setEmailError("This email address is already in use");
        break;
      case "auth/invalid-credential":
        setFirebaseError("Invalid email or password");
        break;
      default:
        setFirebaseError("An unexpected error occurred. Please try again.");
        break;
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = "Email is required";
      setEmailError(errors.email);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email is invalid";
      setEmailError(errors.email);
    } else {
      setEmailError(null);
    }

    if (!password) {
      errors.password = "Password is required";
      setPasswordError(errors.password);
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      setPasswordError(errors.password);
    } else {
      setPasswordError(null);
    }

    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await login(email, password, keepSignedIn);
        navigate("/my-space");
      } catch (error) {
        handleFirebaseError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* Desktop */}
      <section className="login h-screen w-full py-5 hidden lg:block">
        <div className="container px-5 flex">
          {/* left side */}
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="left-side w-1/2 elementCenter relative"
          >
            <div className=" flex flex-col items-center justify-center gap-10 ">
              <div className="heading self-start">
                <h2 className="text-dark text-[32px] font-bold ">
                  Welcome Back.
                </h2>
              </div>
              <form onSubmit={handleLogin} className=" ">
                <div className="error">
                  {firebaseError && (
                    <Alert
                      type="error"
                      message={firebaseError}
                      isDisplayed={isDisplayed}
                    />
                  )}
                </div>
                <div className="email mb-6 ">
                  <label
                    htmlFor="email"
                    className="block mb-1 text-dark font-medium text-[18px]"
                  >
                    Email Aress
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    className={`w-[350px] h-[40px] lg:h-[48px] px-4 text-[18px] font-medium tracking-wide rounded-lg lg:rounded-xl border-none outline focus:outline-2  ${
                      emailError || firebaseError
                        ? "outline-error"
                        : " outline-blue"
                    } `}
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                  />
                  <p
                    className={`mt-1  text-sm font-medium ${
                      emailError ? "text-error" : "text-dolghin opacity-0"
                    }`}
                  >
                    {emailError ? emailError : "example.abdallah@gmail.com"}
                  </p>
                </div>
                <div className="password mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-1 text-dark font-medium text-[18px]"
                  >
                    Enter Your Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    className={`w-[350px] h-[40px] lg:h-[48px] px-4 text-[18px] font-medium tracking-wide rounded-lg lg:rounded-xl border-none outline focus:outline-2 ${
                      passwordError || firebaseError
                        ? "outline-error"
                        : "outline-blue"
                    }`}
                    name="password"
                    id="password"
                    placeholder="Enter Your Password"
                  />
                  <p
                    className={`mt-1 text-sm font-medium ${
                      passwordError ? "text-error" : "text-dolghin opacity-0"
                    }`}
                  >
                    {passwordError
                      ? passwordError
                      : "Upto 8 characters with an Uppercase, symbol and number"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    onChange={(e) => setKeepSignedIn(e.target.value)}
                    value={keepSignedIn}
                    type="checkbox"
                    id="check-1"
                    name="check-1"
                    className="peer hidden"
                  />
                  <label
                    htmlFor="check-1"
                    className="size-[22px] rounded-md border-2 border-blue flex items-center justify-center cursor-pointer peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors duration-200"
                  >
                    <FaCheck className="text-white text-md opacity-100 transition-opacity duration-200" />
                  </label>
                  <label
                    htmlFor="check-1"
                    className="text-[18px] text-black font-medium tracking-wide cursor-pointer"
                  >
                    Keep me Signed in
                  </label>
                </div>
                <div className="submit mt-10 flex items-center gap-10">
                  <PrimaryButton
                    text={"Log in"}
                    type={"submit"}
                    isLoading={isLoading}
                  />
                  <div className="loading ">
                    <Loading display={isLoading} />
                  </div>
                </div>
                <div className="forgot-password mt-10">
                  <Link
                    to="/forgot-password"
                    className="text-[18px] text-blue font-medium tracking-wide"
                  >
                    Forgot Password ?
                  </Link>
                </div>
              </form>
            </div>
          </motion.div>

          {/* right side */}
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="right-side w-1/2 rounded-4xl grid grid-rows-3 p-10 xl:p-15 relative"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundPosition: "left",
              backgroundSize: "cover",
            }}
          >
            <div className="row-span-2 flex items-center justify-end text-right">
              <h1 className="text-[48px] xl:text-[56px] text-white font-semibold transition-all duration-300">
                Take your <br /> productivity to the <br /> next level.
              </h1>
            </div>
            <div className="getMobileApp-copyright flex flex-col items-end justify-center gap-10">
              <fieldset className="border border-white rounded-xl px-5 pb-5 pt-2 flex gap-5 w-max">
                <legend className="text-white text-[20px] font-medium px-2 ">
                  Get the Mobile App
                </legend>
                <button className="apple">Download on Apple</button>
                <button className="android">Download on Android</button>
              </fieldset>
              <div className="copyright text-white text-xl font-medium tracking-wide">
                Copyright 2025 | All Right Reserved
              </div>
            </div>
            <div className="create-account absolute top-10 right-15">
              <Link to="/create-account">
                <SecondaryButton text={"Create Account"} type={"button"} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile */}
      <motion.section
        layout
        className="login-mobile min-h-screen w-full py-5 lg:hidden"
      >
        <div className="container px-1 md:px-5">
          <div
            className="h-full rounded-4xl p-5 md:p-7 flex flex-col gap-10"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundPosition: "left",
              backgroundSize: "cover",
            }}
          >
            {/* heading */}
            <div className="flex items-center">
              <h1 className="text-[40px] md:text-[48px] xl:text-[56px] text-white font-semibold transition-all duration-300">
                Take your <br /> productivity to the <br /> next level.
              </h1>
            </div>

            {/* form */}
            <motion.div
              initial={{ opacity: 0, x: -150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="self-end flex flex-col items-start justify-center gap-7 bg-white rounded-2xl p-5 max-w-[400px] w-full relative"
            >
              <div className="heading ">
                <h2 className="text-dark text-[24px] md:text-[32px] font-bold mb-2">
                  Welcome back.
                </h2>
              </div>
              <form onSubmit={handleLogin} className="w-full">
                <div className="error">
                  {firebaseError && (
                    <Alert
                      type="error"
                      message={firebaseError}
                      isDisplayed={isDisplayed}
                    />
                  )}
                </div>
                <div className="email mb-6 ">
                  <label
                    htmlFor="email-mobile"
                    className="block mb-1 text-dark font-medium text-[18px]"
                  >
                    Email Adress
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    className={`w-full h-[40px] lg:h-[48px] px-4 text-[18px] font-medium tracking-wide rounded-lg lg:rounded-xl border-none outline focus:outline-2 ${
                      emailError || firebaseError
                        ? "outline-error"
                        : " outline-blue"
                    } `}
                    name="email-mobile"
                    id="email-mobile"
                    placeholder="Enter Your Email"
                  />
                  <p
                    className={`mt-1  text-sm font-medium ${
                      emailError ? "text-error" : "text-dolghin opacity-0"
                    }`}
                  >
                    {emailError ? emailError : " "}
                  </p>
                </div>
                <div className="password mb-6">
                  <label
                    htmlFor="password-mobile"
                    className="block mb-1 text-dark font-medium text-[18px]"
                  >
                    Enter Your Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    className={`w-full h-[40px] lg:h-[48px] px-4 text-[18px] font-medium tracking-wide rounded-lg lg:rounded-xl border-none outline focus:outline-2 ${
                      passwordError || firebaseError
                        ? "outline-error"
                        : "outline-blue"
                    }`}
                    name="password-mobile"
                    id="password-mobile"
                    placeholder="Enter Your Password"
                  />
                  <p
                    className={`mt-1 text-sm font-medium ${
                      passwordError ? "text-error" : "text-dolghin opacity-0"
                    }`}
                  >
                    {passwordError ? passwordError : " "}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    onChange={(e) => setKeepSignedIn(e.target.value)}
                    value={keepSignedIn}
                    type="checkbox"
                    id="check-2"
                    name="check-2"
                    className="peer hidden"
                  />
                  <label
                    htmlFor="check-2"
                    className="size-[22px] rounded-md border-2 border-blue flex items-center justify-center cursor-pointer peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors duration-200"
                  >
                    <FaCheck className="text-white text-md opacity-100 transition-opacity duration-200" />
                  </label>
                  <label
                    htmlFor="check-2"
                    className="text-[18px] text-black font-medium tracking-wide cursor-pointer"
                  >
                    Keep me Signed in
                  </label>
                </div>
                <div className="submit flex flex-col items-center gap-5 mt-10">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="h-[48px] lg:max-w-[350px] w-full text-base lg:text-[18px] text-white font-medium tracking-wide rounded-xl bg-blue cursor-pointer hover:scale-102 transition-all duration-200 disabled:opacity-50"
                  >
                    {isLoading ? <Loading display={isLoading} /> : "Log in"}
                  </button>
                  <Link
                    to="/create-account"
                    className="h-[40px] md:h-[48px] lg:h-[56px] lg:max-w-[350px] w-full text-base lg:text-[18px] text-blue font-medium tracking-wide rounded-xl bg-white border border-blue cursor-pointer flex justify-center items-center hover:scale-102 transition-all duration-200 disabled:opacity-50"
                  >
                    Create Account
                  </Link>
                  <Link
                    to="/forgot-password"
                    className="text-[18px] text-blue font-medium tracking-wide"
                  >
                    Forgot Password ?
                  </Link>
                </div>
              </form>
            </motion.div>

            {/* download app */}
            <div className="getMobileApp-copyright flex flex-col items-left justify-center gap-7">
              <fieldset className="border border-white rounded-xl px-5 pb-5 pt-2 flex flex-col xs:flex-row w-full gap-5 sm:w-max">
                <legend className="text-white text-[20px] font-medium px-2 ">
                  Get the Mobile App
                </legend>
                <button className="apple">Download on Apple</button>
                <button className="android">Download on Android</button>
              </fieldset>
              <div className="copyright text-white text-base md:text-xl font-medium tracking-wide mb-5">
                Copyright 2025 | All Right Reserved
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Login;
