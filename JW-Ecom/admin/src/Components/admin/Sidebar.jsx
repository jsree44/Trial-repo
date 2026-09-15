
import { NavLink } from "react-router-dom";
import {
  Gem,
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Star,
  LogOut,
  Ticket,
  Gift,
  CalendarDays,
} from "lucide-react";
import "./Sidebar.css";


// Temporary role for testing
// Change to "admin" to test Admin view
const userRole = "superadmin";


const navItems = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },

  {
    to: "/admin/admin-management",
    label: "Admin Management",
    icon: Users,
    superAdminOnly: true,
  },

  {
    to: "/admin/products",
    label: "Products",
    icon: Gem,
  },

  {
    to: "/admin/orders",
    label: "Orders",
    icon: ShoppingBag,
  },

  {
    to: "/admin/inventory",
    label: "Inventory",
    icon: Package,
  },

  {
    to: "/admin/customers",
    label: "Customers",
    icon: Users,
  },

  {
    to: "/admin/reviews",
    label: "Reviews",
    icon: Star,
  },

  {
  to: "/admin/coupons",
  label: "Coupons",
  icon: Ticket, // or whichever lucide-react icon you'd like
},
  {
  to: "/admin/referrals",
  label: "Referrals",
  icon: Gift,
},
{
  to: "/admin/rentals",
  label: "Rentals",
  icon: CalendarDays,
},

];


function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">

        <div className="logo-icon">
          <Gem size={20} strokeWidth={1.75} />
        </div>

        <div className="logo-text">
          <h2>Jewelle</h2>
          <p>
            {userRole === "superadmin"
              ? "Super Admin Panel"
              : "Admin Panel"}
          </p>
        </div>

      </div>


      {/* Navigation */}
      <nav className="sidebar-nav">

        <p className="nav-title">
          Main Menu
        </p>


        {navItems
          .filter(
            (item) =>
              !item.superAdminOnly ||
              userRole === "superadmin"
          )
          .map(
            ({
              to,
              label,
              icon: Icon,
              end,
            }) => (

              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >

                <Icon
                  size={18}
                  strokeWidth={1.75}
                />

                <span className="nav-label">
                  {label}
                </span>

              </NavLink>

            )
          )}

      </nav>


      {/* Bottom */}
      <div className="sidebar-bottom">

        <button className="logout-btn">

          <LogOut
            size={18}
            strokeWidth={1.75}
          />

          <span className="nav-label">
            Log out
          </span>

        </button>

      </div>

    </aside>
  );
}


export default Sidebar;