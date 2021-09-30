// import React from 'react'
// import { useQuery, useMutation } from '@apollo/client';

// import {
//   QUERY_ME,
//   QUERY_RECIPES
// } from '../utils/queries';

// import {
//   Typography,
// } from '@mui/material'

// import RecipeListItem from '../components/RecipeListItem';

// export default function RecipeFeed() {

//   const [loading, data ] = useQuery(QUERY_RECIPES)
//   console.log(data)
//   const recipes = data || {};

//   return (
//     // <Box mx={{ xs: 0, md: 5, xl: 20 }}>
//       <Box
//         sx={{
//           pt: 2,
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginTop: '.4rem',
//           borderBottom: 1,
//           borderColor: 'divider',
//         }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Typography variant='h4' fontWeight='bold' color='primary'>
//             All Recipes
//           </Typography>
//         </Box>
//       </Box>
//       

//       
//         <List sx={{ m: 0, p: 0, pt: 0, pb: 0 }}>
//             {recipes.map((recipe) => (
//               <Box key={recipe._id}>
//                 <RecipeListItem key={recipe._id} recipe={recipe}></RecipeListItem>
//               </Box>
//             ))}
//         </List>
//       
//       <Grid container>
//         <Grid item xs={12} md={6}></Grid>
//         {/* Forked Recipes */}
//         <Grid item xs={12} md={6}></Grid>
//       </Grid>
//     </Box>
//   );
// }

