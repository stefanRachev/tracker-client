
import { AuthProvider } from "./context/auth/AuthProvider";
import { BalanceProvider } from "./context/balance/BalanceProvider";
import Header from "./components/Header";
import Content from "./layout/Content";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <BalanceProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Content />
          </main>
          <Footer />
        </div>
      </BalanceProvider>
    </AuthProvider>
  );
}

export default App;