const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const connectionRequest = require("../models/connectionRequest.model");

// This job runs at 8 AM every day and logs users with pending requests
cron.schedule("0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await connectionRequest
      .find({
        status: "interested",
        createdAt: {
          $gte: yesterdayStart,
          $lt: yesterdayEnd,
        },
      })
      .populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    console.log(
      `[CronJob] ${listOfEmails.length} user(s) have pending connection requests:`,
      listOfEmails
    );

    // NOTE: Email sending is handled outside this service.
    // Integrate your preferred email provider here if needed.
  } catch (err) {
    console.error("[CronJob] Error:", err);
  }
});
