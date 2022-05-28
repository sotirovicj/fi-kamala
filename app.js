import express from "express";

export function createApp({ answersService, usersService }) {
  const app = express();

  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  app.get("/answers", async (req, res, next) => {
    try {
      const { userInput, userId } = req.body;
      const response = await answersService.handleUserInput(userInput, userId);
      res.json(response);
    } catch (err) {
      next(err);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
