import { useQuery } from "@apollo/client";
import SONG_QUERY from "../graphql/fetchSong";
import { useParams } from "react-router-dom";

const SongDetail = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(SONG_QUERY, {
    variables: { id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const song = data?.song;

  return (
    <div>
      <h1>Song Details</h1>
      {song ? (
        <div>
          <h2>{song.title}</h2>
          <p>ID: {song.id}</p>
        </div>
      ) : (
        <p>No song found</p>
      )}
    </div>
  );
};

export default SongDetail;
