import { Box } from "../Box"
  const gitHubUser = 'MarlonDener'
function ProfileSidebar(){
  return(
    <Box>
         <img src={`https://github.com/${gitHubUser}.png`} style={{ borderRadius: '8px'}}/>
    </Box>
  )
}
export default ProfileSidebar