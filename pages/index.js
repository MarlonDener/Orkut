
import React from 'react';
import { MainGrid } from '../src/components/MainGrid'
import { Box } from '../src/components/Box'
import ProfileSidebar from '../src/components/GithubUser';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/utils';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';

export default function Home() {
  const favoritPeople = ['juunegreiros', 'rafaballerini', 'Marcoantonio9', 'larissa', 'marcos', 'rafaelmaiach']
  const [Communities, setCommunities] = useState('');
  const 

  const handleCreateCommunity = (e) => {
    e.preventDefault();
    communitys.push("Marlon star")
  }

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

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
         <form onSubmit={handleCreateCommunity}>
            <div> 
              <input
                type="text"
                placeholder="Qual vai ser o nome da sua comunidade ?" 
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade ?" />
             </div>
            <div> 
              <input
                type="text"
                placeholder="Coloque uma url para usarmos de capa ?" 
                name="image"
                aria-label="Coloque uma url para usarmos de capa ?" />
             </div>

             <button>
               Criar comunidade
             </button>
          </form>

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
                    <li key={index}>  
                    <a href={`/users/${people}`}>
                      <img src={`https://github.com/${people}.png`} />
                      <span>{people}</span>
                    </a>
                    </li>
                  )
                })}
                       </ul>
          </ProfileRelationsBoxWrapper>
                  <ProfileRelationsBoxWrapper>    
             
                   <ul>
                {Communities.map((communitys, index) => {
                  return(
                    <li key={index}>  
                    <a href={`/users/${communitys}`}>
                      <img src={`https://github.com/MarlonDener.png`} />
                      <span>{communitys}</span>
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
