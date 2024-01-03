import { Button, Stack } from '@mui/material';

interface QuizButtonsProps {
  countryOrCapital: string[];
  selected: string | undefined;
  setSelected: (name: string) => void;
  mainColor: string;
  lightColor: string;
}

const QuizButtons = (props: QuizButtonsProps) => {
  const { countryOrCapital, selected, setSelected, mainColor, lightColor } =
    props;
  return (
    <Stack>
      {countryOrCapital &&
        countryOrCapital.map((name) => (
          <Stack key={name} paddingBottom={1}>
            <Button
              key={name}
              onClick={() => setSelected(name)}
              variant="contained"
              sx={{
                backgroundColor: selected === name ? mainColor : lightColor,
                color: 'black',
              }}
            >
              {name}
            </Button>
          </Stack>
        ))}
    </Stack>
  );
};

export default QuizButtons;

