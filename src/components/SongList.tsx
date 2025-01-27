import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import SONGS_QUERY from "../graphql/fetchSongs";

// GraphQL mutation to delete a song
const DELETE_SONG_MUTATION = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const SongList = () => {
  const { loading, error, data } = useQuery(SONGS_QUERY);
  const [deleteSong, { loading: mutationLoading }] = useMutation(
    DELETE_SONG_MUTATION,
    {
      refetchQueries: [{ query: SONGS_QUERY }],
    }
  );

  const handleDelete = (id: string) => {
    deleteSong({ variables: { id } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Song List</h1>
      <ul>
        {data.songs.map((song) => (
          <li key={song.id} className="songs-list">
            <Link to={`/view/${song.id}`}>{song.title}</Link>
            {!mutationLoading && (
              <i
                className="fa-solid fa-trash icon"
                onClick={() => handleDelete(song.id)}
              ></i>
            )}
          </li>
        ))}
      </ul>
      <Link to="/create">
        <button>Add Song</button>
      </Link>
    </div>
  );
};

export default SongList;
