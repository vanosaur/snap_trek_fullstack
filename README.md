# 📸 Snap-Trek - A Photo Travel Journal Web App

vercel - snap-trek-fullstack.vercel.app
render - https://snap-trek-fullstack.onrender.com

> **Capture, Organize, and Map Your Adventures.**

**Snap-Trek** is a unified platform designed to solve the problem of scattered travel memories. It allows travelers to upload photos, tag locations, add captions, and view their journeys visually on an interactive map—turning static photos into a dynamic digital journal.

---

## 📖 Problem Statement
In today's world, travelers capture hundreds of photos but lack a unified space to record and organize them. [cite_start]Managing memories across multiple devices and apps is often messy and unorganized[cite: 5, 6].

## 💡 Solution
Snap-Trek provides a simple, elegant platform to:
* **Upload** travel photos with captions.
* **Tag** specific locations.
* **View** adventures visually on an interactive map.
* [cite_start]**Search & Filter** memories for easy access[cite: 7, 8].

---

## ✨ Key Features

### 🔐 Authentication & Security
* [cite_start]Secure **Signup, Login, and Logout** functionality[cite: 50].
* [cite_start]Powered by **Supabase Auth** (Email/Password & OAuth)[cite: 26].

### 🌍 Interactive Mapping
* [cite_start]Tag locations on photos and display them on an **interactive world map**[cite: 55].

### 📝 Comprehensive CRUD Operations
* [cite_start]**Create:** Upload new travel posts with photos, captions, and locations[cite: 51].
* **Read:** View all travel posts in a Feed or Profile view.
* **Update:** Edit existing posts (caption, photo, or location).
* [cite_start]**Delete:** Remove posts you no longer want to keep[cite: 65].

### ⚡ Dynamic & Real-Time
* [cite_start]**Real-time Updates:** Feeds and maps update instantly as new posts are added using Supabase real-time subscriptions[cite: 73].
* [cite_start]**Dynamic Fetching:** Profile and Map pages fetch user data dynamically without page reloads[cite: 36].

### 🔍 Search, Sort & Filter
* [cite_start]**Search:** Find posts by destination name, caption, or tag[cite: 67].
* [cite_start]**Sort:** Order posts by upload date or alphabetically[cite: 68].
* [cite_start]**Filter:** Filter posts by specific locations or users[cite: 69].
* [cite_start]**Pagination:** Server-side pagination for efficient handling of large datasets[cite: 71].

---

## 🛠️ Tech Stack

### **Frontend**
* [cite_start]**Framework:** React.js + Vite [cite: 19]
* [cite_start]**Language:** TypeScript [cite: 19]
* [cite_start]**Routing:** React Router [cite: 20]
* [cite_start]**Styling:** Tailwind CSS + shadcn-ui [cite: 20]
* [cite_start]**Hosting:** Vercel [cite: 28]

### **Backend & Database**
* [cite_start]**Backend API:** Supabase (REST APIs) [cite: 21]
* [cite_start]**Database:** PostgreSQL (Managed by Supabase) [cite: 25]
* [cite_start]**Storage:** Supabase Storage (for photo uploads) [cite: 15]
* [cite_start]**Hosting:** Supabase Cloud [cite: 30]

---

## 🏗️ System Architecture

The application follows a modular architecture:
1.  [cite_start]**Frontend:** Built with React + Vite for high performance, utilizing `shadcn-ui` for a clean, minimal interface[cite: 18, 34].
2.  [cite_start]**Backend:** Relies on Supabase services for Authentication, Database, and Storage[cite: 21].
3.  [cite_start]**Data Flow:** The frontend communicates directly with the PostgreSQL database via Supabase REST APIs[cite: 65].

---

## 📡 API Overview

| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/auth/signup` | `POST` | Register a new user | Public |
| `/api/auth/login` | `POST` | Authenticate user | Public |
| `/api/posts` | `GET` | Retrieve all posts (with pagination/filter) | Authenticated |
| `/api/posts/:id` | `GET` | Retrieve a specific post by ID | Authenticated |
| `/api/posts` | `POST` | Create a new post (photo + caption + location) | Authenticated |
| `/api/posts/:id` | `PUT` | Update an existing post | Authenticated |
| `/api/posts/:id` | `DELETE` | Delete a post | Admin/Owner |
| `/api/search` | `GET` | Search posts by location, caption, or tag | Authenticated |

[cite_start]*[cite: 62]*

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v16+)
* npm or yarn
* A Supabase account

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/snap-trek.git](https://github.com/your-username/snap-trek.git)
    cd snap-trek
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

---

## 🔮 Future Improvements
* Social sharing features (Share to Instagram/Facebook).
* Travel itinerary planner.
* Offline support (PWA).

---

**License**
This project is licensed under the MIT License.
