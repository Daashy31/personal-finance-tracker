import CenterLayout from '../components/CenterLayout';

const Landing = ({ onSignIn, onSignUp }) => {
  return (
    <CenterLayout>
      <h1>Personal Finance Tracker</h1>

      <p style={{ marginTop: 20 }}>
        Track your income and expenses, manage budgets,
        and gain insights into your spending habits.
      </p>

      <div style={{ marginTop: 40 }}>
        <button onClick={onSignIn} style={{ marginRight: 20 }}>
          Sign In
        </button>

        <button onClick={onSignUp}>
          Sign Up
        </button>
      </div>
    </CenterLayout>
  );
};

export default Landing;
