/* eslint-disable react-hooks/rules-of-hooks */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useRef, useState } from "react";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import utils from "intl-tel-input/build/js/utils";
import "tailwindcss/tailwind.css"; // Import Tailwi

// const stripePromise = loadStripe(process.env.STRIPE_PK);
// const stripePromise = loadStripe(
//   "pk_test_51OqGxyLC5VPM7UrEA4nBO7zfb4RWH69EDADCQJm4WfVX4yWyXZX7lMUAUduOqzLsGdRkvAgFNBpBSEIt9YwbWzYf00vRli7JbU"
// );
const CheckoutForm = () => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [amount, setAmount] = useState(27);
  // const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const phoneInputRef = useRef(null);

  useEffect(() => {
    const phoneInput = phoneInputRef.current;

    // Initialize intlTelInput
    const iti = intlTelInput(phoneInput, {
      utilsScript: utils,
    });

    // Set initial country based on the user's location
    iti.promise.then(() => {
      const countryCode = iti.getSelectedCountryData().iso2;
      iti.setCountry(countryCode);
    });

    // Listen for the country change event
    phoneInput.addEventListener("countrychange", function () {
      const countryCode = iti.getSelectedCountryData().iso2;
      console.log("Selected country code:", countryCode);
    });

    return () => {
      // Clean up on unmount
      iti.destroy();
    };
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setCardError(error?.message);
    } else {
      setCardError("");
    }
    // setProcessing(true);
    setSuccess("");
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: "Jenny Rosen",
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    console.log("paymentIntent", paymentIntent);

    if ((paymentIntent.status = "succeeded")) {
      setSuccess(paymentIntent.status);
      console.log("success.....");
    }
    // setProcessing(false);
    // ---
  };

  return (
    <div>
      <div className="px-[30px] mx-auto">
        <div className="mb-4">
          <input
            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-[#dadada] focus:border-[#dadada] focus:ring-[#dadada]"
            placeholder="Full Name..."
          />
        </div>
        <div className="mb-4">
          <input
            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-[#dadada] focus:border-[#dadada] focus:ring-[#dadada]"
            placeholder="Email Address..."
            type="email"
          />
        </div>
        <input
          ref={phoneInputRef}
          className="block h-10 w-[634px] rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-t border-b border-r border-[#dadada] focus:border-[#dadada] focus:ring-[#dadada]"
          placeholder="Phone Number..."
        />
      </div>
      {/* ---------- */}
      <div className="bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[12px] mr-2">
              👆 CONFIRM YOUR DETAILS & GET ACCESS NOW
            </span>
          </div>
          <div className="flex-grow border-t-2 border-gray-200" />
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <span className="text-sm font-bold text-gray-600">Item</span>
            <div>
              <span className="text-sm font-bold text-gray-600 mr-[55px]">
                Quantity
              </span>
              <span className="text-sm font-bold text-gray-600">Price</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-b py-4">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-blue-500"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span className="text-[13px] font-bold">
                Ultimate ChatGPT Prompt Marketing Toolkits (Special Offer)
              </span>
            </div>
            <span className="text-sm font-medium">1</span>
            <span className="text-sm font-bold text-blue-600">$27.00</span>
          </div>
        </div>
      </div>
      {/* ---------- */}
      <div className="m-5">
        <div className="bg-[#fefcbf] rounded-lg pt-6 border-2 border-dotted border-gray-400">
          <div className="flex items-start mb-4">
            <img
              className="ml-4"
              src="data:image/webp;base64,UklGRsYBAABXRUJQVlA4WAoAAAASAAAAGwAAEAAAQU5JTQYAAAAAAAAAAABBTk1GsgAAAAAAAAAAABsAABAAAA4BAANWUDhMmgAAAC8bAAQQH8GgbSRHx59rL/8/ys/gmH/FbSQ19F8pvxwHBs1/FIG/ppDrB1yyELIAuslyFqb4AEKWNQHOIiSbiaij+ADg3QGyESEADttIUqQ+Zmaeu84/y/v/mY8gov8TgH+eYwt5et+AvCoLck3eJuoOgQWlcQzIPbMgJ4uz0Ls7D2pLBKAefnxejhyqQlJaF2pjCG3ZUuiX+BpBTk1GJgAAAAAAAAAAAAAAAAAAAOYAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcAQU5NRrIAAAAAAAAAAAAbAAAQAABGAAAAVlA4TJoAAAAvGwAEEB/BoG0kR8efay//P8rP4Jh/xW0kNfRfKb8cBwbNfxSBv6aQ6wdcshCyALrJcham+ABCljUBziIkm4moo/gA4N0BshEhAA7bSFKkPmZmnrvOP8v7/5mPIKL/E4B/nmMLeXrfgLwqC3JN3ibqDoEFpXEMyD2zICeLs9C7Ow9qSwSgHn58Xo4cqkJSWhdqYwht2VLol/ga"
              alt=""
            />
            <input type="checkbox" />
            <span className="text-[#009900] ml-1 mt-[-6px] font-bold">
              Add 967 'Personality Prompts' to Create 30 Days Of Amazing
              Contents
            </span>
          </div>
          <div className="bg-[#fbf8e3] p-3 border-[#ff9900]">
            <p className="text-[16px] mb-2">
              <span className="underline text-[#ff0000] font-bold ">
                90% OFF (This page only) $12:
              </span>{" "}
              Start writing &amp; automating your content with the 30 Days Of
              Content In 30 Minutes...(Normally $399) The only system built to
              write in your own voice, create, repurpose and scale content
              creation in no time!
            </p>
          </div>
        </div>
      </div>
      {/* ---------- */}
      <div className="max-w-4xl mx-auto my-4 px-8">
        <div className="text-[15px] font-bold pb-2">Order Summary</div>
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 align-middle text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 font-bold text-left">
                  Fill In Your Email before select Paypal
                </th>
                <th className="h-12 align-middle text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 font-bold text-center">
                  Quantity
                </th>
                <th className="h-12 align-middle text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 font-bold text-right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              <tr className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="pt-4 align-center text-start ">
                  Ultimate ChatGPT Prompt Marketing Toolkits (Special Offer)
                </td>
                <td className="pt-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-center text-[#297daf] font-bold">
                  1
                </td>
                <td className="pt-4 pr-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right text-[#297daf] font-bold">
                  $27.00
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className=" align-middle text-start">
                  Add 967 'Personality Prompts' to Create 30 Days Of Amazing
                  Contents
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-center text-[#297daf] font-bold">
                  1
                </td>
                <td className="py-3 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right text-[#297daf] font-bold">
                  $12.00
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="py-3 align-middle [&amp;:has([role=checkbox])]:pr-0 font-bold text-left">
                  Order Subtotal
                </td>
                <td className="py-3 align-middle [&amp;:has([role=checkbox])]:pr-0"></td>
                <td className="py-3 align-middle [&amp;:has([role=checkbox])]:pr-0 text-[#297daf] font-bold text-right">
                  $39.00
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="py-3 align-middle [&amp;:has([role=checkbox])]:pr-0 font-bold text-left">
                  Order Total
                </td>
                <td className="py-3 align-middle [&amp;:has([role=checkbox])]:pr-0"></td>
                <td className="py-3 align-middle [&amp;:has([role=checkbox])]:pr-0 text-[#297daf] font-bold text-right">
                  $39.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* --------- */}
      <div className="max-w-4xl mx-auto p-6">
        {/* <div className="flex flex-col mb-4">
          <label htmlFor="country" className="mb-2 text-start font-semibold">
            Country
          </label>
        </div> */}
        <div className="p-4 border-[1px] border-[#94959b]" id="payment-card">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "green",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                  padding: "10px",
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button className="btn btn-sm" type="submit" disabled={!stripe}>
          <div className="py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
            Pay
          </div>
        </button>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-red-500 mr-2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="12"></line>
            <line x1="12" x2="12.01" y1="16" y2="16"></line>
          </svg>
          <span className="text-red-500 text-[14px]">
            Make sure that you filled all the details!
          </span>
        </div>{" "}
      </div>
    </div>
  );
};

export default CheckoutForm;
