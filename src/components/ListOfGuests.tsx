import React, {ChangeEvent, useEffect, useState} from 'react'
import '../App.css'
import {TypeButtonValue, TypeFeedBackInfo, TypeListOfGuestsProps} from "../types/types";
import {Stars} from "./Stars";
import {findInArray, isCommentPhoneEmpty} from "../tools/findInArray";


export const ListOfGuests = ({
                                 guests,
                                 eatsVeganPizza
                             }: TypeListOfGuestsProps) => {

    const initialStateOfFeedbacks: TypeFeedBackInfo =
        JSON.parse(localStorage.getItem("feedbackInfo") as string) || []

    const [mode, setMode] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [buttonValue, setButtonValue] = useState<TypeButtonValue>('cancel')
    const [name, setName] = useState<string>('')
    const [star, setStar] = useState<number>(3)
    const [phone, setPhone] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [feedbackInfo, setFeedBackInfo] = useState<TypeFeedBackInfo>(initialStateOfFeedbacks)

    useEffect(() => {

        let findName = findInArray(feedbackInfo, name)
        if (findName) {
            setButtonValue('save')
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

    const clickOnGuest = (guest: { name: string, eatsPizza: boolean }) => {

        setError(false)
        setMode(true)
        setName(guest.name)
        if (findInArray(feedbackInfo, guest.name)) {
            setButtonValue('save')
            if (comment === '' && phone === '') {
                setButtonValue('cancel')
            }
        }
    }

    const saveFeedBack = () => {
        let chekNumber = /^\+\d[\d\+\(\)\ -]{3,10}\d$/
        let valid = chekNumber.test(phone)

        if (valid) {
            setError(false)
            setFeedBackInfo((st) => {
                let findElement = findInArray(st, name)
                if (findElement) {
                    let elIndex = st.indexOf(findElement)
                    let copySt = [...st]
                    copySt[elIndex] = {name, star, phone, comment}
                    localStorage.setItem('feedbackInfo', JSON.stringify(copySt))
                    return copySt
                }
                localStorage.setItem('feedbackInfo', JSON.stringify([...st, {name, star, phone, comment}]))
                return [...st, {name, star, phone, comment}]
            })

            setMode(false)
        }
        setError(true)
    }

    const deleteFeedBack = () => {
        setError(false)
        setStar(3)
        setPhone('')
        setComment('')
        setButtonValue('cancel')
        setFeedBackInfo((st) => {
            let findElement = findInArray(st, name)
            if (findElement) {
                let elIndex = st.indexOf(findElement)
                let copySt = [...st]
                copySt.splice(elIndex, 1)
                localStorage.setItem('feedbackInfo', JSON.stringify(copySt))
                return copySt
            }
            return st
        })

    }
    const cancelFeedBack = () => {
        setMode(false)

    }
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.currentTarget.value)
        isCommentPhoneEmpty(comment, phone, setButtonValue)
        setError(false)
    }
    const changeTextAreaValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value)
        isCommentPhoneEmpty(comment, phone, setButtonValue)
        setError(false)
    }

    return (
        <>
            {!mode && <table>
                <tbody className="table">
                <tr className="table">
                    <th className="row_name">List of guests:</th>
                </tr>
                {guests && guests.map((t) => {
                    return (
                        <tr key={t.name}>
                            {t.eatsPizza
                                ? <td onClick={() => clickOnGuest(t)}
                                      style={eatsVeganPizza.find(value => value === t.name)
                                          ? {color: 'green'}
                                          : {}}>
                                    <span>
                                       {findInArray(feedbackInfo, t.name) ? <> &#9989;</> : null}
                                    </span>
                                    <span> {t.name}</span>
                                </td>
                                : <td style={{color: 'gray'}}>{t.name}</td>
                            }

                        </tr>
                    )
                })
                }
                </tbody>

            </table>
            }
            {mode && <div>
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
                <div style={{color: 'red'}}>
                    {error ? "phone is not correct" : null}
                </div>
                <div>
                    Comment
                </div>
                <div>
                    <textarea value={comment}
                              onChange={(e) =>
                                  changeTextAreaValue(e)}/>
                </div>

                <button className='button-form'
                    onClick={buttonValue === 'save'
                    ? saveFeedBack
                    : cancelFeedBack}>
                    {buttonValue}
                </button>
                {buttonValue === 'save' &&
                <button className='button-form'
                    onClick={deleteFeedBack}>
                    delete
                </button>
                }
            </div>
            }
        </>
    )
}