import express from "express";
import { diary, food, user } from "./resources";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const swaggerDocument = YAML.load(__dirname + "/../docs/swagger.yaml");
const api = express();
// TODO figure better way how to solve CORS
const cors = require("cors");
api.use(cors());
api.use(express.json());
api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
api.use(express.urlencoded({ extended: true }));

api.use(express.static("public"));

api.get("/", (_, res) =>
  res.send({
    status: "success",
    data: {},
    message: "Welcome to our API",
  })
);

// ENDPOINTS FOR FOOD //
api.post("/api/food", food.store);
api.get("/api/food/search/:name", food.searchByName);
api.get("/api/food/search", food.getAll);
api.put("/api/food/:name", food.update);
api.get("/api/food/:name", food.get);
api.get("/api/food", food.getAll);

api.delete("/api/food/:name", food.deleteFood);

// GETTING INFORMATION ABOUT USER //
api.get("/api/user", user.get);

/* DIARY */
api.get("/api/diary/:date", diary.get);
api.post("/api/diary", diary.store);
api.put("/api/diary", diary.update);
api.delete("/api/diary/:id", diary.deleteEntry);

// ENDPOINTS FOR LOGIN AND REGISTRATION //
api.post("/api/register", user.register);
api.post("/api/login", user.login);
api.post("/api/logout", user.logout);

// ENDPOINT FOR UPDATING USER DATA //
api.put("/api/user", user.update);
api.put("/api/user/password", user.updatePassword);

/* DELETING USER */
api.delete("/api/user", user.deleteUser);

api.listen(process.env["PORT"] || 3000, () => {
  console.log(
    `Express app is listening at http://localhost:${
      process.env["PORT"] || 3000
    }`
  );
});
