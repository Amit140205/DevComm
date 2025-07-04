import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircleIcon, Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import useAuthHook from "../hooks/useAuthHook";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export const ContactUs = () => {
  //retriving authUser info to verify that the authenticated user sent the email
  const { authUser, isLoading } = useAuthHook();
//   console.log(authUser);

  const form = useRef();
  const [status, setStatus] = useState("idle"); // idle | sending | error

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          toast.success("message sent successfully");
          // setStatus("success");
          form.current.reset();
          setStatus("idle")
        },
        (error) => {
          toast.error("Failed to send message. Please try again.");
          setStatus("error");
          console.log(error);
        }
      );
  };

  return isLoading ? (
    <div className="flex justify-center py-12">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="space-y-4 text-sm max-w-md md:max-w-full"
    >
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          name="user_name"
          required
          className="input input-bordered w-full opacity-50"
          placeholder="Amit Mondal"
          value={authUser.fullName}
          readOnly
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="user_email"
          required
          className="input input-bordered w-full opacity-50"
          placeholder="amit123@gmail.com"
          value={authUser.email}
          readOnly
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Message</label>
        <textarea
          name="message"
          rows={4}
          required
          className="textarea textarea-bordered w-full"
          placeholder="Enter your valuable feedback, suggestions and report bugs also......."
        />
      </div>

      <button
        type="submit"
        className={`btn w-full ${
          status === "sending" ? "btn-disabled" : "btn-primary"
        }`}
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <Loader2Icon className="animate-spin size-4 mr-2" />
            Sending...
          </>
        )  : (
          "Send Message"
        )}
      </button>
      
    </form>
  );
};
