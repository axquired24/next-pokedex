
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

const PokeVariants = {
  getBgColor,
  PokeTypeBtn
}

export default PokeVariants;
