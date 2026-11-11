import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout, PublicLayout } from './components/Layout'
import Landing from './pages/public/Landing'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import VerifyEmail from './pages/public/VerifyEmail'
import ForgotPassword from './pages/public/ForgotPassword'
import Welcome from './pages/public/Welcome'
import LandlordDashboard from './pages/landlord/Dashboard'
import Properties from './pages/landlord/Properties'
import AddProperty from './pages/landlord/AddProperty'
import PropertyLayout from './pages/landlord/PropertyLayout'
import PropertyOverview from './pages/landlord/PropertyOverview'
import PropertyLeases from './pages/landlord/PropertyLeases'
import PropertyRent from './pages/landlord/PropertyRent'
import PropertyReceipts from './pages/landlord/PropertyReceipts'
import PropertyRequests from './pages/landlord/PropertyRequests'
import RequestDetails from './pages/landlord/RequestDetails'
import TenantDashboard from './pages/tenant/Dashboard'
import AcceptInvite from './pages/tenant/AcceptInvite'
import LeaseLayout from './pages/tenant/LeaseLayout'
import LeaseOverview from './pages/tenant/LeaseOverview'
import PayRent from './pages/tenant/PayRent'
import ProofSubmitted from './pages/tenant/ProofSubmitted'
import History from './pages/tenant/History'
import TenantReceipts from './pages/tenant/Receipts'
import TenantRequests from './pages/tenant/Requests'
import NewRequest from './pages/tenant/NewRequest'
import RequestStatus from './pages/tenant/RequestStatus'
import Settings from './pages/shared/Settings'
import Profile from './pages/shared/Profile'
import Notifications from './pages/shared/Notifications'
import NotFound from './pages/shared/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<AppLayout />}>
        {/* Landlord mode: everything lives under Properties */}
        <Route path="/landlord" element={<LandlordDashboard />} />
        <Route path="/landlord/properties" element={<Properties />} />
        <Route path="/landlord/properties/new" element={<AddProperty />} />
        <Route path="/landlord/properties/:id" element={<PropertyLayout />}>
          <Route index element={<PropertyOverview />} />
          <Route path="leases" element={<PropertyLeases />} />
          <Route path="rent" element={<PropertyRent />} />
          <Route path="receipts" element={<PropertyReceipts />} />
          <Route path="requests" element={<PropertyRequests />} />
          <Route path="requests/:reqId" element={<RequestDetails />} />
        </Route>
        {/* Tenant mode: everything lives under My lease */}
        <Route path="/tenant" element={<TenantDashboard />} />
        <Route path="/tenant/invite" element={<AcceptInvite />} />
        <Route path="/tenant/lease" element={<LeaseLayout />}>
          <Route index element={<LeaseOverview />} />
          <Route path="pay" element={<PayRent />} />
          <Route path="pay/submitted" element={<ProofSubmitted />} />
          <Route path="history" element={<History />} />
          <Route path="receipts" element={<TenantReceipts />} />
          <Route path="requests" element={<TenantRequests />} />
          <Route path="requests/new" element={<NewRequest />} />
          <Route path="requests/:reqId" element={<RequestStatus />} />
        </Route>
        {/* Shared by both modes */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/home" element={<Navigate to="/landlord" replace />} />
      </Route>
    </Routes>
  )
}
