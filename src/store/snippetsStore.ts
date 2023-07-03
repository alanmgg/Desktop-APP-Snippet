import { create } from "zustand";

interface SnippetState {
  snippetsName: string[];
  selectedSnippet: string|null;
  addSnippetName: (name: string) => void;
  setSnippetsNames: (names: string[]) => void;
  setSelectedSnippet: (snippet: string) => void;
}

export const useSnippetStore = create<SnippetState>((set) => ({
  snippetsName: [],
  selectedSnippet: null,
  addSnippetName: (name) => set((state) => ({ snippetsName: [...state.snippetsName, name] })),
  setSnippetsNames: (names) => set({ snippetsName: names }),
  setSelectedSnippet: (snippet) => set({ selectedSnippet: snippet })
}))