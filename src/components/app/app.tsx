import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  rentalOffersCount: number;
}

function App ({rentalOffersCount}: AppScreenProps): JSX.Element {
  return(
    <MainScreen rentalOffersCount = {rentalOffersCount} />
  );
}

export default App;
