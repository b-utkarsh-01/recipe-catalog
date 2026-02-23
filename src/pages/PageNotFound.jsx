import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='bg-gray-900 h-[40vw] flex items-center justify-center'>
      <button onClick={()=>navigate(-1)}
      className='px-4 py-2 rounded-lg bg-red-900 font-bold hover:bg-red-600'>
        Page Not Found <br />click here to go back</button>
    </div>
  )
}

export default PageNotFound
