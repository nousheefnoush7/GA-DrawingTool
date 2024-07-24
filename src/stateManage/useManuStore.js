// useSysStore.js
import {create} from 'zustand';

const useSysStore = create((set) => ({
  sys: 0,
  setSys: (newSys) => set({ sys: newSys }),
  jsonData: null,
  setJsonData: (newJsonData) => set({ jsonData: newJsonData }),
}));

export default useSysStore;
