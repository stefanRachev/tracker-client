import Header from "./components/Header";
import Content from "./layout/Content";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Content />
      </main>
      <Footer />
    </div>
  );
}

export default App;
