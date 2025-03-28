const LyricList = ({
  lyrics,
}: {
  lyrics: { id: string; content: string }[];
}) => {
  console.log(lyrics);

  return (
    <ul>
      {lyrics.map(({ content }) => (
        <li>{content}</li>
      ))}
    </ul>
  );
};

export default LyricList;
