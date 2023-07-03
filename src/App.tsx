import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import SnippetEditor from "./components/SnippetEditor";

export default function App() {
  return (
    <div className="bg-neutral-950 h-screen text-white">
      <SnippetForm />
      <SnippetList />
      <SnippetEditor />
    </div>
  );
}
