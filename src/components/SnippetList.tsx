import { useEffect } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { useSnippetStore } from "../store/snippetsStore";
import SnippetItem from "./SnippetItem";

function SnippetList() {
  const setSnippetsNames = useSnippetStore((state) => state.setSnippetsNames);
  const snippetsName = useSnippetStore((state) => state.snippetsName);

  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir();
      const listFiles = await readDir(`${desktopPath}/TauriFiles`);
      const filesName = listFiles.map((file) => file.name!.split(".")[0]);
      setSnippetsNames(filesName);
    }

    loadFiles();
  }, []);

  return (
    <div>
      {snippetsName.map((snippetName) => (
        <SnippetItem snippetName={snippetName} key={snippetName} />
      ))}
    </div>
  );
}

export default SnippetList;
