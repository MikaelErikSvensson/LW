import React, { useState, useEffect } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TurnoutTable from './components/TurnoutTable';
import Loading from './components/Loading';
import { Name, Turnout } from './types/main';
import { getRegionTurnout, getRegionNames } from './api/scb';
import { findTopRegions } from './utils/utils';

const App = () => {
  const [topRegions, setTopRegions] = useState<Array<Turnout>>();
  const [regionNames, setRegionNames] = useState<Array<Name>>();
  const url = 'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/ME/ME0104/ME0104D/ME0104T4';

  const getRegions = () => {
    return Promise.all([getRegionTurnout(url), getRegionNames(url)]);
  };

  useEffect(() => {
    getRegions().then(([turnout, names]) => {
      setRegionNames(names);
      setTopRegions(findTopRegions(turnout));
    });
  }, []);

  return (
    <div>
      <AppBar color="default" position="static">
        <Toolbar>
          <Typography variant="h5">Highest voter turnout in Swedish general elections</Typography>
        </Toolbar>
      </AppBar>
      {typeof topRegions !== 'undefined' ? (
        <TurnoutTable topRegions={topRegions} regionNames={regionNames} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default App;
