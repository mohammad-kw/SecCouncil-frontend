// // import { useSelector } from "react-redux"
// // import { Outlet } from "react-router-dom"

// // import Sidebar from "../components/core/Dashboard/Sidebar"

// // function Dashboard() {
// //   const { loading: profileLoading } = useSelector((state) => state.profile)
// //   const { loading: authLoading } = useSelector((state) => state.auth)

// //   if (profileLoading || authLoading) {
// //     return (
// //       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
// //         <div className="spinner"></div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col md:flex-row">
// //       <Sidebar />
// //       <div className="flex-1 overflow-auto">
// //         <div className="mx-auto w-full max-w-[1000px] py-10 px-4 sm:px-6 lg:px-8">
// //           <Outlet />
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Dashboard

// import { useSelector } from "react-redux";
// import { Outlet } from "react-router-dom";

// import Sidebar from "../components/core/Dashboard/Sidebar";

// function Dashboard() {
//   const { loading: profileLoading, user } = useSelector(
//     (state) => state.profile
//   );
//   const { loading: authLoading } = useSelector((state) => state.auth);

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   const showSidebar =
//     user?.accountType === "Instructor" || user?.accountType === "Admin";

//   return (
//     <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col md:flex-row">
//       {/* Conditionally render Sidebar */}
//       {showSidebar && <Sidebar />}
//       <div className={`flex-1 overflow-auto ${showSidebar ? "" : "w-full"}`}>
//         <div className="mx-auto w-full max-w-[1000px] py-10 px-4 sm:px-6 lg:px-8">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import IconBtn from "../components/common/IconBtn";

import NotificationPermission from "../components/common/NotificationPermission";

function Dashboard() {
  const navigate = useNavigate();
  const { loading: profileLoading, user } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  const showSidebar =
    user?.accountType === "Instructor" || user?.accountType === "Admin";

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col md:flex-row">
      {/* Conditionally render Sidebar */}
      {showSidebar && <Sidebar />}
      <div className={`flex-1 overflow-auto ${showSidebar ? "" : "w-full"}`}>
        <div className="mx-auto w-full max-w-[1000px] py-10 px-4 sm:px-6 lg:px-8">
          {/* Add the notification permission component */}
          <NotificationPermission />

          {/* My Profile Title */}
          {/* <h2 className="text-2xl font-bold text-richblack-900 mb-4">
            My Profile
          </h2> */}

          {/* Outlet to render other pages inside Dashboard */}
          <Outlet />

          {user?.accountType === "Admin" && (
            <div className="mb-6 flex gap-4">
              <IconBtn
                text="Statistics"
                onclick={() => navigate("/adminDashboard")}
                customClasses="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              />
              <IconBtn
                text="Create Category"
                onclick={() => navigate("/createcategory")}
                customClasses="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
              />
              <IconBtn
                text="Edit Pages"
                onclick={() => navigate("/edit-pages")}
                customClasses="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
              />
              <IconBtn
                text="Notifications"
                onclick={() => navigate("/notification-manager")}
                customClasses="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
