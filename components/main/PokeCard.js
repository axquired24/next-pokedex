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

const getBgColor = (color) => {
  // ['black', 'blue', 'brown', 'gray', 'green', 'pink', 'purple', 'red', 'white', 'yellow']
  let bg = 'bg-gray-50 hover:bg-gray-100'
  switch(color) {
    case 'black':
      bg = 'bg-slate-200 hover:bg-slate-300'
      break;
    case 'blue':
      bg = 'bg-blue-100 hover:bg-blue-200'
      break;
    case 'brown':
      bg = 'bg-orange-100 hover:bg-orange-200'
      break;
    case 'gray':
      bg = 'bg-gray-100 hover:bg-gray-200'
      break;
    case 'green':
      bg = 'bg-green-100 hover:bg-green-200'
      break;
    case 'pink':
      bg = 'bg-pink-100 hover:bg-pink-200'
      break;
    case 'purple':
      bg = 'bg-purple-100 hover:bg-purple-200'
      break;
    case 'red':
      bg = 'bg-red-100 hover:bg-red-200'
      break;
    case 'white':
      // bg = 'bg- hover:bg-'
      break;
    case 'yellow':
      bg = 'bg-yellow-100 hover:bg-yellow-200'
      break;
    default:
      break;
  } // end switch

  return bg
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

  const defaultCls = "px-4 py-3 mb-4 border border-gray-300 cursor-pointer rounded "

  const getElm = () => {
    return pokemon.detail?.id ?
    <div onClick={onClick} className={defaultCls + getBgColor(pokemon.species?.color?.name)}>
      <div className='flex justify-center -mt-10'>
        <img src={pokemon.detail?.sprites?.front_default} alt={pokemon.detail?.name} />
      </div>
      <div className="flex justify-between items-end">
        <div className='text-xs opacity-50'>{'#' + padNum(pokedexNumber)}</div>
        <div className="font-medium capitalize">{pokemon.detail?.name}</div>
      </div>
      <div className="flex justify-end items-end gap-2 text-xs opacity-50">
        <div>{pokemon.species?.color?.name}</div>
        {
          pokemon.detail?.types.map(item => (
            <div key={item.slot}>{item.type.name}</div>
          ))
        }
      </div>
    </div> : <div></div>
  }

  return pokemon.detail?.id ? getElm() : <div className="px-4 py-3 mt-10 border border-gray-300 hover:bg-slate-700 cursor-pointer rounded">
    { pokemonName }
  </div>
}

export default PokeCard;

