import React, {ChangeEvent, useEffect, useState} from 'react'
import '../App.css'
import {TypeButtonValue, TypeFeedBackInfo, TypeListOfGuestsProps} from "../types/types";
import {Stars} from "./Stars";


export const ListOfGuests = ({
                                 guests,
                                 eatsVeganPizza
                             }: TypeListOfGuestsProps) => {

    const initialStateOfFeedbacks: TypeFeedBackInfo = []
    const [mode, setMode] = useState<boolean>(false)
    const [buttonValue, setButtonValue] = useState<TypeButtonValue>('cancel')
    const [name, setName] = useState<string>('')
    const [star, setStar] = useState<number>(3)
    const [phone, setPhone] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [feedbackInfo, setFeedBackInfo] = useState<TypeFeedBackInfo>(initialStateOfFeedbacks)
    console.log(feedbackInfo)
    useEffect(() => {
        let findName = feedbackInfo.find(value => value.name === name)
        if (findName) {
            setStar(findName.star)
            setPhone(findName.phone)
            setComment(findName.comment)
        } else {
            setStar(3)
            setPhone('')
            setComment('')
            setButtonValue('cancel')
        }
    }, [name])

    const saveFeedBack = () => {
        setFeedBackInfo((st) => {
            if (st.find(value => value.name === name)) {
                return st
            }
            return [...st, {name, star, phone, comment}]
        })
        setMode(false)
    }

    const cancelFeedBack = () => {
         setMode(false)
    }

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.currentTarget.value)
        if (comment !== '' && phone !== '') {
            setButtonValue('save')
        }
    }
    const changeTextAreaValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value)
        if (comment !== '' && phone !== '') {
            setButtonValue('save')
        }
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
                                    if (feedbackInfo.find(value => value.name === t.name)) {
                                        setButtonValue('save')
                                    }
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
                    <input value={phone} onChange={changeInputValue}/>
                </div>
                <div>
                    Comment
                </div>
                <div>
                    <textarea value={comment}
                              onChange={(e) =>
                                  changeTextAreaValue(e)}/>
                </div>

                <button onClick={buttonValue === 'save'
                    ? saveFeedBack
                    : cancelFeedBack}>
                    {buttonValue}
                </button>
                {buttonValue === 'save' &&
                <button>
                    delete
                </button>}
            </div>


        </>
    )
}