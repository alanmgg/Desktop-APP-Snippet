import { useSnippetStore } from "../store/snippetsStore";
import { twMerge } from "tailwind-merge";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";
import { toast } from "react-hot-toast";
import { FiTrash, FiX } from "react-icons/fi";

interface Props {
  snippetName: string;
}

function SnippetItem({ snippetName }: Props) {
  const setSelectedSnippet = useSnippetStore(
    (state) => state.setSelectedSnippet
  );
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const removeSnippet = useSnippetStore((state) => state.removeSnippetName);

  async function handleDelete(snippetName: string) {
    // const accept = await window.confirm(
    //   "Are you sure you want to delete this snippet?"
    // );
    // if (!accept) return;

    const desktopPath = await desktopDir();
    const filePath = await join(desktopPath, "TauriFiles", `${snippetName}.js`);
    removeFile(filePath);
    removeSnippet(snippetName);

    toast.success("Snippet deleted", {
      duration: 2000,
      position: "bottom-right",
      style: { background: "#202020", color: "#FFF" }
    });
  }

  return (
    <div
      className={twMerge(
        "py-2 px-4 hover:bg-neutral-900 hover:cursor-pointer flex justify-between",
        selectedSnippet?.name === snippetName ? "bg-sky-500" : ""
      )}
      onClick={async () => {
        const desktopPath = await desktopDir();
        const filePath = await join(
          desktopPath,
          "TauriFiles",
          `${snippetName}.js`
        );
        const snippet = await readTextFile(filePath);
        setSelectedSnippet({ name: snippetName, code: snippet });
      }}
    >
      <h1>{snippetName}</h1>

      {selectedSnippet?.name === snippetName && (
        <div className="flex gap-2 text-center justify-center">
          <FiTrash
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(snippetName);
              setSelectedSnippet(null);
            }}
            className="text-neutral-500"
          />

          <FiX
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSnippet(null);
            }}
            className="text-neutral-500"
          />
        </div>
      )}
    </div>
  );
}

export default SnippetItem;
