const RegionTab = ({onClick, title="Sinnoh", isActive=false}) => {
  return (
    <div onClick={onClick}
      className={"border cursor-pointer w-96 border-white px-2 py-1 break-keep text-sm capitalize hover:bg-slate-700 rounded-md " + (isActive ? "bg-slate-700" : "")}>
      { title }
    </div>
  );
}

export default RegionTab;
