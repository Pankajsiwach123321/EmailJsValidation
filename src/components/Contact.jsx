import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
export const Contact = () => {
  const [pop, setPop] = useState(false);
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
      message: /^[A-Za-z0-9.]{5,1000}$/,
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
      setFromdata({
        name: "",
        number: "",
        password: "",
        confirmpassword: "",
      });
      setFromerror({
        name: "",
        number: "",
        password: "",
        confirmpassword: "",
      });
      emailjs
        .sendForm("service_p07qtes", "template_91opoyo", form.current, {
          publicKey: "qN_3TJV48NGiMwDpX",
        })
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    }
  };

  return (
    <section className=" min-h-screen  flex flex-col justify-center items-center px-3">
      <h2 className=" text-black uppercase font-mono text-5xl font-bold">
        Email Js
      </h2>
      <form
        ref={form}
        onSubmit={sendEmail}
        className=" bg-white border-orange-600  border-2 rounded-xl mt-5 max-w-[520px] mx-auto w-full px-10 py-20 shadow-[0_0_4px_1px_#ff0000]"
      >
        <label className=" text-orange-700 font-mono text-3xl block">
          Name
        </label>
        <input
          onChange={inputCon}
          type="text"
          name="name"
          className={`${
            Fromerror.name && "!text-red-700"
          } border-2 outline-0 placeholder:font-mono  placeholder:text-green-400 text-black mt-3 rounded-lg border-green-500 px-3 py-5 w-full`}
        />
        {Fromerror.name && <p>{Fromerror.name}</p>}
        <label className=" text-orange-700 font-mono text-3xl block">
          Email
        </label>
        <input
          onChange={inputCon}
          type="email"
          name="username"
          className={`${
            Fromerror.username && "!text-red-700"
          }  border-2 outline-0 placeholder:font-mono  placeholder:text-green-400 text-black mt-3 rounded-lg border-green-500 px-3 py-5 w-full`}
        />
        {Fromerror.username && <p>{Fromerror.username}</p>}
        <label className=" text-orange-700 font-mono text-3xl block">
          Message
        </label>
        <textarea
          onChange={inputCon}
          name="message"
          className={`${
            Fromerror.message && "!text-red-700"
          } border-2 outline-0 placeholder:font-mono  placeholder:text-green-400 text-black mt-3 rounded-lg border-green-500 px-3 py-5 w-full`}
        />
        {Fromerror.message && <p>{Fromerror.message}</p>}
        <input
          type="submit"
          value="Send"
          className={`px-5 py-2 mt-6 bg-blue-600 font-mono rounded-xl text-white hover:text-blue-600 duration-300 hover:bg-white hover:border-blue-600 border border-transparent cursor-pointer`}
        />
      </form>
    </section>
  );
};
export default Contact;
