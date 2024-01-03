const Language = ({
  languages,
}: {
  languages: {
    [key: string]: string;
  };
}) => {
  const languagesValue = Object.values(languages);
  return (
    <ul>
      {languagesValue.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  );
};

export default Language;
