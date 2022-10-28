// import NavBar from 'components/nav/NavBar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Header from 'components/header';
import TodoList from 'components/todo/todo-list';
import dayjs from 'libs/dayjs';

import { range } from '../util/util';

import { customTheme } from 'styles/theme';

const App: React.FC = () => {
  const numDays = 7;

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />

        <Header date={dayjs()} />

        {range(1, numDays, 1).map((dayNo) => (
          <TodoList key={dayNo} dayNo={dayNo} />
        ))}
      </ThemeProvider>
    </>
  );
};

export default App;
