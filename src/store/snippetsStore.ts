import { create } from "zustand";

interface SnippetState {
  snippetsName: string[];
  addSnippetName: (name: string) => void;
  setSnippetsNames: (names: string[]) => void;
}

export const useSnippetStore = create<SnippetState>((set) => ({
  snippetsName: [],
  addSnippetName: (name) => set((state) => ({ snippetsName: [...state.snippetsName, name] })),
  setSnippetsNames: (names) => set({ snippetsName: names }),
}))