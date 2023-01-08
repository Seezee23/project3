import { useState, useEffect } from 'react'


export default function DrinksPage (props){
    const [drinks, setDrinks] = useState([])
    const [foundDrink, setFoundDrink] = useState(null)
    const [newDrink, setNewDrink] = useState({
        name: '',
        readyToDrink: false,
        color: ''
    })
    // index
    const getDrinks = async () => {
        try {
            const response = await fetch('/api/drinks')
            const data = await response.json()
            setDrinks(data)
        } catch (error) {
            console.error(error)
        }
    }
    // delete
    const deleteDrink = async (id) => {
        try {
            const response = await fetch(`/api/drinks/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setFoundDrink(data)
        } catch (error) {
            console.error(error)
        }
    }
    // update
    const updateDrink = async (id, updatedData) => {
        try {
            const response = await fetch(`/api/drinks/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...updatedData})
            })
            const data = await response.json()
            setFoundDrink(data)
        } catch (error) {
            console.error(error)
        }
    }
    // create
        const createDrink = async () => {
            try {
                const response = await fetch(`/api/drinks`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...newDrink})
                })
                const data = await response.json()
                setFoundDrink(data)
                setNewDrink({
                    name: '',
                    readyToDrink: false,
                    color: ''
                })
            } catch (error) {
                console.error(error)
            }
        }

    const handleChange = (evt) => {
        setNewDrink({...newDrink, [evt.target.name]: evt.target.value})
    }

    useEffect(()=> {
        getDrinks()
    }, [foundDrink])

    return (
        <>
            {
                drinks && drinks.length ? (<ul>
                    {
                        drinks.map((drink) => {
                            return (
                                <li>
                                    {drink.name} is {drink.color} {drink.readyToDrink? 'and its ready to drink' : 'its not ready to drink'}
                                    <br/><button onClick={() => deleteDrink(drink._id)}>Delete This Drink</button>
                                </li>
                            )
                        })
                    }
                </ul>): <h1>No Drinks Yet Add One Below</h1>
            }
            {'Name '}<input value={newDrink.name} onChange={handleChange} name="name"></input><br/>
            {'Color '}<input value={newDrink.color} onChange={handleChange} name="color"></input><br/>
            {'Ready To Drink '}<input type="checkbox" checked={newDrink.readyToDrink} onChange={(evt) => setNewDrink({...newDrink, readyToDrink: evt.target.checked })}></input><br/>
            <button onClick={() => createDrink() }>Create A New Drink</button>
            {
                foundDrink? <div>
                    <h1>{foundDrink.name}</h1>
                    <h2>{foundDrink.color}</h2>
                    <h3>{foundDrink.readyToDrink? 'I am ready': 'I am not ready'}</h3>
                </div>: <>No Drink in Found Drink State</>
            }
        </>
    )
}