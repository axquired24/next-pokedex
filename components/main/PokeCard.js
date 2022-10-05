/* eslint-disable @next/next/no-img-element */
const padNum = (num, size=3) => {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

const PokeCard = ({poke=null, label=null, onClick}) => {
  return <div onClick={() => onClick()} className="px-4 py-3 mt-10 border border-gray-300 hover:bg-slate-700 cursor-pointer rounded">
    {
      poke ?
      <div className='flex justify-center -mt-10'>
        <img src={poke.sprites.front_default} alt={poke.name} />
      </div>
      // <div className="text-xs text-gray-500 break-words">{poke.sprites.back_default}</div>
      : null
    }
    {
      poke ?
      <div className="flex justify-between items-end">
        <div className='text-xs opacity-50'>{'#' + padNum(poke.id)}</div>
        <div className="font-medium capitalize">{poke.name}</div>
      </div>
      : <div className="font-medium">{label}</div>
    }
  </div>
}

export default PokeCard;

