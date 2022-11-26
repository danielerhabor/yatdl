import { FC } from 'react';

import dayjs from 'libs/dayjs';
import { getMonthFromDate } from 'util/util';

import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, SxProps, Theme, Typography } from '@mui/material';

const Header: FC<{ date: dayjs.Dayjs }> = ({ date }) => {
  const currMonthSx: SxProps<Theme> = {
    fontWeight: '700',
    fontSize: '21px',
    lineHeight: '32px',
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center">
      <Typography sx={currMonthSx}>{getMonthFromDate(date)}</Typography>
      <Grid>
        <button>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          style={{
            marginLeft: '10px'
          }}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </Grid>
    </Grid>
  );
};

export default Header;
