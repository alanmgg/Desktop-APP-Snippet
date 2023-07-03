import React, { useEffect } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { useSnippetStore } from "../store/snippetsStore";

function SnippetList() {
  const setSnippetsNames = useSnippetStore((state) => state.setSnippetsNames);
  const snippetsName = useSnippetStore((state) => state.snippetsName);

  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir();
      const listFiles = await readDir(`${desktopPath}/TauriFiles`);
      const filesName = listFiles.map((file) => file.name!);
      setSnippetsNames(filesName);
    }

    loadFiles();
  }, []);

  return (
    <div>
      {snippetsName.map((snippetName) => {
        return (
          <div>
            <h1>{snippetName}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default SnippetList;
