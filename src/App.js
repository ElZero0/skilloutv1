import "./styles.css";
import { getUsers, getReactions } from "./firebase";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={getUsers}>obtener usuarios</button>
      <button onClick={getReactions}>obtener reacciones</button>
    </div>
  );
}
