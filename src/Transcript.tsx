import { useParams } from "react-router-dom"
import TranscriptHeader from "./TranscriptHeader";
import useUser from "./hooks/useUser";



const Transcript = () => {
  const {email} = useParams();

  //get the info about the user
  const { data: user, isLoading, error } = useUser(email!);
  console.log(user?.FirstName);
  

  return (
    <>
      <TranscriptHeader />
    </>
    
  )
}

export default Transcript