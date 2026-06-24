import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import PublicCatProfile from "./pages/public/PublicCatProfile"
import ReportForm from "./pages/public/ReportForm"
import ReportSuccess from "./pages/public/ReportSuccess"
import ContactOwner from "./pages/public/ContactOwner"
import OwnerLogin from "./pages/owner/OwnerLogin"
import OwnerRegister from "./pages/owner/OwnerRegister"
import OwnerDashboard from "./pages/owner/OwnerDashboard"
import MyCats from "./pages/owner/MyCats"
import AddCat from "./pages/owner/AddCat"
import CatDetail from "./pages/owner/CatDetail"
import LostMode from "./pages/owner/LostMode"
import ReportsInbox from "./pages/owner/ReportsInbox"
import ReportDetail from "./pages/owner/ReportDetail"
import Journal from "./pages/owner/Journal"
import CatgramFeed from "./pages/catgram/CatgramFeed"
import CatgramNew from "./pages/catgram/CatgramNew"
import CatgramPostDetail from "./pages/catgram/CatgramPostDetail"
import SeedDemo from "./pages/dev/SeedDemo"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cat/:publicId" element={<PublicCatProfile />} />
      <Route path="/cat/:publicId/report-found" element={<ReportForm type="found" />} />
      <Route path="/cat/:publicId/report-sighting" element={<ReportForm type="sighting" />} />
      <Route path="/cat/:publicId/contact-owner" element={<ContactOwner />} />
      <Route path="/report/success" element={<ReportSuccess />} />

      <Route path="/owner/register" element={<OwnerRegister />} />
      <Route path="/owner/login" element={<OwnerLogin />} />
      <Route path="/owner/dashboard" element={<OwnerDashboard />} />
      <Route path="/owner/cats" element={<MyCats />} />
      <Route path="/owner/cats/new" element={<AddCat />} />
      <Route path="/owner/cats/:catId" element={<CatDetail />} />
      <Route path="/owner/cats/:catId/lost-mode" element={<LostMode />} />
      <Route path="/owner/reports" element={<ReportsInbox />} />
      <Route path="/owner/reports/:reportId" element={<ReportDetail />} />
      <Route path="/owner/journal" element={<Journal />} />

      <Route path="/catgram" element={<CatgramFeed />} />
      <Route path="/catgram/new" element={<CatgramNew />} />
      <Route path="/catgram/lost" element={<CatgramFeed filter="lost" />} />
      <Route path="/catgram/found" element={<CatgramFeed filter="found" />} />
      <Route path="/catgram/:postId" element={<CatgramPostDetail />} />

      <Route path="/dev/seed" element={<SeedDemo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
