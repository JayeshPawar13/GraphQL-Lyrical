import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import SONGS_QUERY from "../graphql/fetchSongs";

// GraphQL mutation to create a new song
const CREATE_SONG_MUTATION = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

const SongCreate = () => {
  const { loading, error, data } = useQuery(SONGS_QUERY);
  const [AddSong, { loading: mutationLoading }] =
    useMutation(CREATE_SONG_MUTATION);

  const [title, setTitle] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    AddSong({ variables: { title }, refetchQueries: [{ query: SONGS_QUERY }] });
    setTitle("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Create a new song</h1>
      <form onSubmit={handleSubmit} className="create-song">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter song title"
        />
        <button type="submit" disabled={mutationLoading}>
          {mutationLoading ? "Creating..." : "Create Song"}
        </button>
      </form>
      <ul>
        {data.songs.map((song) => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SongCreate;
