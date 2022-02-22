import React, {useEffect, useState} from 'react'
import './App.css'
import {TypeGuest, TypeGuests, TypeVeganGuests} from "./types/types";
import {ListOfGuests} from "./components/ListOfGuests";


const App = () => {

    let initialStateGuests = JSON.parse(localStorage.getItem("guests") as string)
    let initialStateVeganGuests = JSON.parse(localStorage.getItem("veganGuests") as string)
    initialStateGuests = initialStateGuests || []
    initialStateVeganGuests = initialStateVeganGuests || []

    const [guests, setGuests] = useState<TypeGuest>(initialStateGuests)
    const [eatsVeganPizza, setVeganEatsPizza] = useState<Array<string>>(initialStateVeganGuests)
    const [error, setError] = useState<string>('')
    const [refresh, setRefresh] = useState<boolean>(false)


    useEffect(() => {
            if (guests.length === 0 && eatsVeganPizza.length === 0) {
                fetch('https://gp-js-test.herokuapp.com/pizza/guests')
                    .then((response) => response.json())
                    .then((data: TypeGuests) => {
                        setGuests(data.party)
                        let dataForLocalStorage = JSON.stringify(data.party)
                        localStorage.setItem('guests', dataForLocalStorage)
                        return data.party.filter(t => t.eatsPizza).map(t => t.name)
                    })
                    .then(data => {
                        let str = data.join(',')
                        fetch(`https://gp-js-test.herokuapp.com/pizza/world-diets-book/${str}`)
                            .then(res => res.json())
                            .then((data: TypeVeganGuests) => {
                                setVeganEatsPizza(data.diet.filter(t => t.isVegan).map(t => t.name))
                                let dataForLocalStorage = JSON.stringify(data.diet.filter(t => t.isVegan).map(t => t.name))
                                localStorage.setItem('veganGuests', dataForLocalStorage)
                            })
                    })
                    .catch(() => setError("Something go wrong, try again later"))

            }
        },
        [refresh])


    return (
        <div className="App">
            <div className="App-header">
                <button className="button"
                        onClick={()=>{
                            localStorage.removeItem("feedbackInfo")
                            localStorage.removeItem("veganGuests")
                            localStorage.removeItem("guests")
                            setGuests([])
                            setVeganEatsPizza([])
                            setRefresh(!refresh)
                        }}>
                    CLEAR APP
                </button>
                {!error && guests.length === 0
                    ? <div style={{color: 'red', fontSize: '30px'}}>
                        LOADING....
                    </div>
                    : <div> {error
                        ? <div> {error}</div>
                        : <ListOfGuests guests={guests} eatsVeganPizza={eatsVeganPizza}/>
                    }
                    </div>

                }
            </div>


        </div>
    );
}

export default App;
