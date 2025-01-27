import "./server/models/index.js";
import express from "express";
import mongoose from "mongoose";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "./server/schema/schema.js";
import bodyParser from "body-parser";
import { ruruHTML } from "ruru/server";
import cors from "cors";
const MONGO_URI =
  "mongodb+srv://jay:lQZwniM4j3QhemVD@cluster0.2w6mj.mongodb.net/lyrical?retryWrites=true&w=majority&appName=Cluster0";
if (!MONGO_URI) {
  throw new Error("You must provide a Mongo Atlas URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to Mongo Atlas instance."))
  .on("error", (error) =>
    console.log("Error connecting to Mongo Atlas:", error)
  );

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Root resolver function
const root = {
  hello: () => "Hello world!",
};

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Use the GraphQL handler for the /graphql endpoint
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Start the server on port 4000
app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
