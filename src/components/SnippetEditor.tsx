import Editor from "@monaco-editor/react";
import { useSnippetStore } from "../store/snippetsStore";

function SnippetEditor() {
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);

  return (
    <>
      {selectedSnippet ? (
        <Editor
          height="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          options={{ fontSize: 15 }}
        />
      ) : (
        <h1>No snippet selected</h1>
      )}
    </>
  );
}

export default SnippetEditor;
