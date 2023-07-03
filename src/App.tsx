import { Toaster } from "react-hot-toast";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import SnippetEditor from "./components/SnippetEditor";

export default function App() {
  return (
    <div className="h-screen text-white grid grid-cols-12">
      <div className="col-span-3 bg-zinc-950">
        <SnippetForm />
        <SnippetList />
      </div>

      <div className="col-span-9 bg-neutral-900 flex justify-center items-center">
        <SnippetEditor />
      </div>

      <Toaster />
    </div>
  );
}
