<div align="center">
  <img width=115 src="https://github.com/user-attachments/assets/4ad8438e-d63f-4d8b-b44b-7001be28b81f" />
  <h1>Atomic Stresser</h1>
</div>

> ⚠️ **Project in active development** — some features may still be in progress.

**AtomicStresser** is a powerful and modern stress testing platform built with:

* ✅ Next.js + Tailwind CSS (frontend)
* ✅ RESTful API to manage attack dispatch
* ✅ Dual-layer architecture (L4 and L7 methods)
* ✅ Admin panel for user and server control
* ✅ Beautiful, dark UI with animations using Framer Motion

---

## ✨ Features

* Layer 4 & Layer 7 attack methods (legal use only)
* Cloudflare, OVH and other anti-DDoS bypass techniques
* Real-time dashboard and charts
* Admin panel to manage users, slots, plans and expiration
* Toast system for notifications
* Responsive UI for mobile and desktop
* Sidebar with icon-only design and hover label

---

## Dashboard 👑
> ⚠️ **Project in active development** — some features may still be in progress.
![image](https://github.com/user-attachments/assets/ff9cae17-2489-4fef-8823-315ff4b1fcd8)

---

## 🚀 Getting Started

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

## 📂 Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx                  ← Página do admin (usuários, planos, métodos)
│
│   ├── dashboard/
│   │   └── page.tsx                  ← Dashboard principal (estatísticas, acesso rápido, etc.)
│
│   ├── login/
│   │   └── page.tsx                  ← Tela de login
│
│   ├── panel/
│   │   └── page.tsx                  ← Painel de ataque com L4/L7 + logs
│
│   ├── profile/
│   │   └── page.tsx                  ← Perfil do usuário
│
│   ├── register/
│   │   └── page.tsx                  ← Tela de cadastro
│
│   ├── layout.tsx                   ← Layout principal da aplicação (provavelmente com sidebar/header)
│   ├── globals.css                  ← Estilos globais
│   └── ClientBody.tsx              ← Provavelmente wrapper com contexto
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
│   │   ├── Layer4Form.tsx           ← Formulário Layer 4
│   │   ├── Layer7Form.tsx           ← Formulário Layer 7
│   │   └── AttackLogs.tsx           ← Tabela com logs de ataques
│
│   ├── header.tsx                   ← Cabeçalho fixo ou dinâmico
│   ├── sidebar.tsx                  ← Menu lateral (provavelmente usado com layout.tsx)
│   ├── RouteGuard.tsx               ← Proteção de rotas privadas
│   ├── ToastPopup.tsx               ← Notificações personalizadas
│   └── TopLoadingBar.tsx            ← Barra de progresso no topo (estilo YouTube)
│
├── contexts/
│   ├── AuthContext.tsx              ← Contexto de autenticação
│   └── SidebarContext.tsx           ← Controle de visibilidade do menu lateral
│
├── lib/
    ├── api.ts                       ← Instância do Axios ou configuração de API
    └── util.ts                      ← Funções auxiliares/utilitárias


```

---

#### Will the source code be public? I’m not sure yet, but probably yes.
- For more information, contact me: [Telegram](https://t.me/cirqueiraz)
- **Discord: Cirqueira**
- <a href="https://www.instagram.com/cirqueirax/">Instagram</a>


## 📄 License

MIT License © 2025 — [AtomicStresser Team](#)
