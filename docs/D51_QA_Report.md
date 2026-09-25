# Agency OS — Team QA Report

**Day:** D51 — Team QA  
**Project:** Agency OS  
**What I Checked:** Frontend, Backend API, Login, Permissions, Workspace separation, Create/Read/Update/Delete, File Upload, AI Assistant, AI Briefings, Data saving, and Error handling

---

## 1. Why We Did This QA

The goal of D51 was to test the whole app from start to end, find bugs, check edge cases, and make sure error handling works.

We followed this process:

**Test → Find Problem → Understand Why → Fix → Test Again → Check Nothing Else Broke**

---

## 2. Login Testing

| Test                             | What Should Happen      | What Happened    | Status  |
| -------------------------------- | ----------------------- | ---------------- | ------- |
| Login with correct info          | User logs in            | Worked           | ✅ Pass |
| Login with wrong info            | Show error              | Error shown      | ✅ Pass |
| Login with empty fields          | Stop the submit         | Validation shown | ✅ Pass |
| Logout                           | User logs out           | Worked           | ✅ Pass |
| Open protected page after logout | Send user back to login | Worked           | ✅ Pass |
| Call protected API with no token | API should block it     | 401 Unauthorized | ✅ Pass |
| Call API with bad token          | API should block it     | 401 Unauthorized | ✅ Pass |

---

## 3. Workspace Testing

| Test                          | What Should Happen                  | What Happened | Status  |
| ----------------------------- | ----------------------------------- | ------------- | ------- |
| Load workspace                | It loads fine                       | Worked        | ✅ Pass |
| Create workspace              | New workspace is made               | Worked        | ✅ Pass |
| Empty workspace name          | Show validation                     | Worked        | ✅ Pass |
| Switch workspace              | Correct workspace loads             | Worked        | ✅ Pass |
| Workspace data stays separate | Data doesn't mix between workspaces | Verified      | ✅ Pass |
| Delete workspace              | Workspace is removed                | Worked        | ✅ Pass |

---

## 4. Client Testing

| Test                                | What Should Happen  | What Happened | Status  |
| ----------------------------------- | ------------------- | ------------- | ------- |
| View clients                        | Clients show up     | Worked        | ✅ Pass |
| Create client                       | New client is added | Worked        | ✅ Pass |
| Empty/invalid client info           | Show validation     | Worked        | ✅ Pass |
| Edit client                         | Info updates        | Worked        | ✅ Pass |
| Delete client                       | Client is removed   | Worked        | ✅ Pass |
| Clients stay in their own workspace | No mixing           | Verified      | ✅ Pass |

---

## 5. Notes Testing

| Test                                       | What Should Happen | What Happened | Status  |
| ------------------------------------------ | ------------------ | ------------- | ------- |
| View notes                                 | Notes load         | Worked        | ✅ Pass |
| Create note                                | Note is added      | Worked        | ✅ Pass |
| Empty note                                 | Show validation    | Worked        | ✅ Pass |
| Edit note                                  | Note updates       | Worked        | ✅ Pass |
| Delete note                                | Note is removed    | Worked        | ✅ Pass |
| Notes stay with the right client/workspace | No mixing          | Verified      | ✅ Pass |

---

## 6. File Upload Testing

| Test                 | What Should Happen   | What Happened | Status  |
| -------------------- | -------------------- | ------------- | ------- |
| Upload a file        | File uploads         | Worked        | ✅ Pass |
| Refresh after upload | File is still there  | Worked        | ✅ Pass |
| Show file name       | Name is visible      | Worked        | ✅ Pass |
| Try invalid file     | Validation blocks it | Worked        | ✅ Pass |

> **Note:** Editing or downloading uploaded files is not built yet. This is a missing feature, not a bug.

---

## 7. AI Assistant Testing

| Test                        | What Should Happen        | What Happened | Status  |
| --------------------------- | ------------------------- | ------------- | ------- |
| Normal question to AI       | AI answers                | Worked        | ✅ Pass |
| Empty question              | Request is blocked        | Worked        | ✅ Pass |
| Loading state               | Shows loading             | Worked        | ✅ Pass |
| Click "Ask" many times fast | Blocks duplicate requests | Worked        | ✅ Pass |
| No internet                 | Shows error               | Worked        | ✅ Pass |
| Internet comes back         | AI works again            | Worked        | ✅ Pass |

The loading text says **"Asking…"** with an animation.

---

## 8. AI Briefing Testing

| Test                        | What Should Happen            | What Happened | Status  |
| --------------------------- | ----------------------------- | ------------- | ------- |
| Preset briefing questions   | They show up                  | Worked        | ✅ Pass |
| Ask multiple questions      | All work                      | Worked        | ✅ Pass |
| Empty briefing              | Blocked                       | Worked        | ✅ Pass |
| Generate briefing           | AI makes it                   | Worked        | ✅ Pass |
| Save briefing               | It saves                      | Worked        | ✅ Pass |
| Briefing history            | Shows old briefings           | Worked        | ✅ Pass |
| Many saved briefings        | All handled fine              | Worked        | ✅ Pass |
| Workspace/client separation | Briefings stay in right place | Verified      | ✅ Pass |
| Refresh page                | Data is still there           | Worked        | ✅ Pass |
| Very long briefing text     | Handled fine                  | Worked        | ✅ Pass |
| Duplicate briefing requests | Blocked                       | Worked        | ✅ Pass |

---

## 9. Error & Edge Cases Checked

The following cases were tested:

- Wrong login info
- Empty form fields
- Missing token
- Bad token
- Unauthorized API calls
- No internet / API down
- App works again after internet comes back
- Duplicate AI requests
- Duplicate briefing requests
- Workspace data staying separate
- Client data staying separate
- Very long briefing text
- Data staying saved after refresh

All of these worked the way they should.

---

## 10. One Console Error We Looked Into

Earlier in testing, we saw this error:

```text
Cannot read properties of undefined (reading 'startTime')
```
