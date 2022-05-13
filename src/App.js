import Slider from './components/Slider';
import colors from './sample';

const customOptions = {
  slideToShow: 5,
};
function App() {
  return (
    <div className="App">
      <Slider slides={colors} customOptions={customOptions} />
    </div>
  );
}

export default App;
