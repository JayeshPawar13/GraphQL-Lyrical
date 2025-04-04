import { gql, useMutation } from "@apollo/client";

const LIKE_LYRIC = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

const LyricList = ({
  lyrics,
}: {
  lyrics: { id: string; content: string; likes: number }[];
}) => {
  const [LikeLyric] = useMutation(LIKE_LYRIC);
  console.log(lyrics);

  const handleLike = (event, id: string, likes: number) => {
    event.preventDefault();
    LikeLyric({
      variables: { id },
      optimisticResponse: {
        likeLyric: { id, likes: likes + 1, __typename: "LyricType" },
      },
    });
  };
  return (
    <ul>
      {lyrics.map(({ id, content, likes }) => (
        <li>
          {content}
          <button onClick={(event) => handleLike(event, id, likes)}>
            Like {likes}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default LyricList;
