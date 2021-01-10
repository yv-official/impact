import { useState, useEffect } from 'react'

const UserPage = (props) => {
    const [ person, setPerson ] = useState({name: '', Image: '', id: ''})
    const [ selected, setSelected ] = useState(false)
    const [ rejected, setRejected ] = useState(false)

    useEffect(() => {
        const per = JSON.parse(window.localStorage.getItem('person'))
        setPerson({...per})

        if(window.localStorage.getItem('selected')){
            const sel = JSON.parse(window.localStorage.getItem('selected'))
            sel.forEach(e => {
                console.log(e.id, per.id)
                if(e.id === per.id){
                    setSelected(true)
                }
            });
        }
        if(window.localStorage.getItem('rejected')){
            const rej = JSON.parse(window.localStorage.getItem('rejected'))
            rej.forEach(e => {
                if(e.id === per.id){
                    setRejected(true)
                }
            });
        }

    }, [])

    const select = () => {
        if(window.localStorage.getItem("selected")){
            const selected = JSON.parse(window.localStorage.getItem("selected"))
            const newSelected = [...selected, person]
            window.localStorage.setItem("selected", JSON.stringify(newSelected))
        }else{
            const newSelected = [person]
            window.localStorage.setItem("selected", JSON.stringify(newSelected))
        }
        setSelected(true)
    }

    const reject = () => {
        if(window.localStorage.getItem("rejected")){
            const rejected = JSON.parse(window.localStorage.getItem("rejected"))
            const newRejected = [...rejected, person]
            window.localStorage.setItem("rejected", JSON.stringify(newRejected))
        }else{
            const newRejected = [person]
            window.localStorage.setItem("rejected", JSON.stringify(newRejected))
        }
        setRejected(true)
    }

    return(
        <div className='body-container'>
           <div className='user-card'>
                <div className='user-card__cover'>
                    <img src={'https://source.unsplash.com/Lki74Jj7H-U'} alt='cover' />
                </div>
                <div className='user-card__profile'>
                    <img src={person.Image} alt={person.name} />
                </div>
                <div className='user-card__name'>
                    {person.name}
                </div>
                <div className='user-card__action'>
                    {!rejected && <button className='btn select' onClick={() => select()} color='primary' >{selected ? 'Selected' : 'Select'}</button>}
                    {!selected && <button className='btn reject' onClick={() => reject()} color='secondary'> {rejected? 'Rejected' : 'Reject' }</button>}
                </div>
           </div>
        </div>
    )
}

export default UserPage