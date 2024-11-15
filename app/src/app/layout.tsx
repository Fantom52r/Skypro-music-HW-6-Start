import ReduxProvider from "../store/ReduxProvider";
import "./styles/globals.css";
import { Montserrat } from "next/font/google";
// import Notification from "../app/components/notification/Notification"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import store from "../store/store";
const monts = Montserrat({ subsets: ["cyrillic"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <head>
          <title>Skypro-music</title>
        </head>
        <body className={monts.className}>
          {children}
          <ToastContainer />
        </body>
      </ReduxProvider>
    </html>
  );
}
