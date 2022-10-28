const RegionTab = ({onClick, title="Sinnoh", isActive=false}) => {
  title = title.replace('-', ' ')
  const defaultCls = "btn btn-primary w-96 whitespace-nowrap "
  const inactiveCls = ""
  const activeCls = "active"
  return (
    <div onClick={onClick}
      className={defaultCls + (isActive ? activeCls : inactiveCls)}>
      { title }
    </div>
  );
}

export default RegionTab;
