import { fetchRecords } from './api';

const GAME_2_API_URL = 'https://apitable.com/fusion/v1/datasheets/dstV2ZG3aUAfW1heUj/records';

export const fetchGame2Records = () => fetchRecords(GAME_2_API_URL);


