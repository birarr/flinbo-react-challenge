import "./App.css";
import { TodoPage } from "./components/todo-page";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <TodoPage />
      </ThemeProvider>
    </>
  );
}

export default App;
