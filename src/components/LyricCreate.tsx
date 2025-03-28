import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CREATE_LYRIC_MUTATION = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
      }
    }
  }
`;

const LyricCreate = () => {
  const [lyric, setLyric] = useState("");
  const { id } = useParams();
  const [AddLyric, { loading: mutationLoading }] = useMutation(
    CREATE_LYRIC_MUTATION
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    AddLyric({
      variables: { content: lyric, songId: id },
    }).then(() => setLyric(""));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="add-lyric">Add a Lyric</label>
      <input
        type="text"
        name="add-lyric"
        value={lyric}
        onChange={(event) => setLyric(event.target.value)}
      />
      <button type="submit" disabled={mutationLoading}>
        {mutationLoading ? "Creating..." : "Create Lyric"}
      </button>
    </form>
  );
};

export default LyricCreate;
