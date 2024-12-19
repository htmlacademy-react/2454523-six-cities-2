import MainScreen from '../../pages/main-screen/main-screen';

type AppProps = {
  rentalOffersCount: number;
}

function App ({rentalOffersCount}: AppProps): JSX.Element {
  return(
    <MainScreen rentalOffersCount = {rentalOffersCount} />
  );
}

export default App;
