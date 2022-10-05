import ReactLoading from 'react-loading';

const LoadingTop = ({hidden=1}) => {
  return <div hidden={hidden} className="fixed top-0 right-0 m-4 w-96 bg-white rounded shadow z-20 opacity-50 hover:opacity-70 cursor-pointer">
    <div className="w-full flex gap-4 items-center p-4 text-slate-800">
      <ReactLoading type='spin' color='#CCC' width={24} height={24} />
      <span>Getting Data ...</span>
    </div>
  </div>
}

export default LoadingTop;
