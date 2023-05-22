import express from "express";
import bodyParser from "body-parser";

import userRoutes from "./api/routes/userRoute.js";

// Import the producer and consumer
import producer from "./producers/mailSender.producer.js";
import consumer from "./consumers/mailSender.consumer.js";
import listener from "./listener/eventListener.js";

const app = express();

const PORT = 5000;

app.use(bodyParser.json());

app.use("/api", userRoutes);

app.get("/", (req, res) => {
    console.log("Home page");
    res.send("Hello from home page");
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
