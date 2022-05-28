import { createApp } from "./app.js";
import { createAnswersService } from "./services/answersService.js";
import { createUsersService } from "./services/usersService.js";
import { createSubscriptionsService } from "./services/subscriptionsService.js";

async function main() {
  try {
    const usersService = createUsersService();
    const subscriptionsService = createSubscriptionsService();
    const answersService = createAnswersService({
      usersService,
      subscriptionsService,
    });

    createApp({ answersService });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
