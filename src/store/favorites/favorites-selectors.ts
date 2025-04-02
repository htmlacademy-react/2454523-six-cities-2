import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { Offers } from '../../types/offer';

export const getFavorites = (state: State): Offers => state[NameSpace.Favorites].favorites;
