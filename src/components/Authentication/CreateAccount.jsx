import { motion, AnimatePresence } from "framer-motion";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import bgImage from "../../assets/images/create-account-left-img.jpg";
import PrimaryButton from "../Shared/PrimaryButton";
import SecondaryButton from "../Shared/SecondaryButton";
import { Link } from "react-router-dom";
import Alert from "../Shared/Alert";
import firebase from "firebase/compat/app";
import Loading from "../Shared/Loading";

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const CreateAccount = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isDisplayed, setIsDisplayed] = useState();
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firebaseError, setFirebaseError] = useState(null);

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

  const { signupWithName } = useAuth();
  const navigate = useNavigate();

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        setEmailError(
          "This email is already in use. Please try another email."
        );
        break;
      case "auth/invalid-email":
        setEmailError("The email address you entered is not valid.");
        break;
      case "auth/weak-password":
        setPasswordError(
          "The password is too weak. Please use a stronger password."
        );
        break;
      case "auth/too-many-requests":
        setFirebaseError("Too many attempts. Please try again later.");
        break;
      case "auth/network-request-failed":
        setFirebaseError(
          "Network error. Please check your internet connection."
        );
        break;
      default:
        setFirebaseError("An unexpected error occurred. Please try again.");
        break;
    }
  };

  const validateForm = () => {
    const formErrors = {};

    if (!fullname) {
      formErrors.name = "Full name is required";
      setNameError(formErrors.name);
    } else {
      setNameError(null);
    }

    if (!email) {
      formErrors.email = "Email is required";
      setEmailError(formErrors.email);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = "Email is not valid";
      setEmailError(formErrors.email);
    } else {
      setEmailError(null);
    }

    if (!password) {
      formErrors.password = "Password is required";
      setPasswordError(formErrors.password);
    } else if (password.length < 8) {
      formErrors.password = "Password must be at least 8 characters";
      setPasswordError(formErrors.password);
    } else {
      setPasswordError(null);
    }

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await signupWithName(email, password, fullname);
        navigate("/create-workspace");
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
      <section className="create-account h-screen w-full py-5 hidden lg:block">
        <div className="container px-5 flex">
          {/* left side */}
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="left-side w-1/2 rounded-4xl grid grid-rows-3 p-10 xl:p-15"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundPosition: "right",
              backgroundSize: "cover",
            }}
          >
            <div className="row-span-2 flex items-center">
              <h1 className="text-[48px] xl:text-[56px] text-white font-semibold transition-all duration-300">
                Take your <br /> productivity to the <br /> next level.
              </h1>
            </div>
            <div className="getMobileApp-copyright flex flex-col items-left justify-center gap-10">
              <fieldset className="border border-white rounded-xl px-5 pb-5 pt-2 flex gap-5 w-max">
                <legend className="text-white text-[20px] font-medium px-2 ">
                  Get the Mobile App
                </legend>
                <button
                  className="apple"
                  aria-label="Download the app on Apple devices"
                >
                  Download on Apple
                </button>
                <button
                  className="android"
                  aria-label="Download the app on Android devices"
                >
                  Download on Android
                </button>
              </fieldset>
              <div className="copyright text-white text-xl font-medium tracking-wide">
                Copyright 2025 | All Right Reserved
              </div>
            </div>
          </motion.div>

          {/* right side */}
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="right-side w-1/2 elementCenter relative"
          >
            <div className=" w-[350px] flex flex-col items-center justify-center gap-10">
              <AnimatePresence>
                <motion.div
                  key={"heading"}
                  layout
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="heading self-start"
                >
                  <h2 className="text-dark text-[32px] font-bold mb-2">
                    Create An Account
                  </h2>
                  <p className="text-dolghin text-[18px] font-medium tracking-wide">
                    It's Simple and Easy!!
                  </p>
                </motion.div>

                <motion.form
                  key={"form"}
                  layout
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={handleSubmit}
                  action=""
                  className="w-full"
                >
                  <div className="errors">
                    {firebaseError && (
                      <Alert
                        type="error"
                        message={firebaseError}
                        isDisplayed={isDisplayed}
                      />
                    )}
                  </div>

                  <div className="fullName mb-6">
                    <label
                      htmlFor="fullname"
                      className="block mb-1 text-dark font-medium text-[18px]"
                    >
                      Full Name
                    </label>
                    <input
                      onChange={(e) => setFullname(e.target.value)}
                      value={fullname}
                      autoComplete="name"
                      type="text"
                      name="fullname"
                      className={`max-w-[350px] w-full h-[40px] lg:h-[48px] px-4 text-[18px] font-medium tracking-wide rounded-lg lg:rounded-xl border-none outline focus:outline-2 ${
                        nameError ? "outline-error" : "outline-blue "
                      }`}
                      placeholder="Enter Your Full Name"
                      id="fullname"
                    />
                    <p
                      className={`mt-1 text-sm font-medium  ${
                        nameError ? "text-error" : "text-dolghin"
                      }`}
                    >
                      {nameError ? nameError : "Abdallah Khattab"}
                    </p>
                  </div>
                  <div className="email mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-1 text-dark font-medium text-[18px]"
                    >
                      Email Address
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      autoComplete="email"
                      type="email"
                      name="email"
                      className={`max-w-[350px] w-full h-[40px] lg:h-[48px] px-4 text-[18px] font-medium tracking-wide rounded-lg lg:rounded-xl border-none outline focus:outline-2 ${
                        emailError ? "outline-error" : "outline-blue "
                      }`}
                      placeholder="Enter Your Email"
                      id="email"
                    />
                    <p
                      className={`mt-1 text-sm font-medium  ${
                        emailError ? "text-error" : "text-dolghin"
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
                      Enter A password
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      autoComplete="password"
                      type="password"
                      name="password"
                      className={`max-w-[350px] w-full h-[40px] lg:h-[48px] px-4 text-[18px] font-medium tracking-wide rounded-lg lg:rounded-xl border-none outline focus:outline-2 ${
                        passwordError ? "outline-error" : "outline-blue "
                      }`}
                      placeholder="Enter Your Password"
                      id="password"
                    />
                    <p
                      className={`mt-1 text-sm font-medium ${
                        passwordError ? "text-error" : "text-dolghin"
                      }`}
                    >
                      {passwordError
                        ? passwordError
                        : "Upto 8 characters with an Uppercase, symbol and number"}
                    </p>
                  </div>

                  <div className="submit mt-10">
                    <PrimaryButton
                      text={"Create Account"}
                      type={"submit"}
                      customStyles={"customCreateAccount"}
                      isLoading={isLoading}
                    />
                    <div className="loading mt-6">
                      <Loading display={isLoading} />
                    </div>
                  </div>
                </motion.form>
              </AnimatePresence>
            </div>
            <div className="login absolute top-10 right-10">
              <Link to="/login">
                <SecondaryButton text={"Log In"} type={"button"} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile */}
      <motion.section
        layout
        className="create-account-mobile w-full py-5 lg:hidden"
      >
        <div className="container px-1 md:px-5">
          <div
            className="h-full rounded-4xl p-5 md:p-7 flex flex-col gap-10"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundPosition: "right",
              backgroundSize: "cover",
            }}
          >
            {/* heading */}
            <div className="flex items-center">
              <h1 className="text-[40px] md:text-[48px] xl:text-[56px] text-white font-semibold transition-all duration-300 leading-14">
                Take your <br /> productivity to the <br /> next level.
              </h1>
            </div>

            {/* form */}
            <motion.div
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-start justify-center gap-7 bg-white rounded-2xl p-5 max-w-[400px]"
            >
              <motion.div
                key={"heading"}
                layout
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="heading"
              >
                <h2 className="text-dark text-[24px] md:text-[32px] font-bold mb-2">
                  Create An Account
                </h2>
                <p className="text-dolghin text-[18px] font-medium tracking-wide">
                  It's Simple and Easy!!
                </p>
              </motion.div>
              <motion.form
                key={"form"}
                layout
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleSubmit}
                className="w-full"
              >
                <div className="errors">
                  {firebaseError && (
                    <Alert
                      type="error"
                      message={firebaseError}
                      isDisplayed={isDisplayed}
                    />
                  )}
                </div>

                <div className="fullName mb-6">
                  <label
                    htmlFor="fullname-mobile"
                    className="block mb-1 text-dark font-medium text-[18px]"
                  >
                    Full Name
                  </label>
                  <input
                    onChange={(e) => setFullname(e.target.value)}
                    value={fullname}
                    autoComplete="name"
                    type="text"
                    name="fullname"
                    className={`w-full h-[40px] lg:h-[48px] px-4 text-[18px] font-medium tracking-wide rounded-lg lg:rounded-xl border-none outline focus:outline-2 outline-blue ${
                      nameError ? "outline-error" : "outline-blue "
                    }`}
                    placeholder="Enter Your Full Name"
                    id="fullname-mobile"
                  />
                  <p
                    className={`mt-1 text-sm font-medium  ${
                      nameError ? "text-error" : "text-dolghin"
                    }`}
                  >
                    {nameError ? nameError : "Abdallah Khattab"}
                  </p>
                </div>
                <div className="email mb-6">
                  <label
                    htmlFor="email-mobile"
                    className="block mb-1 text-dark font-medium text-[18px]"
                  >
                    Email Address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    autoComplete="email"
                    type="email"
                    name="email"
                    className={`w-full h-[40px] lg:h-[48px] px-4 text-[18px] font-medium tracking-wide rounded-lg lg:rounded-xl border-none outline focus:outline-2 outline-blue ${
                      emailError ? "outline-error" : "outline-blue "
                    }`}
                    placeholder="Enter Your Email"
                    id="email-mobile"
                  />
                  <p
                    className={`mt-1 text-sm font-medium  ${
                      emailError ? "text-error" : "text-dolghin"
                    }`}
                  >
                    {emailError ? emailError : "example.abdallah@gmail.com"}
                  </p>
                </div>
                <div className="password mb-6">
                  <label
                    htmlFor="password-mobile"
                    className="block mb-1 text-dark font-medium text-[18px]"
                  >
                    Enter A password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    autoComplete="password"
                    type="password"
                    name="password"
                    className={`w-full h-[40px] lg:h-[48px] px-4 text-[18px] font-medium tracking-wide rounded-lg lg:rounded-xl border-none outline focus:outline-2 outline-blue ${
                      passwordError ? "outline-error" : "outline-blue "
                    }`}
                    placeholder="Enter Your Password"
                    id="password-mobile"
                  />
                  <p
                    className={`mt-1 text-sm font-medium ${
                      passwordError ? "text-error" : "text-dolghin"
                    }`}
                  >
                    {passwordError
                      ? passwordError
                      : "Upto 8 characters with an Uppercase, symbol and number"}
                  </p>
                </div>

                <div className="submit flex flex-col gap-5 mt-10">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="h-[48px] lg:max-w-[350px] w-full text-base lg:text-[18px] text-white font-medium tracking-wide rounded-xl bg-blue cursor-pointer hover:scale-102 transition-all duration-200 disabled:opacity-50"
                  >
                    {isLoading ? <Loading display={isLoading} /> : "Create Account"}
                  </button>
                  <Link to="/login">
                    <SecondaryButton
                      type={"button"}
                      text={"Log In"}
                      customStyles={"CustomLogin"}
                    />
                  </Link>
                </div>
              </motion.form>
            </motion.div>

            {/* download app */}
            <div className="getMobileApp-copyright flex flex-col items-left justify-center gap-7">
              <fieldset className="border border-white rounded-xl px-5 pb-5 pt-2 flex flex-col xs:flex-row w-full gap-5 sm:w-max">
                <legend className="text-white text-[20px] font-medium px-2 ">
                  Get the Mobile App
                </legend>
                <button
                  className="apple"
                  aria-label="Download the app on Apple devices"
                >
                  Download on Apple
                </button>
                <button
                  className="android"
                  aria-label="Download the app on Android devices"
                >
                  Download on Android
                </button>
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

export default CreateAccount;
