import { useState, useEffect } from "react";
import { useSnippetStore } from "../store/snippetsStore";
import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";
import Editor from "@monaco-editor/react";

function SnippetEditor() {
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const [text, setText] = useState<string | undefined>("");

  useEffect(() => {
    if (!selectedSnippet) return;

    const saveText = setTimeout(async () => {
      const desktopPath = await desktopDir();
      const filePath = await join(
        desktopPath,
        "TauriFiles",
        `${selectedSnippet.name}.js`
      );
      await writeTextFile(filePath, text || "");
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
          value={selectedSnippet.code ?? ""}
        />
      ) : (
        <h1>No snippet selected</h1>
      )}
    </>
  );
}

export default SnippetEditor;
