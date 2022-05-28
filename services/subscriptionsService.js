import fs from "fs";

export function createSubscriptionsService() {
  return {
    cancelSubscription,
    findSubscriptionByUserId,
    deleteSubscription,
  };

  function cancelSubscription(userId) {
    const subscription = findSubscriptionByUserId(userId);
    if (subscription) deleteSubscription(subscription.id);
  }

  function findSubscriptionByUserId(userId) {
    try {
      const subscriptions = getSubscriptions();
      const subscription = subscriptions.find(
        (subscription) => userId === subscription.userId
      );

      return subscription;
    } catch (err) {
      console.log("Something went wrong", err);
    }
  }

  function deleteSubscription(subscriptionId) {
    try {
      const subscriptions = getSubscriptions();
      const filteredSubscriptions = subscriptions.filter(
        (subscription) => subscriptionId !== subscription.id
      );

      saveSubscriptions(filteredSubscriptions);
    } catch (err) {
      console.log("Failed to delete subscription", err);
    }
  }
}

const saveSubscriptions = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("mockdb/subscriptions.json", stringifyData);
};

const getSubscriptions = () => {
  const jsonData = fs.readFileSync("mockDb/subscriptions.json");
  return JSON.parse(jsonData);
};
