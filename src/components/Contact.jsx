import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
export const Contact = () => {
  const [fromdata, setFromdata] = useState({
    name: "",
    username: "",
    message: "",
  });
  const [Fromerror, setFromerror] = useState({
    name: "",
    username: "",
    message: "",
  });
  const inputCon = (e) => {
    const { name, value } = e.target;
    setFromdata({ ...fromdata, [name]: value });
  };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const regex = {
      name: /^[a-zA-Z\s]+$/,
      username:
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      message: /^[A-Za-z0-9.\s]{5,1000}$/,
    };
    const error = {};
    if (!regex.name.test(fromdata.name)) {
      error.name = "invaild name";
    }
    if (!regex.username.test(fromdata.username)) {
      error.username = "invaild username";
    }
    if (!regex.message.test(fromdata.message)) {
      error.message = "invaild message";
    }
    setFromerror(error);
    if (Object.keys(error).length === 0) {
      emailjs
        .sendForm("service_p07qtes", "template_91opoyo", form.current, {
          publicKey: "qN_3TJV48NGiMwDpX",
        })
        .then(
          () => {
            console.log("SUCCESS!");
            setFromdata({
              name: "",
              username: "",
              message: "",
            });
            setFromerror({
              name: "",
              number: "",
              password: "",
              confirmpassword: "",
            });
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    }
  };

  return (
    <section className=" min-h-screen bg-black  flex flex-col justify-center items-center px-5">
      <h2 className=" bg-text bg-clip-text text-transparent Helvetica  uppercase Helvetica text-5xl font-bold">
        Email Js
      </h2>
      <form
        ref={form}
        onSubmit={sendEmail}
        className=" bg-img bg-cover border-[#31302C] border-4 bg-no-repeat   rounded-xl mt-5 max-w-[520px] mx-auto w-full px-10 py-20 "
      >
        <label className=" bg-text bg-clip-text text-transparent Helvetica text-2xl font-bold block">
          Name
        </label>
        <input
          onChange={inputCon}
          type="text"
          name="name"
          placeholder="Name"
          value={fromdata.name}
          className={` border outline-0 placeholder:Helvetica  placeholder:text-[#B3B0AD] bg-transparent text-[#B3B0AD] mt-2 rounded-lg border-[#31302C] px-5 py-[17px] w-full`}
        />
        {Fromerror.name && <p>{Fromerror.name}</p>}
        <label className=" bg-text bg-clip-text text-transparent Helvetica text-2xl font-bold mt-5 block">
          Email
        </label>
        <input
          onChange={inputCon}
          type="email"
          value={fromdata.username}
          name="username"
          placeholder="Email"
          className={` border-2 outline-0 placeholder:Helvetica bg-transparent  placeholder:text-[#B3B0AD] text-[#B3B0AD] mt-2 rounded-lg border-[#31302C] px-5 py-[17px] w-full`}
        />
        {Fromerror.username && <p>{Fromerror.username}</p>}
        <label className=" bg-text bg-clip-text text-transparent Helvetica text-2xl font-bold mt-5 block">
          Message
        </label>
        <textarea
          onChange={inputCon}
          name="message"
          value={fromdata.message}
          placeholder="Message"
          className={`border-2 resize-none outline-0 placeholder:Helvetica bg-transparent  placeholder:text-[#B3B0AD] text-[#B3B0AD] mt-2 rounded-lg border-[#31302C] px-5 py-[17px] w-full`}
        />
        {Fromerror.message && <p>{Fromerror.message}</p>}
        <div className=" group inline-flex items-center gap-2 mt-6 border-b border-b-[#F4EAD8] ">
          <input
            type="submit"
            value="Send"
            className={` py-2   bg-text bg-clip-text text-transparent Helvetica rounded-xl   duration-300   border border-transparent cursor-pointer`}
          />
          <span className=" group-hover:translate-x-1 duration-300">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12L13 18M19 12L13 6M19 12L5 12"
                stroke="url(#paint0_linear_51109_714)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_51109_714"
                  x1="19"
                  y1="6"
                  x2="4.69489"
                  y2="16.925"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F4EAD8" />
                  <stop offset="1" stop-color="#E0B764" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>
      </form>
    </section>
  );
};
export default Contact;
