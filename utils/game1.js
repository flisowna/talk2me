import { fetchRecords } from './api';

const GAME_1_API_URL = 'https://apitable.com/fusion/v1/datasheets/dstUnsGlknmmWoDVCp/records';

const fetchGame1Records = () => fetchRecords(GAME_1_API_URL);

export { fetchGame1Records };
