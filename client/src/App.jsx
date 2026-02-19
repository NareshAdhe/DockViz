import ReactFlowPage from "./pages/ReactFlowPage";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return <>
    <ReactFlowPage/>
    <Toaster
      position="top-left"
    />
  </>;
};

export default App;
