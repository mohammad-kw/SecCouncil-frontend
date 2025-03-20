// import React, { createContext, useState, useEffect, useContext } from "react";
// import { useSelector } from "react-redux";
// import {
//   requestNotificationPermission,
//   onMessageListener,
// } from "../utils/firebase";
// import { apiConnector } from "../services/apiconnector";
// import { notificationEndpoints } from "../services/apis";
// import toast from "react-hot-toast";

// const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const { token } = useSelector((state) => state.auth);
//   const [notifications, setNotifications] = useState([]);
//   const [notificationCount, setNotificationCount] = useState(0);

//   useEffect(() => {
//     // Request notification permission when user is logged in
//     if (token) {
//       registerForPushNotifications();
//     }
//   }, [token]);

//   // Register for push notifications
//   const registerForPushNotifications = async () => {
//     try {
//       const fcmToken = await requestNotificationPermission();

//       if (fcmToken) {
//         // Register token with backend
//         await apiConnector(
//           "POST",
//           notificationEndpoints.REGISTER_FCM_TOKEN_API,
//           { fcmToken },
//           {
//             Authorization: `Bearer ${token}`,
//           }
//         );
//       }
//     } catch (error) {
//       console.error("Error registering for push notifications:", error);
//     }
//   };

//   // Set up foreground message handler
//   useEffect(() => {
//     if (!token) return; // Only set up listener if user is logged in

//     console.log("Setting up foreground message listener...");

//     // Set up foreground message handler
//     const unsubscribe = onMessageListener((payload) => {
//       console.log("Foreground message received:", payload);

//       // Display notification using toast or custom UI
//       const { title, body } = payload.notification;
//       toast.custom((t) => (
//         <div
//           className={`${
//             t.visible ? "animate-enter" : "animate-leave"
//           } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex`}
//         >
//           <div className="flex-1 p-4">
//             <div className="flex items-start">
//               <div className="ml-3 flex-1">
//                 <p className="text-sm font-medium text-gray-900">{title}</p>
//                 <p className="mt-1 text-sm text-gray-500">{body}</p>
//               </div>
//             </div>
//           </div>
//           <div className="flex border-l border-gray-200">
//             <button
//               onClick={() => toast.dismiss(t.id)}
//               className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       ));

//       // Add to local notifications list
//       const newNotification = {
//         id: Date.now(),
//         title,
//         body,
//         timestamp: new Date().toISOString(),
//         read: false,
//       };

//       setNotifications((prev) => [newNotification, ...prev]);
//       setNotificationCount((prev) => prev + 1);
//     });

//     console.log("Foreground message listener set up successfully.");

//     // Cleanup function
//     return () => {
//       console.log("Cleaning up foreground message listener...");
//       unsubscribe(); // Unsubscribe from the listener
//     };
//   }, [token]);

//   const markAsRead = (id) => {
//     setNotifications((prev) =>
//       prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
//     );
//     setNotificationCount((prev) => Math.max(0, prev - 1));
//   };

//   const markAllAsRead = () => {
//     setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
//     setNotificationCount(0);
//   };

//   const clearNotifications = () => {
//     setNotifications([]);
//     setNotificationCount(0);
//   };

//   const value = {
//     notifications,
//     notificationCount,
//     markAsRead,
//     markAllAsRead,
//     clearNotifications,
//   };

//   return (
//     <NotificationContext.Provider value={value}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotification = () => {
//   return useContext(NotificationContext);
// };

// claude updated

import React, { createContext, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import {
  requestNotificationPermission,
  onMessageListener,
} from "../utils/firebase";
import { apiConnector } from "../services/apiconnector";
import { notificationEndpoints } from "../services/apis";
import toast from "react-hot-toast";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    // Load notifications from localStorage on mount
    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      try {
        const parsedNotifications = JSON.parse(savedNotifications);
        setNotifications(parsedNotifications);
        // Count unread notifications
        const unreadCount = parsedNotifications.filter((n) => !n.read).length;
        setNotificationCount(unreadCount);
      } catch (error) {
        console.error("Error parsing saved notifications:", error);
      }
    }

    // Request notification permission when user is logged in
    if (token) {
      registerForPushNotifications();
    }
  }, [token]);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Register for push notifications
  const registerForPushNotifications = async () => {
    try {
      const fcmToken = await requestNotificationPermission();

      if (fcmToken) {
        setIsPermissionGranted(true);
        // Register token with backend
        await apiConnector(
          "POST",
          notificationEndpoints.REGISTER_FCM_TOKEN_API,
          { fcmToken },
          {
            Authorization: `Bearer ${token}`,
          }
        );
        console.log("FCM token registered successfully");
      } else {
        setIsPermissionGranted(false);
      }
    } catch (error) {
      console.error("Error registering for push notifications:", error);
      setIsPermissionGranted(false);
    }
  };

  // Set up foreground message handler
  useEffect(() => {
    if (!token) return; // Only set up listener if user is logged in

    console.log("Setting up foreground message listener...");

    // Set up foreground message handler
    const unsubscribe = onMessageListener((payload) => {
      console.log("Foreground message received:", payload);

      // Display notification using toast or custom UI
      const { title, body } = payload.notification;
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-richblack-800 shadow-lg rounded-lg pointer-events-auto flex`}
        >
          <div className="flex-1 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-black-5">{title}</p>
                <p className="mt-1 text-sm text-black-300">{body}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-richblack-700">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-yellow-50 hover:text-yellow-100 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ));

      // Add to local notifications list
      const newNotification = {
        id: Date.now(),
        title,
        body,
        timestamp: new Date().toISOString(),
        read: false,
        data: payload.data || {},
      };

      setNotifications((prev) => [newNotification, ...prev]);
      setNotificationCount((prev) => prev + 1);
    });

    console.log("Foreground message listener set up successfully.");

    // Cleanup function
    return () => {
      console.log("Cleaning up foreground message listener...");
      unsubscribe(); // Unsubscribe from the listener
    };
  }, [token]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    setNotificationCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    setNotificationCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setNotificationCount(0);
    localStorage.removeItem("notifications");
  };

  const requestPermission = () => {
    registerForPushNotifications();
  };

  const value = {
    notifications,
    notificationCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    isPermissionGranted,
    requestPermission,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
