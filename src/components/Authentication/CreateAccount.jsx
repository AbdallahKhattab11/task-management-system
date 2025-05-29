import { useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import bgImage from "../../assets/images/create-account-left-img.jpg";
import PrimaryButton from "../Shared/PrimaryButton";
import SecondaryButton from "../Shared/SecondaryButton";
import { Link } from "react-router-dom";
import Alert from "../Shared/Alert";
import firebase from "firebase/compat/app";

const CreateAccount = () => {
  const [error, setError] = useState();
  const [firebaseError, setFirebaseError] = useState();

  const form = [
    {
      id: "in-1",
      label: "Full Name",
      uIdDesktop: "fullname-desktop",
      uIdMobile: "fullname-mobile",
      type: "text",
      placeHolder: "Enter Full Name",
      message: error ? error.fullname : "Abdallah Khattab",
    },
    {
      id: "in-2",
      label: "Email Address",
      uIdDesktop: "email-desktop",
      uIdMobile: "email-mobile",
      type: "email",
      placeHolder: "Enter Email",
      message: error ? error.email : "exampe.abdallah@gmail.com",
    },
    {
      id: "in-3",
      label: "Enter A Password",
      uIdDesktop: "password-desktop",
      uIdMobile: "password-mobile",
      type: "password",
      placeHolder: "Enter you password",
      message: error
        ? error.password
        : "Upto 8 characters with an Uppercase, symbol and number",
    },
  ];

  const { signupWithName } = useAuth();
  const navigate = useNavigate();

  const fullnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const validateForm = () => {
    let formErrors = {};

    if (!fullnameRef.current.value) {
      formErrors.fullname = "Full name is required";
    }

    if (!emailRef.current.value) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
      formErrors.email = "Email is not valid";
    }

    if (!passwordRef.current.value) {
      formErrors.password = "Password is required";
    } else if (passwordRef.current.value.length < 8) {
      formErrors.password = "Password must be at least 8 characters";
    }

    setError(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await signupWithName(
          fullnameRef.current.value,
          emailRef.current.value,
          passwordRef.current.value
        );
        navigate("/create-workspace");
      } catch (error) {
        setFirebaseError(error.message);
      }
    }
  };

  return (
    <>
      {/* Desktop */}
      <section className="create-account h-screen w-full py-5 hidden lg:block">
        <div className="container px-5 flex">
          {/* left side */}
          <div
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
                <button className="apple">Download on Apple</button>
                <button className="android">Download on Android</button>
              </fieldset>
              <div className="copyright text-white text-xl font-medium tracking-wide">
                Copyright 2025 | All Right Reserved
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="right-side w-1/2 elementCenter relative">
            <div className=" w-[350px] flex flex-col items-center justify-center gap-10">
              <div className="heading self-start">
                <h2 className="text-dark text-[32px] font-bold mb-2">
                  Create An Account
                </h2>
                <p className="text-dolghin text-[18px] font-medium tracking-wide">
                  It's Simple and Easy!!
                </p>
              </div>
              <form onSubmit={handleSubmit} action="" className="w-full">
                <div className="errors"></div>
                {form.map((obj) => {
                  return (
                    <div key={obj.id} className="mb-6">
                      <label
                        htmlFor={obj.uIdDesktop}
                        className="block mb-1 text-dark font-medium text-[18px]"
                      >
                        {obj.label}
                      </label>
                      <input
                        ref={
                          obj.uIdDesktop === "fullname-desktop"
                            ? fullnameRef
                            : obj.uIdDesktop === "email-desktop"
                            ? emailRef
                            : passwordRef
                        }
                        type={obj.type}
                        id={obj.uIdDesktop}
                        placeholder={obj.placeHolder}
                        name={obj.uIdDesktop}
                        className={` max-w-[350px] w-full h-[40px] lg:h-[48px] px-4 text-[18px] font-medium tracking-wide rounded-lg lg:rounded-xl border-none outline focus:outline-2 outline-blue ${
                          error && error[obj.uIdDesktop] ? "!outline-error" : ""
                        }`}
                      />
                      <p className="mt-1 text-dolghin text-sm font-medium">
                        {obj.message}
                      </p>
                    </div>
                  );
                })}
                <div className="submit mt-10">
                  <PrimaryButton
                    text={"Create Account"}
                    type={"submit"}
                    customStyles={"customCreateAccount"}
                  />
                </div>
              </form>
            </div>
            <div className="login absolute top-10 right-10">
              <Link to="/login">
                <SecondaryButton text={"Log In"} type={"button"} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="create-account-mobile w-full py-5 lg:hidden">
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
              <h1 className="text-[40px] md:text-[48px] xl:text-[56px] text-white font-semibold transition-all duration-300">
                Take your <br /> productivity to the <br /> next level.
              </h1>
            </div>

            {/* form */}
            <div className="flex flex-col items-start justify-center gap-7 bg-white rounded-2xl p-5 max-w-[400px]">
              <div className="heading">
                <h2 className="text-dark text-[24px] md:text-[32px] font-bold mb-2">
                  Create An Account
                </h2>
                <p className="text-dolghin text-[18px] font-medium tracking-wide">
                  It's Simple and Easy!!
                </p>
              </div>
              <form onSubmit={handleSubmit} className="w-full">
                {form.map((obj) => {
                  return (
                    <div key={obj.id} className="mb-6">
                      <label
                        htmlFor={obj.uIdMobile}
                        className="block mb-1 text-dark font-medium text-[18px]"
                      >
                        {obj.label}
                      </label>
                      <input
                        ref={
                          obj.uIdMobile === "fullname-mobile"
                            ? fullnameRef
                            : obj.uIdMobile === "email-mobile"
                            ? emailRef
                            : passwordRef
                        }
                        type={obj.type}
                        id={obj.uIdMobile}
                        placeholder={obj.placeHolder}
                        name={obj.uIdMobile}
                        className="inputField-mobile"
                      />
                      <p className="mt-1 text-dolghin text-sm font-medium">
                        {obj.message}
                      </p>
                    </div>
                  );
                })}
                <div className="submit flex flex-col gap-5 mt-10">
                  <PrimaryButton
                    text={"Create Account"}
                    type={"submit"}
                    customStyles={"customCreateAccount"}
                  />
                  <Link to="/login">
                    <SecondaryButton
                      type={"button"}
                      text={"Log In"}
                      customStyles={"CustomLogin"}
                    />
                  </Link>
                </div>
              </form>
            </div>

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
      </section>
    </>
  );
};

export default CreateAccount;
