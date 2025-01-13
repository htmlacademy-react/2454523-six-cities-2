import { Reviews } from '../types/review';
import { AVATAR_URL } from '../const';

export const reviews : Reviews = [
  {
    id: '1',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 5
  },
  {
    id: '2',
    date: '2019-06-08T14:13:56.569Z',
    user: {
      name: 'Jhone Conner',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 2
  },
  {
    id: '3',
    date: '2019-07-08T14:13:56.569Z',
    user: {
      name: 'Sara Conner',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 5
  },

];
