import { LANGUAGE_TO_FLAG } from "../constants"

export const getLanguageFlag = (language)=>{
    if(!language) return null

    //to get the country code
    const languageLower = language.toLowerCase()
    const countryCode = LANGUAGE_TO_FLAG[languageLower]
    // console.log(countryCode)
    if(countryCode){
        return (
            <img src={`https://flagcdn.com/24x18/${countryCode}.png`} 
            alt={`${languageLower} flag`} 
            className='h-3 mr-1 inline-block'
            />
        )
    }

    return null
}