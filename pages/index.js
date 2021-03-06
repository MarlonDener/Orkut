
import React, { useState, useEffect } from 'react';
import { MainGrid } from '../src/components/MainGrid'
import { Box } from '../src/components/Box'
import ProfileSidebar from '../src/components/GithubUser';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/utils';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox';

import nookies from 'nookies';
import jsonwebtoken, { JsonWebTokenError } from 'jsonwebtoken'

export default function Home(props) {

  const UserRandom = props.githubUser;
  const favoritPeople = ['juunegreiros', 'rafaballerini', 'Marcoantonio9', 'larissa', 'marcos', 'rafaelmaiach']
  const [seguidores, setSeguidores] = useState([]);
  const [Communities, setCommunities] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/MarlonDener/following')
      .then(function (response) {
        return response.json();
      }).then(function (completedResponse) {
        setSeguidores(completedResponse);
      })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '0e8d3fd6706d98e0df57750f2ee7da',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "query": `
            query {
              allCommunities {
                id,
                title
                image
                creatorSlug
              }      
        }`
      })
    }).then((response) => response.json()).then((completed) => {
      const communitiesOfDato = completed.data.allCommunities;
      console.log(completed)
      setCommunities(communitiesOfDato)
    })
  }, [])



  const handleCreateCommunity = (e) => {
    e.preventDefault();
    const dadosDoForm = new FormData(e.target);

    const comunidade = {
      title: dadosDoForm.get('title'),
      image: dadosDoForm.get('image'),
      creatorSlug: UserRandom

    }

    fetch('api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comunidade)
    }).then(async (response) => {
      const dados = await response.json();
      console.log(dados.registroCriado);
      const comunidade = dados.registroCriado
      const updateCommunities = [...Communities, comunidade];
      setCommunities(updateCommunities)
    })

  }


  // Get array in the github

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={props.githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que voc?? deseja fazer?</h2>
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
                  <li key={index}>
                    <a href={`/comunidades/${community.title}`}>
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

export async function getServerSideProps(context) {
  const token = nookies.get(context).USER_TOKEN;

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  }).then((response) => response.json())
  console.log(isAuthenticated)

  if (!isAuthenticated) {

    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jsonwebtoken.decode(token);

  return {
    props: { githubUser }
  }
}