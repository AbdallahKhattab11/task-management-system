import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import PrimaryButton from "../Shared/PrimaryButton";
import SecondaryButton from "../Shared/SecondaryButton";
import Loading from "../Shared/Loading";
import Alert from "../Shared/Alert";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  const [emailError, setEmailError] = useState("");
  const [firebaseError, setFirebaseError] = useState(null);

  const { forgotPassword } = useAuth();

  const duration = 3000;

    useEffect(() => {
    if (firebaseError || successMessage) {
      setIsDisplayed(true);

      const timer = setTimeout(() => {
        setIsDisplayed(false);
        setFirebaseError(null);
        setSuccessMessage(null);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [firebaseError, successMessage]);

  const handleFirebaseError = (error) => {
    console.log(error);
    
    switch (error.code) {
      case "auth/user-not-found":
        setEmailError(
          "This email is not registered. Please check and try again."
        );
        break;
      case "auth/invalid-email":
        setEmailError("Please enter a valid email address.");
        break;
      case "auth/too-many-requests":
        setFirebaseError(
          "Too many attempts. Please wait a moment and try again."
        );
        break;
      case "auth/network-request-failed":
        setFirebaseError(
          "Network error. Please check your internet connection."
        );
        break;
      case "auth/internal-error":
        setFirebaseError("Something went wrong. Please try again later.");
        break;
    }
  };

  const emailValidate = () => {
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

    return Object.keys(errors).length === 0;
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (emailValidate()) {
      setIsLoading(true);
      try {
        await forgotPassword(email);
        setEmailError(null)
        setSuccessMessage("If this email is registered, you’ll receive a reset link.");
      } catch (error) {
        handleFirebaseError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="forgot-password h-screen w-full">
      <div className="container px-4 elementCenter relative">
        <div className="w-[350px]">
          <h1 className="text-dark text-[24px] md:text-[32px] font-bold mb-2">
            Forgot Password?
          </h1>
          <p className="text-base md:text-[18px] font-medium text-[#676767] leading-6">
            We are sorry to hear that happen. Don’t be sad we could help you get
            back to productivity in no time.
          </p>
          <form onSubmit={handleForgotPassword} className="mt-10">
            <div className="error">
              {firebaseError && (
                <Alert
                  type="error"
                  message={firebaseError}
                  isDisplayed={isDisplayed}
                />
              )}
              {successMessage && (
                <Alert
                  type="success"
                  message={successMessage}
                  isDisplayed={isDisplayed}
                />
              )}
            </div>
            <div className="email mb-10">
              <label
                htmlFor="email"
                className="block mb-1 text-dark font-medium text-[18px]"
              >
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your email"
                className={`max-w-[350px] w-full h-[40px] lg:h-[48px] px-4 text-[18px] font-medium tracking-wide rounded-lg lg:rounded-xl border-none outline focus:outline-2 ${
                  emailError || firebaseError ? "outline-error" : "outline-blue"
                }`}
              />
              <p
                className={`${
                  emailError ? "text-error" : "text-dolghin opacity-0"
                } mt-1 text-sm font-medium `}
              >
                {emailError ? emailError : "abdallah.example@gmail.com"}
              </p>
            </div>
            <div className=" flex flex-col gap-5 ">
              <button
                disabled={isLoading}
                type="submit"
                className="h-[48px] lg:max-w-[350px] w-full text-base lg:text-[18px] text-white font-medium tracking-wide rounded-xl bg-blue cursor-pointer hover:scale-102 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? <Loading display={isLoading} /> : "Next"}
              </button>
              <div className="md:hidden">
                <Link to="/create-account">
                  <SecondaryButton text={"Create Account"} type={"button"} />
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="absolute top-10 right-15 hidden md:block">
          <Link to="/create-account">
            <SecondaryButton text={"Create Account"} type={"button"} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
