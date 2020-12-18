import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableProps } from '../types/main';
import { addRegionNames, joinTopRegions } from '../utils/utils';

const TurnoutTable = ({ topRegions, regionNames }: TableProps) => {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  const topRegionsWithNames = addRegionNames(topRegions, regionNames);
  const rowData = joinTopRegions(topRegionsWithNames);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Year</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Region</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Voter Turnout (&#37;)</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row) => (
              <TableRow key={row.year}>
                <TableCell component="th" scope="row">
                  {row.year}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">
                  {row.percentage}
                  {'%'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TurnoutTable;
