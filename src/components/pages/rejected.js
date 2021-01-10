import { useState, useEffect } from 'react'

//components
import RenderCards from '../utils/renderCard'

const Rejected = () => {
    const [ persons, setPersons ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        if(window.localStorage.getItem('rejected')){
            const data = JSON.parse(window.localStorage.getItem('rejected'))
            setPersons([...data])
            setLoading(false)
        }
        else{
            setLoading(false)
        }
    }, [loading])

    const remove = (id) => {
        const per = persons
        console.log(id)
        const newPer = per.filter(p => p.id !== id
        ) 

        window.localStorage.setItem('rejected', JSON.stringify(newPer))
        setLoading(true)
    }

    return(
        <>
        {loading && <div className='body-container'>Loading...</div>}
        {!loading && <div className='body-container'>

            {persons.length > 0 ? <div className='card-container'>
                <RenderCards persons={persons} remove={remove} />
            </div>: 'No one Selected'}
        </div>}
        </>
    )
}

export default Rejected
