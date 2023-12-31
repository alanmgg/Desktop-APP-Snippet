import { useState } from "react";
import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";
import { useSnippetStore } from "../store/snippetsStore";
import { toast } from "react-hot-toast";

function SnippetForm() {
  const [snippetName, setSnippetName] = useState("");

  const addSnippetName = useSnippetStore((state) => state.addSnippetName);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const desktopPath = await desktopDir();
        const filePath = await join(
          desktopPath,
          "TauriFiles",
          `${snippetName}.js`
        );
        await writeTextFile(filePath, "");
        setSnippetName("");
        addSnippetName(snippetName);

        toast.success("Snippet saved", {
          duration: 2000,
          position: "bottom-right",
          style: { background: "#202020", color: "#FFF" }
        });
      }}
    >
      <input
        type="text"
        placeholder="Write a Snippet"
        className="bg-zinc-900 w-full border-none outline-none p-4"
        onChange={(e) => setSnippetName(e.target.value)}
        value={snippetName}
      />

      <button className="hidden">Save</button>
    </form>
  );
}

export default SnippetForm;
