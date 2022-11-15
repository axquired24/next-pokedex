/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import Image from 'next/image'
import Pokedex from 'pokedex-promise-v2'
import { useState, useEffect, useRef, Fragment } from 'react'
import PokeCard from '../components/main/PokeCard';
import LoadingTop from '../components/main/LoadingTop';
import RegionTab from '../components/main/RegionTab';
import { Dialog, Transition } from '@headlessui/react'
import SearchIcon from '../components/icon/SearchIcon';

const Poke = new Pokedex()

export default function Home() {
  const limitPokemon = 30
  let lastPokemonEntry = useRef(0)
  const searchRef = useRef(null)

  const [pageState, setpageState] = useState({
    loading: {
      pokedexList: 1,
      pokedexSelected: 0,
      pokemonList: 0,
      searchPokemon: 0
    },
    show: {
      loadmore: 1
    },
    pokedex: {
      list: [],
      selected: null
    },
    pokemonList: [],
    pokemonMaxEntry: 0,
    pokemonDisplay: [],
    pokeModal: {
      elm: <div></div>,
      show: false
    },
    searchResults: [
      // {
      //   name:"pikachu",
      //   url:"https://pokeapi.co/api/v2/pokemon-species/25/"
      // }
    ]
  });

  const updateState = (newState) => {
    setpageState(prev => {
      return {
        ...prev,
        ...newState
      }
    })
  }

  const getPokedexList = () => {
    updateState({
      loading: {
        ...pageState.loading,
        pokedexList: 1
      }
    })
    Poke.getPokedexList()
    .catch(e => {
      console.error('getPokedexList', e)
    })
    .then(resp => {
      updateState({
        loading: {
          ...pageState.loading,
          pokedexList: 0
        },
        pokedex: {
          list: resp.results,
          selected: resp.results[0].name
        }
      })

      return resp
    })
  }

  const getPokemonDisplay = (pokemonList=[]) => {
    if(pageState.loading.pokemonList) {
      alert('Loading. Please Wait...')
      return false
    } // endif

    const nextLast = lastPokemonEntry.current + limitPokemon
    let catchEntry = pokemonList.filter(entry => {
      return entry.entry_number > lastPokemonEntry.current && entry.entry_number <= nextLast
    })

    let pokemonDisplay = catchEntry
    if(lastPokemonEntry.current > 0) {
      pokemonDisplay = [
        ...pageState.pokemonDisplay,
        ...pokemonDisplay
      ]
    } // endif

    // console.log({pokemonDisplay, catchEntry, lastPokemonEntry, pokemonList})
    lastPokemonEntry.current = nextLast

    return pokemonDisplay
  }

  const loadPokemonDisplay = () => {
    let pokemonDisplay = getPokemonDisplay(pageState.pokemonList)
    console.log('loadPokemonDisplay', {limitPokemon, lastPokemonEntry, pageState})
    updateState({
      show: {
        ...pageState.show,
        loadmore: lastPokemonEntry.current < pageState.pokemonMaxEntry
      },
      pokemonDisplay
    })
  }

  const getPokedexDetail = async (name) => {
    updateState({
      loading: {
        ...pageState.loading,
        pokedexSelected: 1
      }
    })
    Poke.getPokedexByName(name).then(resp => {
      lastPokemonEntry.current = 0
      const pokemonDisplay = getPokemonDisplay(resp.pokemon_entries)
      const entryOnly = resp.pokemon_entries.map(entry => entry.entry_number)
      const pokemonMaxEntry = Math.max(...entryOnly)

      updateState({
        loading: {
          ...pageState.loading,
          pokedexSelected: 0
        },
        show: {
          ...pageState.show,
          loadmore: limitPokemon < pokemonMaxEntry
        },
        pokemonList: resp.pokemon_entries,
        pokemonDisplay: pokemonDisplay,
        pokemonMaxEntry
      })
    })
  }

  const PokeModal = () => {
    const handleClose = () => {
      updateState({
        pokeModal: {
          ...pageState.pokeModal,
          show: false
        }
      })
    }
    return (
      <Transition appear show={pageState.pokeModal.show} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {
                    pageState.pokeModal.elm
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  }

  const doSearch = async() => {
    if(pageState.loading.searchPokemon) {
      return false;
    } // endif

    setpageState(prev => {
      return {
        ...prev,
        loading: {
          ...prev.loading,
          searchPokemon: 1
        }
      }
    })

    const query = searchRef.current.value
    const searchResults = []
    if(query) {
      await Poke.getPokemonByName(query.toLowerCase())
      .then(resp => {
        searchResults.push(resp.species)
      })
      .catch(e => {
        alert("Can't find pokemon: " + query)
      })
    } // endif

    setpageState(prev => {
      return {
        ...prev,
        loading: {
          ...prev.loading,
          searchPokemon: 0
        },
        searchResults
      }
    })
  }

  const doClearSearch = () => {
    updateState({
      searchResults: []
    })
    searchRef.current.value = ""
  }

  useEffect(() => {
    if(pageState.pokedex.selected) {
      getPokedexDetail(pageState.pokedex.selected)
    } // endif

  }, [pageState.pokedex.selected]);

  useEffect(() => {
    getPokedexList()
  }, []);

  return (
    <div>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='h-screen text-gray-900'>
        <LoadingTop hidden={![pageState.loading.pokedexList, pageState.loading.pokemonList, pageState.loading.pokedexSelected].includes(1)} />
        <div className='fixed px-4 md:px-0 z-20 top-0 left-1/2 -translate-x-1/2 w-full bg-gray-50 container mx-auto'>
          <div className='my-4 font-semibold text-xl'>Region Select</div>
          <div className="w-full flex gap-4 pb-6 overflow-x-scroll">
            {
              pageState.pokedex.list.map(region => (
                <RegionTab
                  onClick={() => updateState({
                    pokedex: {
                      ...pageState.pokedex,
                      selected: region.name
                    }
                  })}
                  title={region.name} key={region.url}
                  isActive={region.name == pageState.pokedex.selected}
                  />
              ))
            }
          </div>
        </div>
        <div className='container mx-auto pt-4 pb-10 px-4 md:px-0'>
          <h3 className='mt-36 text-3xl text-center'>
            <span className='text-red-600'>Poke</span>
            <span>Dex</span>
          </h3>

          <div className="mb-6 grid grid-cols-4">
            <div className='font-semibold col-span-4 lg:col-span-3'>Found {pageState.pokemonList.length} Pokemons</div>
            <div className="col-span-4 lg:col-span-1 my-4 lg:my-0">
              <div className="flex items-center justify-end">
                <div className="relative">
                  <div className="absolute right-0 top-0 p-3 z-20 text-black">
                    <SearchIcon />
                  </div>
                  <input ref={searchRef} type="text" maxLength={12} placeholder="Search Pokemon" className="px-4 py-2 border border-gray-200 w-full" />
                </div>
                <button type='button'
                  onClick={doSearch}
                  className='btn btn-primary ml-2'>
                  { pageState.loading.searchPokemon ? 'Loading...' : 'Search' }
                </button>
                <button type='button'
                  onClick={doClearSearch}
                  className='btn btn-primary ml-2'>
                    Clear
                </button>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-6 gap-4 md:px-0'>
            {
              pageState.searchResults.map(ev =>
                (
                  <PokeCard
                    searchResult
                    key={ev.url}
                    pokemonName={ev.name}
                    pokedexNumber={999} url={ev.url} updateStatePage={updateState} />
                )
              )
            }

            {
              pageState.pokemonDisplay.map(entry =>
                (
                  <PokeCard key={entry.entry_number}
                    pokedexNumber={entry.entry_number}
                    url={entry?.pokemon_species?.url}
                    pokemonName={entry?.pokemon_species?.name}
                    updateStatePage={updateState}
                    />
                )
              )
            }
          </div>

          {
            pageState.show.loadmore ?
            <div className='flex justify-center my-8'>
              <button type='button'
                onClick={loadPokemonDisplay}
                className='btn btn-primary'>
                Load More
              </button>
            </div>
            :
            <div className="my-8 w-full border-t border-slate-800 relative">
              <div className='absolute text-center left-1/2 top-0 -translate-x-1/2 -mt-3 bg-gray-50 w-48'>
                End of Page
              </div>
            </div>
          }
        </div>

        <PokeModal />
      </main>
    </div>
  )
}
