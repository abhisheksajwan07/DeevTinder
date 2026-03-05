import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );
      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "DevTinder",
        description: "Connect with fellow developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: { color: "#ffffff" },
        handler: verifyPremiumUser,
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500 text-sm">Loading...</div>
      </div>
    );
  }

  if (isUserPremium) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-5xl mb-4">⭐</div>
        <h2 className="text-2xl font-bold text-white mb-2">You're a Premium Member</h2>
        <p className="text-gray-400 text-sm max-w-xs">
          Enjoy unlimited connections and all premium features.
        </p>
      </div>
    );
  }

  const plans = [
    {
      id: "silver",
      name: "Silver",
      duration: "3 months",
      features: [
        "Chat with connections",
        "100 requests per day",
        "Verified badge",
      ],
    },
    {
      id: "gold",
      name: "Gold",
      duration: "6 months",
      features: [
        "Chat with connections",
        "Unlimited requests",
        "Verified badge",
        "Priority matching",
      ],
      highlight: true,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white">Upgrade to Premium</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Unlock the full DevTinder experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-[#111] border rounded-2xl p-8 flex flex-col ${plan.highlight
                ? "border-white"
                : "border-[#222]"
              }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </span>
            )}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">{plan.name}</h2>
              <p className="text-gray-400 text-sm mt-1">{plan.duration}</p>
            </div>

            <ul className="space-y-2.5 flex-1 mb-8">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleBuyClick(plan.id)}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${plan.highlight
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-[#1a1a1a] border border-[#333] text-white hover:border-white"
                }`}
            >
              Get {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Premium;
