import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import WorkPage from "./pages/WorkPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import AdminDashboard from "./pages/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <>
            <LenisScroll />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/work/:slug" element={<ProjectDetailPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </>
    );
}