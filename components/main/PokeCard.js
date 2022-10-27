import { useEffect, useState } from "react";
import Pokedex from 'pokedex-promise-v2'

const Poke = new Pokedex()

/* eslint-disable @next/next/no-img-element */
const padNum = (num, size=3) => {
  try {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  } catch (e) {
    console.error('padNum', e)
    return num
  }
}

const PokeCard = ({pokemonName='', pokedexNumber=0, url='', onClick}) => {
  const [pokemon, setPokemon] = useState({
    detail: {},
    species: {}
  });

  const getPokemonDetail = (id) => {
    Poke.getPokemonByName(id)
    .catch(e => {
      console.error('getPokemonDetail', e)
    })
    .then(resp => {
      // console.log('PokeCard', {
      //   pokemonName, resp
      // })
      setPokemon(prev => {
        return {
          ...prev,
          detail: resp
        }
      })
    })
  }

  useEffect(() => {
    Poke.getResource(url)
    .catch(e => {
      console.error('getPokemonSpecies', e)
    })
    .then(spec => {
      setPokemon(prev => {
        return {
          ...prev,
          species: spec
        }
      })

      getPokemonDetail(spec.id)
    })

  }, [pokemonName]);

  const getElm = () => {
    return pokemon.detail?.id ?
    <div onClick={onClick} className="px-4 py-3 mb-4 border border-gray-300 hover:bg-slate-700 cursor-pointer rounded">
      <div className='flex justify-center -mt-10'>
        <img src={pokemon.detail?.sprites?.front_default} alt={pokemon.detail?.name} />
      </div>
      <div className="flex justify-between items-end">
        <div className='text-xs opacity-50'>{'#' + padNum(pokedexNumber)}</div>
        <div className="font-medium capitalize">{pokemon.detail?.name}</div>
      </div>
    </div> : <div></div>
  }

  return pokemon.detail?.id ? getElm() : <div className="px-4 py-3 mt-10 border border-gray-300 hover:bg-slate-700 cursor-pointer rounded">
    { pokemonName }
  </div>
}

export default PokeCard;

