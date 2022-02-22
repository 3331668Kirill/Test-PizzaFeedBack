import {TypeButtonValue, TypeFeedBackInfo} from "../types/types";

export const findInArray = (array:Array<TypeFeedBackInfo | any>, el:string ) => {
    return array.find(value => value.name === el)
}

export const isCommentPhoneEmpty = (comment:string,phone:string,setButtonValue:(value:TypeButtonValue)=>void) => {
    if (comment !== '' && phone !== '') {
        setButtonValue('save')
    }
}