import React, {useEffect, useState} from 'react'
import '../App.css'
import {ListOfGuestsPropsType} from "../types/types";
import {Stars} from "./Stars";


export const ListOfGuests = ({
                                 guests,
                                 eatsVeganPizza
                             }: ListOfGuestsPropsType) => {

    const initialStateOfFeedbacks: Array<{ name: string, star: number, phone: string, comment: string }> = []
    const [mode, setMode] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [star, setStar] = useState<number>(3)
    const [feedbackInfo, setFeedBackInfo] = useState<Array<{ name: string, star: number, phone: string, comment: string }>>(initialStateOfFeedbacks)
    console.log(feedbackInfo)
    useEffect(() => {
        let findName = feedbackInfo.find(value => value.name === name)
        if (findName) {
            setStar(findName.star)

        } else setStar(3)
    }, [name])

    const saveFeedBack = () => {
        setFeedBackInfo((st) => {
            if (st.find(value => value.name === name)) {
                return st
            }
            return [...st, {name, star, phone: '1', comment: 'www'}]
        })
        setMode(false)
    }

    return (
        <>
            {!mode && <table>
                <tbody className="table">
                <tr className="table">
                    <th className="row_name">Name</th>
                </tr>
                {guests && guests.map((t) => {
                    return (
                        <tr key={t.name}>
                            {t.eatsPizza
                                ? <td onClick={() => {
                                    setMode(true)
                                    setName(t.name)
                                }}
                                      style={eatsVeganPizza.find(value => value === t.name) ? {color: 'green'} : {}}>{t.name}</td>
                                : <td style={{color: 'gray'}}>{t.name}</td>
                            }

                        </tr>
                    )
                })
                }
                </tbody>

            </table>
            }
            <div>

                <div> NAME</div>
                {name}
                <div>
                    <Stars setStar={setStar} star={star}/>
                </div>
                <div>
                   Phone
                </div>
                <div>
                    <input/>
                </div>
                <div>
                   Comment
                </div>
                <div>
                    <textarea/>
                </div>

                <button onClick={saveFeedBack}> SAVE
                </button>
            </div>


        </>
    )
}