
import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from '../../assets/bamboo_craft.jpg';
import theme from '../../ui/Theme';

export default makeStyles(() => {

    return ({
        authentication: {
            marginLeft: 'auto',
        },
        authenticatedItems: {
            paddingLeft: theme.spacing(1),
        },
        appBar: { backgroundColor: '#c9340a' },
        icon: {
            // marginRight: theme.spacing(2),
            height: "50px",
            width: "55px",
            borderRadius: "5px"
        },
        backofficeBackground: {
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize:'100%',
        },
        heroContent: {
            // backgroundImage: `url(${BackgroundImage}`,
            // backgroundSize: 'cover',
            // height: 800,
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(5, 0, 4),
        },
        heroButtons: {
            marginTop: theme.spacing(2),
        },
        languageButtons: {
            color: theme.palette.background.paper,
            backgroundColor: theme.palette.primary.main,
        },
        cardGrid: {
            paddingTop: theme.spacing(4),
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
            backgroundColor: theme.palette.primary.main,
            color: '#F5F5F5',
            padding: theme.spacing(2),
        },
    })
});
