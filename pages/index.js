import Head from 'next/head'
import Image from 'next/image'
import Pokedex from 'pokedex-promise-v2'
import { useState, useEffect } from 'react'

const Poke = new Pokedex()

const PokeCard = ({label, url=null, onClick=null}) => {
  return <div onClick={() => onClick()} className="p-6 border border-gray-300 hover:bg-yellow-50 cursor-pointer rounded">
    <div className="font-medium">{label}</div>
    <div className="text-xs text-gray-500 break-words">{url}</div>
  </div>
}

export default function Home() {
  const [displayPokemon, setdisplayPokemon] = useState([]);
  const [paginationParam, setpaginationParam] = useState({
    limit: 10,
    offset: 0
  });
  
  const doNext = () => {
    setpaginationParam(prevState => ({
      ...prevState,
      offset: prevState.offset + prevState.limit
    }))
  }
  
  const doPrev = () => {
    setpaginationParam(prevState => ({
      ...prevState,
      offset: prevState.offset - prevState.limit
    }))
  }
  
  useEffect(() => {
    // Poke.getPokemonByName(['eevee', 'ditto']) // with Promise
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log('There was an ERROR: ', error);
    //   });
    Poke.getPokemonsList(paginationParam).then((pokemons) => {
      setdisplayPokemon(pokemons)
      console.log({pokemons})
    })
  }, [paginationParam]);
  
  return (
    <div>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='container mx-auto'>
        <h3 className='text-3xl text-center mt-10'>Pokedex</h3>
        <div className="my-4">{ JSON.stringify(paginationParam) }</div>
        <div className='mt-5 grid grid-cols-6 gap-4'>
          {
            displayPokemon?.previous && <PokeCard onClick={doPrev} label='< Previous'></PokeCard>
          }
          {
            displayPokemon?.results && displayPokemon.results.map((poke, idx) => 
              (
                <PokeCard key={idx} label={poke.name} url={poke.url}></PokeCard>
              )
            )
          }
          {
            displayPokemon?.next && <PokeCard label='Next >' onClick={doNext}></PokeCard>
          }
        </div>
      </main>
    </div>
  )
}
