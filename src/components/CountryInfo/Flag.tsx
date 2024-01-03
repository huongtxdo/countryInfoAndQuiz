interface FlagProps {
  flag: string;
  name: string;
  flagWidth: number;
}

const Flag = ({ flag, name, flagWidth }: FlagProps) => {
  return <img src={flag} style={{ width: flagWidth }} alt={name} />;
};

export default Flag;

