import { stringSimilarity } from "string-similarity-js";
import fs from "fs";

const DEFAULT_RESPONSE =
  "Sorry, I couldn't understand that. Please try phrasing your question differently";

export function createAnswersService({ subscriptionsService, usersService }) {
  return {
    handleUserInput,
  };

  function handleUserInput(userInput, userId) {
    let response;
    const { phrase, matchValue, type, answer } = findMatchingPhrase(userInput);
    if (matchValue < 0.4) {
      response = DEFAULT_RESPONSE;
      return response;
    }
    if (type === "COMMAND") {
      response = handleCommand(phrase, userId);
    }
    if (type === "FAQ") {
      response = answer;
    }
    return response;
  }

  function handleCommand(command, userId) {
    let response;
    switch (command) {
      case "Cancel my subscription":
        subscriptionsService.cancelSubscription(userId);
        response = "Subscription cancelled";
        break;
      case "Delete all my data":
        subscriptionsService.cancelSubscription(userId);
        usersService.deleteUser(userId);
        response = "Data deleted";
        break;
      default:
        response = "Command not found";
    }

    return response;
  }

  function getSupportedPhrases() {
    const jsonData = fs.readFileSync("mockDb/supportedPhrases.json");
    return JSON.parse(jsonData);
  }

  function findMatchingPhrase(userInput) {
    const supportedPhrases = getSupportedPhrases();
    const match = supportedPhrases.reduce(
      (acc, { phrase, type, answer }) => {
        const matchValue = stringSimilarity(userInput, phrase);
        if (matchValue >= acc.matchValue)
          acc = { matchValue, phrase, type, answer };
        return acc;
      },
      { matchValue: 0 }
    );
    return match;
  }
}
