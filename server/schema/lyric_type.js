import mongoose from "mongoose";
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
} from "graphql";
import SongType from "./song_type.js";
const Lyric = mongoose.model("lyric");

const LyricType = new GraphQLObjectType({
  name: "LyricType",
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: SongType,
      resolve(parentValue) {
        return Lyric.findById(parentValue)
          .populate("song")
          .then((lyric) => {
            console.log(lyric);
            return lyric.song;
          });
      },
    },
  }),
});

export default LyricType;
