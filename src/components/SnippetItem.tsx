import { useSnippetStore } from "../store/snippetsStore";
import { twMerge } from "tailwind-merge";
import { readTextFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";

interface Props {
  snippetName: string;
}

function SnippetItem({ snippetName }: Props) {
  const setSelectedSnippet = useSnippetStore(
    (state) => state.setSelectedSnippet
  );
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);

  return (
    <div
      className={twMerge(
        "py-2 px-4 hover:bg-neutral-900 hover:cursor-pointer",
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
    </div>
  );
}

export default SnippetItem;
