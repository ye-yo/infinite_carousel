import Slider from './components/Slider';
import colors from './sample';

const customOptions = {
  slideToShow: 3,
  previewRatio: 0.5,
  imageFit: 'contain',
};

function App() {
  return (
    <div className="App">
      <Slider slides={colors} customOptions={customOptions} />
    </div>
  );
}

export default App;
