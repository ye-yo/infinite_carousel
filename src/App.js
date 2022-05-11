import Slider from './components/Slider';
import { colors } from './sample';

function App() {
  return (
    <div className="App">
      <Slider slides={colors} />
    </div>
  );
}

export default App;
