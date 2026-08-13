import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";
import {
  Mail,
  Phone,
  Calendar,
  Crown,
  Gift,
  MapPin,
  BadgeCheck,
  Pencil,
  User as UserIcon,
} from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import defaultProfile from "../../assets/users/profile.jpg";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="profile-page-main">
        <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

        <div className="profile-page">
          <div className="pp-title">
            <h1>My Profile</h1>
            <p>Manage your personal information</p>
          </div>

          <div className="pp-grid">

            <div className="pp-card pp-summary">
              <div className="pp-avatar-wrap">
                <img
                  src={user.profileImage || defaultProfile}
                  alt={user.fullName}
                />
                <button className="pp-camera" aria-label="Change photo">
                  <Pencil size={14} />
                </button>
              </div>

              <h2>{user.fullName}</h2>
              <p className="pp-email">{user.email}</p>

              <span className="pp-member">
                <Crown size={15} />
                Premium Member
              </span>

              <div className="pp-points">
                <Gift size={20} />
                <div>
                  <strong>{user.loyaltyPoints || 2450}</strong>
                  <span>Loyalty Points</span>
                </div>
              </div>

              <button className="pp-redeem" onClick={() => navigate("/")}>
                Redeem Rewards
              </button>
            </div>

            <div className="pp-card pp-details">
              <h2>Personal Information</h2>

              <div className="pp-row">
                <span className="pp-icon"><UserIcon size={18} /></span>
                <div>
                  <small>Full Name</small>
                  <strong>{user.fullName}</strong>
                </div>
              </div>

              <div className="pp-row">
                <span className="pp-icon"><Mail size={18} /></span>
                <div>
                  <small>Email Address</small>
                  <strong>{user.email}</strong>
                </div>
              </div>

              <div className="pp-row">
                <span className="pp-icon"><Phone size={18} /></span>
                <div>
                  <small>Phone Number</small>
                  <strong>{user.phone || "+91 98765 43210"}</strong>
                </div>
              </div>

              <div className="pp-row">
                <span className="pp-icon"><Calendar size={18} /></span>
                <div>
                  <small>Member Since</small>
                  <strong>{memberSince}</strong>
                </div>
              </div>

              <div className="pp-row">
                <span className="pp-icon"><BadgeCheck size={18} /></span>
                <div>
                  <small>Account Status</small>
                  <strong className="pp-active">Active · {user.role}</strong>
                </div>
              </div>
            </div>

            <div className="pp-card pp-addresses">
              <h2>Saved Addresses</h2>

              {user.address && user.address.length ? (
                user.address.map((addr, i) => (
                  <div className="pp-address" key={i}>
                    <span className="pp-icon"><MapPin size={18} /></span>
                    <div>
                      <strong>{addr.label || "Address " + (i + 1)}</strong>
                      <p>{addr.address || addr}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="pp-empty">
                  <MapPin size={40} color="#9CA3AF" />
                  <p>No saved addresses yet</p>
                </div>
              )}

              <button className="pp-add-btn">
                + Add New Address
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
