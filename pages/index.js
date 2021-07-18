
import React, { useState, useEffect } from 'react';
import { MainGrid } from '../src/components/MainGrid'
import { Box } from '../src/components/Box'
import ProfileSidebar from '../src/components/GithubUser';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/utils';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox';



export default function Home() {

  const favoritPeople = ['juunegreiros', 'rafaballerini', 'Marcoantonio9', 'larissa', 'marcos', 'rafaelmaiach']
  const [seguidores, setSeguidores] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/MarlonDener/following')
      .then(function (response) {
        return response.json();
      }).then(function (completedResponse) {
        console.log(completedResponse);
        setSeguidores(completedResponse);
      })
  }, [])

  const [Communities, setCommunities] = useState([]);


  const handleCreateCommunity = (e) => {
    e.preventDefault();
    const dadosDoForm = new FormData(e.target);

    const comunidade = {
      id: new Date().toISOString(),
      title: dadosDoForm.get('title'),
      image: dadosDoForm.get('image'),
    }

    const updateCommunities = [...Communities, comunidade];
    setCommunities(updateCommunities)
  }



  // Get array in the github


  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
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

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <ProfileRelationsBox title="Seguidores" items={seguidores} />
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <ul>
              {Communities.map((community, index) => {
                return (
                  <li key={community.id}>
                    <a href={`/users/${community}`}>
                      <img src={community.image} />
                      <span>{community.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>


          <ProfileRelationsBoxWrapper>

            <h2 className="smallTitle">
              Pessoas da comunidade {favoritPeople.length}
            </h2>
            <ul>
              {favoritPeople.map((people, index) => {
                return (
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

        </div>
      </MainGrid>
    </>
  )
}
