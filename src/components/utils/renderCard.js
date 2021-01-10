import { Link } from 'react-router-dom'
import { Card, CardActionArea, CardContent, CardActions, CardMedia, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 250,
    },
  });
  

const RenderCards = ({ persons, remove }) => {
    const classes = useStyles();

    return persons.map((d, i) => (
        <Card className={classes.root} key={i}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={d.Image}
                    title={d.name}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {d.name}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link className='link' to={`/user/${d.id}`}>
                    <Button size="small" color="primary" onClick={() => {window.localStorage.setItem("person", JSON.stringify(d))}}>
                        View
                    </Button>
                </Link>
                <Button onClick={() => remove(d.id)} size="small" color="secondary">
                    Remove
                </Button>
            </CardActions>
        </Card>
    ))
}

export default RenderCards