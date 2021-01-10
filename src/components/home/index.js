import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { InputAdornment, OutlinedInput } from '@material-ui/core'
import { Card, CardActionArea, CardContent, CardActions, CardMedia, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {
    Search,
    ThumbUp,
    ThumbDown
} from '@material-ui/icons'

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 250,
    },
  });

const HomePage = () => {
    const [ data, setData ] = useState([])
    const [ persons, setPersons ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ searchTerm, setSearchTerm ] = useState('')


    useEffect(() => {
        if(data.length === 0 && loading){
            fetchData()
        }
    }, [])

    const fetchData = async () => {
        const response = await axios.get('https://cors-anywhere.herokuapp.com/https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json', {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        console.log(response)
        setData([...response.data])
        setPersons([...response.data])
        setLoading(false)
    }

    const search = (val) => {
        if(val === ''){
            setPersons([...data])
        }else{
            let searchData = []
            data.forEach((d, index) => {
            if(d.name.toLowerCase().includes(val.toLowerCase())){
                // console.log(hobby)
                searchData.push(d)
            }
    })

            setPersons([...searchData])
        }
    }

    return(
        <>
        {
            loading && <div className='flex center'>Loading...</div>
        }
        { !loading && <div className='body-container'>
            <div className='search-bar flex center'>
                <OutlinedInput
                    className='search-field'
                    variant='outlined'
                    margin='dense'
                    type='text' 
                    name='search' 
                    placeholder='Search Here...'
                    value={searchTerm} 
                    onChange={(e) => {setSearchTerm(e.target.value); search(e.target.value)}}
                    startAdornment={
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      }
                />
                <Link className='link' to='/selected'><button title='view selected candidates' className='btn select'><ThumbUp /> <span className='btn__text'>Selected</span> </button></Link>
                <Link className='link' to='/rejected'><button title='view rejected candidates' className='btn reject'><ThumbDown  /> <span className='btn__text'>Rejected</span> </button></Link>
            </div>
            <div className='card-container'>
                { persons.map((d, i) => <RenderCards d={d} i={i} />)}
            </div>
        </div>}
        </>
    )
}

const RenderCards = ({ d, i }) => {
    const classes = useStyles();
    const [ selected, setSelected] = useState(false)
    const [ rejected, setRejected ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        const per = d

        if(window.localStorage.getItem('selected')){
            const sel = JSON.parse(window.localStorage.getItem('selected'))
            sel.forEach(e => {
                if(e.id === per.id){
                    setSelected(true)
                    setLoading(false)
                }
            });
        }
        if(window.localStorage.getItem('rejected')){
            const rej = JSON.parse(window.localStorage.getItem('rejected'))
            rej.forEach(e => {
                if(e.id === per.id){
                    setRejected(true)
                    setLoading(false)
                }
            });
        }

    }, [loading])

    const select = (index) => {
        if(window.localStorage.getItem("selected")){
            const selected = JSON.parse(window.localStorage.getItem("selected"))
            const newSelected = [...selected, d]
            window.localStorage.setItem("selected", JSON.stringify(newSelected))
        }else{
            const newSelected = [d]
            window.localStorage.setItem("selected", JSON.stringify(newSelected))
        }
        setLoading(true)
    }

    const reject = (index) => {
        if(window.localStorage.getItem("rejected")){
            const rejected = JSON.parse(window.localStorage.getItem("rejected"))
            const newRejected = [...rejected, d]
            window.localStorage.setItem("rejected", JSON.stringify(newRejected))
        }else{
            const newRejected = [d]
            window.localStorage.setItem("rejected", JSON.stringify(newRejected))
        }
        setLoading(true)
    }

    return (
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
                {!rejected && <Button size="small" color="primary" onClick={() => {if(!selected)select()}}>
                    {selected ? 'Selected' : 'Select'}
                </Button>}
                {!selected && <Button size="small" color='secondary' onClick={() => {if(!rejected)reject()}}>
                    {rejected? 'Rejected' : 'Reject' }
                </Button>}
            </CardActions>
        </Card>
    )
}

export default HomePage