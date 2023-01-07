/*
Create
Read (Index & Show)
Update
Destroy
*/
import { useState, useEffect } from 'react'


export default function CoffeesPage (props){
    const [coffees, setCoffees] = useState([])
    const [foundCoffee, setFoundCoffee] = useState(null)
    const [newCoffee, setNewCoffee] = useState({
        name: '',
        readyToDrink: false,
        color: ''
    })
    // index
    const getCoffees = async () => {
        try {
            const response = await fetch('/api/coffees')
            const data = await response.json()
            setCoffees(data)
        } catch (error) {
            console.error(error)
        }
    }
    // delete
    const deleteCoffee = async (id) => {
        try {
            const response = await fetch(`/api/coffees/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setFoundCoffee(data)
        } catch (error) {
            console.error(error)
        }
    }
    // update
    const updateCoffee = async (id, updatedData) => {
        try {
            const response = await fetch(`/api/coffees/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...updatedData})
            })
            const data = await response.json()
            setFoundCoffee(data)
        } catch (error) {
            console.error(error)
        }
    }
    // create
        const createCoffee = async () => {
            try {
                const response = await fetch(`/api/coffees`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...newCoffee})
                })
                const data = await response.json()
                setFoundCoffee(data)
                setNewCoffee({
                    name: '',
                    readyToDrink: false,
                    color: ''
                })
            } catch (error) {
                console.error(error)
            }
        }

    const handleChange = (evt) => {
        setNewCoffee({...newCoffee, [evt.target.name]: evt.target.value})
    }

    useEffect(()=> {
        getCoffees()
    }, [foundCoffee])

    return (
        <>
            {
                coffees && coffees.length ? (<ul>
                    {
                        coffees.map((coffee) => {
                            return (
                                <li>
                                    {coffee.name} is {coffee.color} {coffee.readyToDrink? 'and its ready to drink' : 'its not ready to drink'}
                                    <br/><button onClick={() => deleteCoffee(coffee._id)}>Delete This Coffee</button>
                                </li>
                            )
                        })
                    }
                </ul>): <h1>No Coffees Yet Add One Below</h1>
            }
            {'Name '}<input value={newCoffee.name} onChange={handleChange} name="name"></input><br/>
            {'Color '}<input value={newCoffee.color} onChange={handleChange} name="color"></input><br/>
            {'Ready To Drink '}<input type="checkbox" checked={newCoffee.readyToDrink} onChange={(evt) => setNewCoffee({...newCoffee, readyToDrink: evt.target.checked })}></input><br/>
            <button onClick={() => createCoffee() }>Create A New Coffee</button>
            {
                foundCoffee? <div>
                    <h1>{foundCoffee.name}</h1>
                    <h2>{foundCoffee.color}</h2>
                    <h3>{foundCoffee.readyToDrink? 'I am ready': 'I am not ready'}</h3>
                </div>: <>No Coffee in Found Coffee State</>
            }
        </>
    )
}