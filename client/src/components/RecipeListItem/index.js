// React 
import * as React from 'react';

// Queries/Mutations
import { useQuery, useMutation } from '@apollo/client';
import {
    QUERY_ME,
    QUERY_RECIPES
} from '../../utils/queries';

// Material UI components
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Material UI methods
import { styled } from '@mui/material/styles';

// react-icons
import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import { IoMdTimer } from "react-icons/io";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));


export default function Elevation() {
  return (
    <Grid container spacing={2}>
        <Grid item xs={6}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
              }}
            >
                  <ListItem
                      elevation="4"
                      sx={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: ".1rem",
                          marginRight: ".1rem"
                      }}
                  >
                      <ListItemText
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: ".1rem",
                            marginRight: ".1rem"
                          }}
                      >
                          Recipe Name
                      </ListItemText>
                      <ListItemIcon
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        marginLeft: ".1rem",
                        marginRight: ".1rem",
                        height: "5px"
                          }}
                      >
                          <RiStarSFill/>
                          <RiStarSFill/>
                          <RiStarSFill/>
                          <RiStarSLine />
                          <RiStarSLine />
                      </ListItemIcon>
                      <ListItemIcon>
                          <IoMdTimer/>
                      </ListItemIcon>
                      <ListItemText
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: ".1rem",
                        marginRight: ".1rem"
                          }}
                      >

                      </ListItemText>
                </ListItem>
            </Box>
        </Grid>
    </Grid>
  );
}
