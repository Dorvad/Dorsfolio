// =============================================================================
// App — top-level: SkinProvider + either selection screen or shell
// =============================================================================

function App() {
  return (
    <window.SkinProvider>
      <AppRoot />
    </window.SkinProvider>
  );
}

function AppRoot() {
  const { skin } = window.useSkin();
  if (!skin) return <window.SkinSelectionScreen />;
  return <window.PortfolioShell />;
}

// Mount
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
