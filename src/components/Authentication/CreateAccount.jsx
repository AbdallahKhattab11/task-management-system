import { useState } from "react";
import bgImage from "../../assets/images/create-account-left-img.jpg";

const CreateAccount = () => {
  const form = [
    {
      id:"in-1",
      label: "Full Name",
      uId:"fullname",
      type: "text",
      placeHolder: "Enter Full Name",
      message: "Abdallah Khattab",
    },
    {
      id:"in-2",
      label: "Email Address",
      uId:"email",
      type: "email",
      placeHolder: "Enter Email",
      message: "exampe.abdallah@gmail.com",
    },
    {
      id:"in-3",
      label: "Enter A Password",
      uId:"password",
      type: "password",
      placeHolder: "Enter you password",
      message: "Upto 8 characters with an Uppercase, symbol and number",
    },
  ];
  return (
    <section className="h-auto lg:h-screen w-full py-5">
      <div className="wrapper flex flex-col-reverse lg:flex-row gap-15 ">
        <div className="left w-full lg:w-1/2 rounded-4xl grid grid-rows-3 p-10"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "right",
          }}
        >
          <div className="heading row-span-2 h-full flex items-center justify-left">
            <h1 className="text-[40px] md:text-[45px] lg:text-[56px] text-white font-semibold text-wrap">
              Take your <br /> productivity to the <br /> next level.
            </h1>
          </div>
          <div className="getMobileApp-copyright flex flex-col items-left gap-10">
            <fieldset className="self-start px-5 pb-5 pt-2 border border-white rounded-xl flex gap-5 ">
              <legend className="t-16-20 px-2 text-white font-semibold tracking-wide">
                Get the Moblie App
              </legend>
              <button type="button" className="apple">
                Download on Apple
              </button>
              <button type="button" className="android">
                Download on Android
              </button>
            </fieldset>
            <div className="copyRight text-white t-16-20 font-medium tracking-wide">
              Copyright 2025 | All Right Reserved
            </div>
          </div>
        </div>
        <div className="right w-full lg:w-1/2 elementCenter relative">
          <div className="flex flex-col gap-10">
            <div className="title">
              <h2 className="t-24-32 text-dark font-bold tracking-wide mb-2">
                Create an Account
              </h2>
              <p className="text-inputInfo text-[16px] md:text-[18px] font-medium tracking-wide">
                It's Simple and Easy!!
              </p>
            </div>
            <div className="">
              <form onSubmit={(e)=> e.preventDefault()} action="" className="flex flex-col gap-5">
                {form.map((obj)=> {
                  return (
                    <div key={obj.id} className="">
                      <label htmlFor={obj.uId} className="block mb-2 t-16-20 text-dark font-medium">{obj.label}</label>
                      <input type={obj.type} placeholder={obj.placeHolder} id={obj.uId} name={obj.uId} className="inputField"/>
                      <p className="text-inputInfo text-sm mt-1 font-medium tracking-wide">{obj.message}</p>
                    </div>
                  )
                })}
                <button type="submit" className="mt-5 t-16-20 bg-blue max-w-[350px] h-[50px] rounded-xl text-white font-medium tracking-wide cursor-pointer hover:scale-102 transition-all duration-300">Create Account</button>
              </form>
            </div>
          </div>
          <div className="login absolute top-5 right-5">
            <button type="button" className="secondaryButton">Log in</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateAccount;
