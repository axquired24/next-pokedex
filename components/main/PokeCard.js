import { useEffect, useState } from "react";
import Pokedex from 'pokedex-promise-v2'
import PokeDetailModal from "./PokeDetailModal";

import PokeVariants from "./PokeVariants";
const { PokeTypeBtn, getBgColor } = PokeVariants

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

const PokeCard = ({pokemonName='',
  pokedexNumber=0, url='',
  searchResult=false,
  updateStatePage}) => {
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

  const handleClick = (e) => {
    if(! pokemon.detail?.name) {
      return false
    } // endif

    updateStatePage({
      pokeModal: {
        elm: <PokeDetailModal {...pokemon} updateStatePage={updateStatePage} />,
        show: true
      }
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

  const defaultCls = "px-4 py-3 mb-4 border cursor-pointer rounded "
  const pokedexNumberStr = searchResult ? '#search-result' : '#' + padNum(pokedexNumber)

  const getElm = () => {
    return pokemon.detail?.id ?
    <div onClick={handleClick} className={defaultCls + getBgColor(pokemon.species?.color?.name)}>
      <div className='flex justify-center -mt-10'>
        <img src={pokemon.detail?.sprites?.front_default} alt={pokemon.detail?.name} />
      </div>
      <div className="flex justify-between items-end">
        {
          pokedexNumber > 0 ?
          <div className='text-xs opacity-50'>{pokedexNumberStr}</div>
          : <div></div>
        }
        <div className="font-medium capitalize text-right">{pokemon.detail?.name}</div>
      </div>
      <div className="mt-1 flex justify-end items-end gap-1 text-xs">
        {
          pokemon.detail?.types.map(item => (
            <PokeTypeBtn key={item.slot} type={item.type.name} />
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

