import { Link } from "react-router-dom";
import bgImage from "../../assets/images/login-right-img.jpg";
import PrimaryButton from "../Shared/PrimaryButton";
import SecondaryButton from "../Shared/SecondaryButton";
import TetiaryButton from "../Shared/TetiaryButton";
import { FaCheck } from "react-icons/fa6";

const Login = () => {
  const form = [
    {
      id: "in-log-1",
      label: "Email Address",
      uIdDesktop: "log-email",
      uIdMobile: "log-email-mobile",
      type: "email",
      placeHolder: "Enter Email",
      message: "exampe.abdallah@gmail.com",
    },
    {
      id: "in-log-2",
      label: "Enter Your Password",
      uIdDesktop: "log-password",
      uIdMobile: "log-password-mobile",
      type: "password",
      placeHolder: "Enter you password",
      message: "Upto 8 characters with an Uppercase, symbol and number",
    },
  ];
  return (
    <>
      {/* lg screens */}
      <section className="login h-screen w-full py-5 hidden lg:block">
        <div className="container px-5 flex">
          {/* left side */}
          <div className="left-side w-1/2 elementCenter relative">
            <div className=" flex flex-col items-center justify-center gap-10">
              <div className="heading self-start">
                <h2 className="text-dark text-[32px] font-bold ">
                  Welcome Back.
                </h2>
              </div>
              <form onSubmit={(e) => e.preventDefault()} action="" className="">
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
                        type={obj.type}
                        id={obj.uIdDesktop}
                        placeholder={obj.placeHolder}
                        name={obj.uIdDesktop}
                        className="inputField"
                      />
                      <p className="mt-1 text-dolghin text-sm font-medium">
                        {obj.message}
                      </p>
                    </div>
                  );
                })}
                <div className="flex items-center gap-4">
                  <input
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
                <div className="submit mt-10">
                  <PrimaryButton text={"Log in"} type={"submit"} />
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
          </div>

          {/* right side */}
          <div
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
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="login-mobile min-h-screen w-full py-5 lg:hidden">
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
            <div className="self-end flex flex-col items-start justify-center gap-7 bg-white rounded-2xl p-5 max-w-[400px] ">
              <div className="heading ">
                <h2 className="text-dark text-[24px] md:text-[32px] font-bold mb-2">
                  Welcome back.
                </h2>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                action=""
                className="w-full"
              >
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
                        type={obj.type}
                        id={obj.uIdMobile}
                        placeholder={obj.placeHolder}
                        name={obj.uIdMobile}
                        className="inputField-mobile"
                      />
                      <p className="mt-1 text-dolghin text-[12px] md:text-sm font-medium ">
                        {obj.message}
                      </p>
                    </div>
                  );
                })}
                <div className="submit flex flex-col gap-5 mt-10">
                  <Link>
                    {" "}
                    <PrimaryButton
                      text={"Log in"}
                      type={"submit"}
                      customStyles={"customCreateAccount"}
                    />
                  </Link>
                  <Link>
                    {" "}
                    <SecondaryButton
                      type={"button"}
                      text={"Create Account"}
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

export default Login;
