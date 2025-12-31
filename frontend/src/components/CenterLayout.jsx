const CenterLayout = ({ children }) => {
  return (
    <div className="app-container">
      <div className="center-card">
        {children}
      </div>
    </div>
  );
};

export default CenterLayout;
