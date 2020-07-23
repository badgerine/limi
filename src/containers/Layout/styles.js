
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';



export default makeStyles(() => {

    const theme = createMuiTheme({
        palette: {
          primary: {
            main: '#c9340a',
            contrastText: '#fff',
          },
          secondary: {
            main: '#c9340a',
            contrastText: '#000',
          },
        },
      });
      
    return ({
        appBar: {
            backgroundColor: theme.palette.primary.main,
            // color: theme.palette.primary.main
        },
        icon: {
            marginRight: theme.spacing(2),
            height: "50px",
            width: "50px",
            borderRadius: "5px"
        },
        heroContent: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
            marginTop: theme.spacing(4),
        },
        languageButtons: {
            color: theme.palette.background.paper,
            backgroundColor: theme.palette.primary.main,
        },
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '56.25%', // 16:9
        },
        cardContent: {
            flexGrow: 1,
        },
        footer: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(6),
        },
    })
});
