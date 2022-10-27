const RegionTab = ({onClick, title="Sinnoh", isActive=false}) => {
  title = title.replace('-', ' ')
  return (
    <div onClick={onClick}
      className={"border cursor-pointer w-96 border-white whitespace-nowrap px-2 py-1 text-sm capitalize hover:bg-slate-700 rounded-md " + (isActive ? "bg-slate-700" : "")}>
      { title }
    </div>
  );
}

export default RegionTab;
