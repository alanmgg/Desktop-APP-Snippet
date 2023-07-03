import { useSnippetStore } from "../store/snippetsStore";
import { twMerge } from "tailwind-merge";

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
        selectedSnippet === snippetName ? "bg-sky-500" : ""
      )}
      onClick={() => setSelectedSnippet(snippetName)}
    >
      <h1>{snippetName}</h1>
    </div>
  );
}

export default SnippetItem;
