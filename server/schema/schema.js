import { GraphQLSchema } from "graphql";
import { RootQuery } from "./root_query_type.js";
import mutations from "./mutations.js";

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
});

export default schema;
