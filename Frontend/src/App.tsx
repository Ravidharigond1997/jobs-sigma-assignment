// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import Register from "./pages/Register";
// import TodoList from "./pages/TodoList";
// import UserPage from "./pages/UserPage";
// import { useSelector } from "react-redux";
// import { RootState } from "./store"; // Adjust this path to where your store is located

// const App: React.FC = () => {
//   // Check if the user is logged in (you can use global state or localStorage)
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.auth.isAuthenticated
//   );

//   return (
//     <Router>
//       <div className="flex">
//         {isAuthenticated && (
//           <div className="w-64">
//             <Sidebar />
//           </div>
//         )}

//         <div className="flex-1 p-6 bg-gray-100">
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             {/* Protected Routes */}
//             {isAuthenticated && (
//               <>
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/profile" element={<Profile />} />
//                 <Route path="/todos" element={<TodoList />} />
//                 <Route path="/users" element={<UserPage />} />
//               </>
//             )}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;
