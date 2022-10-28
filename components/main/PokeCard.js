import { useEffect, useState } from "react";
import Pokedex from 'pokedex-promise-v2'
import { Dialog } from "@headlessui/react";

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
  let bg = 'bg-gray-50 hover:bg-gray-100 border-gray-300'
  switch(color) {
    case 'black':
      bg = 'bg-slate-200 hover:bg-slate-300 border-slate-300'
      break;
    case 'blue':
      bg = 'bg-blue-100 hover:bg-blue-200 border-blue-200'
      break;
    case 'brown':
      bg = 'bg-orange-100 hover:bg-orange-200 border-orange-200'
      break;
    case 'gray':
      bg = 'bg-gray-100 hover:bg-gray-200 border-gray-200'
      break;
    case 'green':
      bg = 'bg-green-100 hover:bg-green-200 border-green-200'
      break;
    case 'pink':
      bg = 'bg-pink-100 hover:bg-pink-200 border-pink-200'
      break;
    case 'purple':
      bg = 'bg-purple-100 hover:bg-purple-200 border-purple-200'
      break;
    case 'red':
      bg = 'bg-red-100 hover:bg-red-200 border-red-200'
      break;
    case 'white':
      // bg = 'bg- hover:bg-'
      break;
    case 'yellow':
      bg = 'bg-yellow-100 hover:bg-yellow-200 border-yellow-200'
      break;
    default:
      break;
  } // end switch

  return bg
}

const PokeTypeBtn = ({type}) => {
  // ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'unknown', 'shadow']

  let cls = 'bg-white text-gray-900'
  switch(type) {
    case 'normal':
      cls = 'bg-slate-600 text-gray-100'
      break
    case 'fighting':
      cls = 'bg-amber-200 text-black'
      break
    case 'flying':
      cls = 'bg-cyan-700 text-white'
      break
    case 'poison':
      cls = 'bg-purple-600 text-white'
      break
    case 'ground':
      cls = 'bg-yellow-600 text-white'
      break
    case 'rock':
      cls = 'bg-yellow-700 text-white'
      break
    case 'bug':
      cls = 'bg-lime-600 text-white'
      break
    case 'ghost':
      cls = 'bg-indigo-700 text-white'
      break
    case 'steel':
      cls = 'bg-teal-200 text-black'
      break
    case 'fire':
      cls = 'bg-orange-600 text-white'
      break
    case 'water':
      cls = 'bg-blue-600 text-white'
      break
    case 'grass':
      cls = 'bg-green-600 text-white'
      break
    case 'electric':
      cls = 'bg-yellow-300 text-gray-900'
      break
    case 'psychic':
      cls = 'bg-pink-500 text-white'
      break
    case 'ice':
      cls = 'bg-sky-200 text-black'
      break
    case 'dragon':
      cls = 'bg-teal-400 text-black'
      break
    case 'dark':
      cls = 'bg-slate-900 text-gray-200'
      break
    case 'fairy':
      cls = 'bg-pink-600 text-white'
      break
    case 'unknown':
      break
    case 'shadow':
      break
  }

  const btnCls = 'px-1.5 pt-0.5 pb-1 text-xs rounded ' + cls
  return <button type="button" className={btnCls}>
    {type}
  </button>
}

const DetailModal = ({species, detail, updateStatePage}) => {
  const sprites = Object.entries(detail.sprites).filter(sp => {
    return (sp[1] != null) && (typeof sp[1] == 'string')
  })
  const commonSprite = []
  const shinySprite = []

  sprites.forEach(sp => {
    if(sp[0].indexOf('shiny') > -1) {
      shinySprite.push(sp)
    } else {
      commonSprite.push(sp)
    }
  }) // end each

  const availRegion = species.pokedex_numbers.map(item => item.pokedex.name.replace('-', ' ')).join(', ')
  const allMoves = detail.moves.map(item => item.move.name.replace('-', ' ')).join(', ')
  const gameConsoles = detail.game_indices.map(item => item.version.name).join(', ')
  const abilities = detail.abilities.map(item => item.ability.name.replace('-', ' ')).join(', ')

  console.log({species, detail, sprites})
  const handleClose = () => {
    updateStatePage({
      pokeModal: {
        elm: <div></div>,
        show: false
      }
    })
  }

  const PokeDescription = ({label="", value=""}) => {
    return <div className="capitalize">
      <div className="mt-2 text-sm text-gray-600">{label}</div>
      <div className="">{value}</div>
    </div>
  }
  const defaultCls = "px-4 py-3 mb-4 border cursor-pointer rounded "

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-center pb-2 text-gray-900 capitalize"
      >
        {detail.name}
      </Dialog.Title>

      <div className="overflow-y-auto h-96 p-4">
        <div className="my-2">Common Version</div>
        <div className="mt-12 grid grid-cols-4 gap-3">
          {
            commonSprite.map(sp => (
              <div key={sp[0]} className={defaultCls + getBgColor(species?.color?.name)}>
                <div className='flex justify-center -mt-16 mb-0'>
                  <img src={sp[1]} alt={detail?.name} />
                </div>
              </div>
            ))
          }
        </div>

        <div className="my-2">Shiny Version</div>
        <div className="mt-12 grid grid-cols-4 gap-3">
          {
            shinySprite.map(sp => (
              <div key={sp[0]} className={defaultCls + getBgColor(species?.color?.name)}>
                <div className='flex justify-center -mt-16 mb-0'>
                  <img src={sp[1]} alt={detail?.name} />
                </div>
              </div>
            ))
          }
        </div>

        <div className="my-2">Type</div>
        <div className="flex items-end gap-1 text-xs">
          {
            detail?.types.map(item => (
              <PokeTypeBtn key={item.slot} type={item.type.name} />
            ))
          }
        </div>

        <div className="mt-4 border-t border-gray-300">
          <div className="mt-2 font-semibold">Base Stats</div>
          {
            detail.stats.map(st => (
              <PokeDescription key={st.stat.name} label={st.stat.name} value={st.base_stat} />
            ))
          }
          <PokeDescription label="Abilities" value={abilities ?? '-'} />
        </div>

        <div className="mt-4 border-t border-gray-300">
          <PokeDescription label="Habitat" value={species?.habitat?.name ?? '-'} />
          <PokeDescription label="Weight" value={detail?.weight} />
          <PokeDescription label="Height" value={detail?.height} />
          <PokeDescription label="Evolve From" value={species?.evolves_from_species?.name} />
          <PokeDescription label="Legendary Pokemon" value={species?.is_legendary ? 'Yes' : 'No'} />
          <PokeDescription label="Mythical Pokemon" value={species?.is_mythical ? 'Yes' : 'No'} />
          <PokeDescription label="Pokedex Region" value={availRegion} />
          <PokeDescription label="In Games" value={gameConsoles} />
          <PokeDescription label="Learned Moves" value={allMoves} />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </>
  )
}

const PokeCard = ({pokemonName='',
  pokedexNumber=0, url='',
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
        elm: <DetailModal {...pokemon} updateStatePage={updateStatePage} />,
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

  const getElm = () => {
    return pokemon.detail?.id ?
    <div onClick={handleClick} className={defaultCls + getBgColor(pokemon.species?.color?.name)}>
      <div className='flex justify-center -mt-10'>
        <img src={pokemon.detail?.sprites?.front_default} alt={pokemon.detail?.name} />
      </div>
      <div className="flex justify-between items-end">
        <div className='text-xs opacity-50'>{'#' + padNum(pokedexNumber)}</div>
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

