import { Loader } from 'lucide-react'
import React from 'react'
import useThemeSelector from '../store/useThemeSelector.js'

const PageLoader = () => {
  const {theme} = useThemeSelector()
  return (
    <div className='min-h-screen flex justify-center items-center' data-theme={theme}>
        <Loader className='animate-spin size-10 text-primary'/>
    </div>
  )
}

export default PageLoader