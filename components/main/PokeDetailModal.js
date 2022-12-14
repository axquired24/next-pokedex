/* eslint-disable @next/next/no-img-element */
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import PokeCard from "./PokeCard";
import Pokedex from 'pokedex-promise-v2'

import PokeVariants from "./PokeVariants";
const { PokeTypeBtn, getBgColor } = PokeVariants

const Poke = new Pokedex()

const getEvolutions = (evolutionChain) => {
  let evolutions = [
    evolutionChain.species
  ]
  const extractEvolution = (evolutionChain) => {
    evolutionChain.evolves_to.forEach(ev => {
      evolutions.push(ev.species)
      if(ev.evolves_to.length > 0) {
        extractEvolution(ev)
      }
    })
  }

  extractEvolution(evolutionChain)
  return evolutions
}

const PokeDetailModal = ({species, detail, updateStatePage}) => {
  const [evolutions, setEvolutions] = useState([]);
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

  useEffect(() => {
    // NextEvolution
    if(species) {
      Poke.getResource(species.evolution_chain.url)
      .catch(e => console.error('Failed get evolution chain',e))
      .then(resp => {
        const evolutions = getEvolutions(resp.chain)
        setEvolutions(evolutions)
      })
    }
  }, [species]);

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
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
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
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
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
          {
            evolutions.length > 0 ?
            <div className="w-full">
              <div className="capitalize my-2 text-sm text-gray-600">Evolutions Chain</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {
                  evolutions.map(ev => (
                    <PokeCard
                      key={ev.url}
                      pokemonName={ev.name} pokedexNumber={0} url={ev.url} updateStatePage={updateStatePage} />
                  ))
                }
              </div>
            </div>
            : <PokeDescription label="Evolutions Chain" value="-" />
          }
        </div>

        <div className="mt-4 border-t border-gray-300">
          <PokeDescription label="Habitat" value={species?.habitat?.name ?? '-'} />
          <PokeDescription label="Weight" value={detail?.weight} />
          <PokeDescription label="Height" value={detail?.height} />
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

export default PokeDetailModal;
