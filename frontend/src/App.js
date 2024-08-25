import React, { useState } from 'react';
import UserInfo from './components/UserInfo';
import TestScreen from './components/TestScreen';
import QuestionSetup from './components/QuestionSetups';

function App() {
  const [user, setUser] = useState('');
  const [skill, setSkill] = useState('react');
  const [view, setView] = useState('setup');

  return (
    <div>
      {!user && <UserInfo setUser={setUser} />}
      {user && (
        <>
          <select value={skill} onChange={(e) => setSkill(e.target.value)}>
            <option value="react">React</option>
            <option value="java">Java</option>
          </select>
          <button onClick={() => setView('setup')}>Setup Questions</button>
          <button onClick={() => setView('test')}>Take Test</button>
          {view === 'setup' && <QuestionSetup skill={skill} />}
          {view === 'test' && <TestScreen skill={skill} userName={user} />}
        </>
      )}
    </div>
  );
}

export default App;
