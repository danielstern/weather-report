import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * A helper component for rendering tab drawers
 * Like the one that contain the temperature / precipiation charts
 * MUI has a built in version as well but the specification that
 * our implementation is based on prefers this home-grown solution
 */
export function TabPanel(props) {
	const { children, value, index, ...other } = props;
  
	return (
	  <div
		role="tabpanel"
		hidden={value !== index}
		id={`simple-tabpanel-${index}`}
		aria-labelledby={`simple-tab-${index}`}
		{...other}
	  >
		{value === index && (
		  <Box sx={{ p: 3 }}>
			<Typography>{children}</Typography>
		  </Box>
		)}
	  </div>
	);
  }
  