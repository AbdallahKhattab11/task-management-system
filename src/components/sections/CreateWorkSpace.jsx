import { useState } from "react";
import { useAuth } from "../../hooks/useAuth"
import Loading from "../Shared/Loading";
import { useNavigate } from "react-router-dom";


const CreateWorkSpace = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = async ()=> {
    setIsLoading(true)
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.log(error);
      
    }finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="h-screen w-full flex justify-center items-center text-2xl font-semibold ">
      Create Work Space
      <button type="button" onClick={handleLogout} className="bg-error text-white py-3 px-4 rounded-md cursor-pointer">Log out</button>
      {isLoading && <Loading display={isLoading}/>}
    </div>
  )
}

export default CreateWorkSpace
