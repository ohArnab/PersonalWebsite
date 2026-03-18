import Logo from "./Logo";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Logo at the top-left corner */}
      <Logo />

      {/* Page Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;