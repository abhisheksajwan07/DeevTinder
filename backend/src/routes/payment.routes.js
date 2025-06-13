const express = require("express");
const { userAuth } = require("../middlewares/auth.middlewares");
const paymentRouter = express.Router();
const Payment = require("../models/payment.model");
const User = require("../models/user.model");
const razorpayInstance = require("../utils/razorPay");
const { membershipAmount } = require("../utils/constants");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;
    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });
    console.log(order);
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error("Payment create error:", err);
    return res.status(500).json({ msg: err.message });
  }
});
// paymentRouter.post("/payment/webhook", async (req, res) => {
//   try {
//     console.log("Webhook Called");
//     const webhookSignature = req.get("X-Razorpay-Signature");
//     console.log("Webhook Signature", webhookSignature);

//     const isWebhookValid = validateWebhookSignature(
//       JSON.stringify(req.body),
//       webhookSignature,
//       process.env.RAZORPAY_WEBHOOK_SECRET
//     );

//     if (!isWebhookValid) {
//       console.log("INvalid Webhook Signature");
//       return res.status(400).json({ msg: "Webhook signature is invalid" });
//     }
//     console.log("Valid Webhook Signature");

//     // Udpate my payment Status in DB
//     const paymentDetails = req.body.payload.payment.entity;

//     const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
//     payment.status = paymentDetails.status;
//     await payment.save();
//     console.log("Payment saved");

//     const user = await User.findOne({ _id: payment.userId });
//     user.isPremium = true;
//     user.membershipType = payment.notes.membershipType;
//     console.log("User saved");

//     await user.save();

//     return res.status(200).json({ msg: "Webhook received successfully" });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    console.log("✅ Webhook Called");

    // 1. Check if Razorpay sent the Signature Header
    const webhookSignature = req.get("X-Razorpay-Signature");
    if (!webhookSignature) {
      console.log("❌ No Webhook Signature Found");
      return res.status(400).json({ msg: "No signature provided" });
    }

    console.log("🔐 Webhook Signature:", webhookSignature);

    // 2. Verify Signature
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      console.log("❌ Invalid Webhook Signature");
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }

    console.log("✅ Valid Webhook Signature");

    // 3. Log Incoming Payload
    console.log("🔔 Webhook Payload:", JSON.stringify(req.body, null, 2));

    // 4. Extract Payment Details
    const paymentDetails = req.body.payload?.payment?.entity;

    if (!paymentDetails) {
      console.log("❌ Payment Entity not found in payload");
      return res.status(400).json({ msg: "Payment entity missing" });
    }

    // 5. Find the Payment in DB
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

    if (!payment) {
      console.log(
        "❌ Payment not found in DB for orderId:",
        paymentDetails.order_id
      );
      return res.status(404).json({ msg: "Payment not found" });
    }

    // 6. Update Payment
    payment.status = paymentDetails.status;
    await payment.save();
    console.log("💾 Payment status updated:", payment.status);

    // 7. Update User to Premium
    const user = await User.findOne({ _id: payment.userId });

    if (!user) {
      console.log("❌ User not found for ID:", payment.userId);
      return res.status(404).json({ msg: "User not found" });
    }

    user.isPremium = true;
    user.membershipType = payment.notes?.membershipType || "unknown";
    await user.save();
    console.log("🏅 User upgraded to Premium:", user.emailId);

    // 8. Send Response
    return res.status(200).json({ msg: "Webhook processed successfully" });
  } catch (err) {
    console.error("❗ Error in webhook:", err.message);
    return res.status(500).json({ msg: err.message });
  }
});

paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
  const user = req.user.toJSON();
  console.log(user);
  if (user.isPremium) {
    return res.json({ ...user });
  }
  return res.json({ ...user });
});

module.exports = paymentRouter;
