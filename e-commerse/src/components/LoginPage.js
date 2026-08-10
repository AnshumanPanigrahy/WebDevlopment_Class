function LoginPage({ mode, user, onChange, onSubmit, onModeChange, error }) {
  const isSignup = mode === 'signup';

  return (
    <main className="auth-layout">
      <section className="auth-intro">
        <p className="eyebrow">Welcome to morrow</p>
        <h1>Good things are<br />waiting for you.</h1>
        <p>Sign in to explore a considered collection of everyday favourites.</p>
        <div className="auth-shape shape-lime" /><div className="auth-shape shape-purple" />
      </section>
      <section className="auth-card">
        <p className="eyebrow">Your account</p>
        <h2>{isSignup ? 'Create your account' : 'Welcome back'}</h2>
        <p className="auth-subtitle">{isSignup ? 'Choose a user ID and password to get started.' : 'Enter your details to continue shopping.'}</p>
        <form onSubmit={onSubmit} className="auth-form">
          <label>User ID<input name="userId" value={user.userId} onChange={onChange} placeholder="Choose a user ID" autoComplete="username" /></label>
          <label>Password<input type="password" name="password" value={user.password} onChange={onChange} placeholder="At least 4 characters" autoComplete={isSignup ? 'new-password' : 'current-password'} /></label>
          {isSignup && <label>Confirm password<input type="password" name="confirmPassword" value={user.confirmPassword} onChange={onChange} placeholder="Enter your password again" autoComplete="new-password" /></label>}
          {error && <p className="auth-error">{error}</p>}
          <button className="auth-submit" type="submit">{isSignup ? 'Create account' : 'Log in'} <span>→</span></button>
        </form>
        <p className="auth-switch">{isSignup ? 'Already have an account?' : 'New here?'} <button onClick={() => onModeChange(isSignup ? 'login' : 'signup')}>{isSignup ? 'Log in' : 'Create an account'}</button></p>
      </section>
    </main>
  );
}

export default LoginPage;
