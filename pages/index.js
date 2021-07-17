
import { MainGrid } from '../src/components/MainGrid'
import { Box } from '../src/components/Box'
import ProfileSidebar from '../src/components/GithubUser';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/utils';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';

export default function Home() {
  const favoritPeople = ['juunegreiros', 'rafaballerini', 'Marcoantonio9', 'larissa', 'marcos', 'rafaelmaiach']

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar/>
        </div>

        <div className="welcomeArea"  style={{ gridArea: 'welcomeArea'}}>
          <Box>
                <h1 className="title">Bem vindo(a)</h1>
                <OrkutNostalgicIconSet />
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}> 
            
           <ProfileRelationsBoxWrapper>    
             
                <h2 className="smallTitle">
                Pessoas da comunidade {favoritPeople.length}
                </h2>
                   <ul>
                {favoritPeople.map((people, index) => {
                  return(
                    <li>
                    <a href={`/users/${people}`} key={index}>
                      <img src={`https://github.com/${people}.png`} />
                      <span>{people}</span>
                    </a>
                    </li>
                  )
                })}
                       </ul>
          </ProfileRelationsBoxWrapper>
   
        </div>
      </MainGrid>
    </>
  )
}
