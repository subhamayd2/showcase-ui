// import * as axios from 'axios';
import { getDummyItems } from "./dummy.data";

const items = getDummyItems();

export const getItems = () => {
  return new Promise(resolve => resolve(items));
};

export const getAllColors = () => {
  return new Promise(resolve => resolve(["black", "white", "red", "blue"]));
};
