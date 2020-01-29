import React, { useState } from 'react';
import './App.css';
import OmmMememuc from './components/mememuc';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="App">
      <header>
        <h1>MemeMUC - React</h1>
      </header>
      <div className={classes.loading}>
      {
        !loaded && <LinearProgress />
      }
      </div>
      <OmmMememuc loaded={() => {
        setLoaded(true)
      }}/>
    </div>
  );
}

export default App;
