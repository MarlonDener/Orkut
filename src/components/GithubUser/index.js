import { Box } from "../Box"
import { AlurakutProfileSidebarMenuDefault } from "../../lib/utils";

const gitHubUser = 'MarlonDener'

function ProfileSidebar(){
  return(
    <Box as="aside">
         <img src={`https://github.com/${gitHubUser}.png`} style={{ borderRadius: '8px'}}/>
         <hr />

      <p>
         <a className="boxLink" href={`https://github.com/${gitHubUser}`}>
           @{gitHubUser}
         </a>
      </p>
      
       <hr/>
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}
export default ProfileSidebar