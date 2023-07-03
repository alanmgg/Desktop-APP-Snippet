import { useState, useEffect } from "react";
import { useSnippetStore } from "../store/snippetsStore";
import Editor from "@monaco-editor/react";
import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";

function SnippetEditor() {
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const [text, setText] = useState<string | undefined>("");

  useEffect(() => {
    if (!selectedSnippet) return;

    const saveText = setTimeout(async () => {
      console.log("saving text");
      const desktopPath = await desktopDir();
      await writeTextFile(
        `${desktopPath}/TauriFiles/${selectedSnippet}.js`,
        text || ""
      );
    }, 1000);

    return () => {
      clearTimeout(saveText);
    };
  }, [text]);

  return (
    <>
      {selectedSnippet ? (
        <Editor
          height="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          options={{ fontSize: 15 }}
          onChange={(value) => setText(value)}
        />
      ) : (
        <h1>No snippet selected</h1>
      )}
    </>
  );
}

export default SnippetEditor;
