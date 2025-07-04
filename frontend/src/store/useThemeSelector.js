import React from 'react'
import { create } from 'zustand'

const useThemeSelector = create((set)=>({
    // now a problem is that, if we hard code the value of the theme, then
    // if user selects a new theme and refresh the page then,
    // it goes back to the hard coded theme
    // solution => localstorage

    // theme : "coffee",
    theme : localStorage.getItem("stream-web-app-theme") || "coffee",
    setTheme : (theme) => {
        localStorage.setItem("stream-web-app-theme",theme)
        set({theme})
    }
}))

export default useThemeSelector