<div align="center">
  <img width=115 src="https://github.com/user-attachments/assets/4ad8438e-d63f-4d8b-b44b-7001be28b81f" />
  <h1>Atomic Stresser</h1>
</div>

> ⚠️ **Project in active development** — some features may still be in progress.

**AtomicStresser** is a powerful and modern stress testing platform built with:

* ✅ Next.js + Tailwind CSS (frontend)
* 📌 API to manage users, plans, methods and attack dispatch (**active development**)
* ✅ Dual-layer architecture (L4 and L7 methods)
* ✅ Admin panel for user and server control
* ✅ Beautiful, dark UI with animations using Framer Motion

---

## Features

* Layer 4 & Layer 7 attack methods (legal use only)
* Cloudflare, OVH and other anti-DDoS bypass techniques (with NetStorm script)
* Real-time dashboard and charts
* Admin panel to manage users, slots, plans and expiration
* Toast system for notifications
* Responsive UI for mobile and desktop
* Sidebar with icon-only design and hover label

---

## Dashboard
![image](https://github.com/user-attachments/assets/ff9cae17-2489-4fef-8823-315ff4b1fcd8)

---

## Getting Started

```bash
# Clone the project
git clone https://github.com/CirqueiraDev/AtomicStresser
cd AtomicStresser

# Install dependencies
npm install

# Run in development
npm run dev
```

---

## 🧪 Legal Disclaimer

> This platform is designed strictly for **authorized stress testing** purposes and **educational research**. You must own the target or have explicit permission to test it. The author is **not responsible for misuse**.

---

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx                  ← Admin page (users, plans, methods)
│
│   ├── dashboard/
│   │   └── page.tsx                  ← Main dashboard (stats, quick access, etc.)
│
│   ├── login/
│   │   └── page.tsx                  ← Login screen
│
│   ├── panel/
│   │   └── page.tsx                  ← Attack panel with L4/L7 + logs
│
│   ├── profile/
│   │   └── page.tsx                  ← User profile
│
│   ├── register/
│   │   └── page.tsx                  ← Registration screen
│
│   ├── layout.tsx                   ← Main layout of the app (likely with sidebar/header)
│   ├── globals.css                  ← Global styles
│   └── ClientBody.tsx               ← Likely a wrapper with context
│
├── components/
│   ├── admin/
│   │   ├── PlanManagement.tsx
│   │   ├── StressMethods.tsx
│   │   └── UserManagement.tsx
│
│   ├── home/
│   │   ├── FaqSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── MethodsSection.tsx
│   │   └── PriceSection.tsx
│
│   ├── panel/
│   │   ├── Layer4Form.tsx           ← Layer 4 attack form
│   │   ├── Layer7Form.tsx           ← Layer 7 attack form
│   │   └── AttackLogs.tsx           ← Attack logs table
│
│   ├── header.tsx                   ← Fixed or dynamic header
│   ├── sidebar.tsx                  ← Sidebar menu (likely used in layout.tsx)
│   ├── RouteGuard.tsx               ← Protected route wrapper
│   ├── ToastPopup.tsx               ← Custom notification/toast component
│   └── TopLoadingBar.tsx            ← Top loading progress bar (like YouTube)
│
├── contexts/
│   ├── AuthContext.tsx              ← Authentication context
│   └── SidebarContext.tsx           ← Sidebar visibility control context
│
├── lib/
│   ├── api.ts                       ← Axios instance or API config
│   └── util.ts                      ← Utility/helper functions

```

---

###
- For more information, contact me: [Telegram](https://t.me/cirqueiraz)
- **Discord: Cirqueira**
- <a href="https://www.instagram.com/cirqueirax/">Instagram</a>


## License

MIT License © 2025 — [AtomicStresser Team](#)
