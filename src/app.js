import Header from "./components/header";
import initialEmails from "./data/emails";
import "./styles/app.css";
import { useState } from "react";

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [checked, setChecked] = useState(false);

  function toggleAttr(emailId, attr) {
    setEmails(
      emails.map((email) => {
        if (email.id === emailId) {
          return { ...email, [attr]: !email[attr] };
        } else {
          return email;
        }
      })
    );
  }

  const emailsFiltered = checked
    ? emails.filter((email) => email.read === false)
    : emails;

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          </li>
        </ul>
      </nav>

      <main className="emails">
        {emailsFiltered.map((email) => (
          <li
            className={email.read ? "email read" : "email unread"}
            key={email.id}
          >
            <div className="select">
              <input
                className="select-checkbox"
                type="checkbox"
                onClick={() => toggleAttr(email.id, "read")}
              />
            </div>
            <div className="star">
              <input
                className="star-checkbox"
                type="checkbox"
                onClick={() => toggleAttr(email.id, "starred")}
              />
            </div>
            <div className="sender">{email.sender}</div>
            <div className="title">{email.title}</div>
          </li>
        ))}
      </main>
    </div>
  );
}

export default App;
