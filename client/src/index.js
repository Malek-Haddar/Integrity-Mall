import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { ContextProvider } from "./contexts/ContextProvider";
import LanguageDetector from 'i18next-browser-languagedetector';


import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Login for event": "Login For Event",
          Login: "Login",
          Home: "Home",
          "Forgot Password": "Forgot Password ?",
          "Don’t Have any Account": "Don’t Have any Account?",
          "Sign Up": "Sign Up",
          "Join US": "Join US",
          "Join Now": "Join Now",
          Dashboard: "Dashboard",
          "Contact Us": "Contact Us",
          "Consulte Schedule": "Consult schedule",
          email: "Email",
          password: "Password",
          "remember me": "Remember Me",
          "submit now": "Submit now",
          or: "or",
          Gallery: "Gallery",
          Calendar: "Calendar",
          Profile: "Profile",
          Contact: "Contact",
          CheckIn: "CheckIn",
          closed: "closed",
          "Move to Calendar": "Move to Calendar",
          "No Category affected Yet": "No Category affected Yet",
          "A Representation of the event planning":
            "A Representation of the event planning",
          "Event Schedule": "Event Schedule",
          "Contact us via mail": "Contact us via mail",
          Subject: "Subject",
          message: "الرسالة",
          "Send Our Message": "Send Our Message",
          "Get Information": "Get Information",
          "Our Contact information":
            "Our Contact information Details and Follow us on social media",
          "Office Address": "Office Address",
          Address: "105, Avenue Tahar Ben Ammar, Menzah 9B, Tunis, Tunisia",
          "Phone Number": "Phone Number",
          "our website": "Our website",
          "Event Calendar": "Event Calendar",
          "QR Code Scanner": "QR Code Scanner",
          QR: "QR",
          Select: "Select",
          Registration: "Registration",
          "Register Now": "Register Now",
          "First Name": "First Name",
          "Last Name": "Last Name",
          "Confirm password": "Confirm password",
          Confirm: "Confirm",
          "Phone Number": "Phone Number",
          Profession: "Profession",
          "Are you a member?": "Are you a member?",
          Days: "Days",
          Hour: "Hour",
          Min: "Min",
          Sec: "Sec",
          Photos: "Photos",
          "Show All": "Show All",
          "Recent Event Photos": "Recent Event Photos",
          "Update Profile": "Update Profile",
          "Your Code QR": "Your Code QR",
          "Complete Your Profile Please": "Complete Your Profile Please",
          "Reset Now": "Reset Your Password Now",
          Reset: "Reset Password",
          Continue: "Continue",
          Ethics: "Speak Up - ethics MALL 2023",
        },
      },
      ar: {
        translation: {
          "Login for event": "تسجيل دخول للحدث",
          Login: "تسجيل دخول",
          Home: "الرئيسية",
          "Forgot Password": "هل نسيت كلمة السر",
          "Don’t Have any Account": "ليس لديك أي حساب",
          "Sign Up": "اشتراك",
          "Join US": "انضم إلينا",
          "Join Now": "نضم الان",
          Dashboard: "لوحة القيادة",
          "Contact Us": "اتصل بنا",
          "Consulte Schedule": "الجدول الزمني",
          email: "البريد الالكتروني",
          password: "كلمه السر",
          "remember me": "حفظ تسجيل الدخول",
          "submit now": "الدخول",
          or: "او",
          Gallery: "صالة عرض",
          Calendar: "يومية",
          Profile: "الملف الشخصي",
          Contact: "اتصال",
          CheckIn: "المشاركة",
          closed: "مغلق",
          "Move to Calendar": "انتقل إلى التقويم",
          "No Category affected Yet": "لم يتم تعيين فئة حاليا",
          "A Representation of the event planning": "تمثيل تخطيط الحدث",
          "Event Schedule": "الجدول الزمني للفعاليات",
          "Contact us via mail": "اتصل بنا عبر البريد",
          Subject: "الموضوع",
          Profession: "المهنة",
          message: "الرسالة",
          "Send Our Message": "أرسل الرسالة",
          "Get Information": " احصل على المعلومات",
          "Our Contact information":
            "تفاصيل معلومات الاتصال الخاصة بنا وتابعنا على مواقع التواصل الاجتماعي وسائل الإعلام",
          "Office Address": "عنوان المكتب",
          Address: "105 شارع الطاهر بن عمار ، المنزه 9 ب ، تونس ، تونس",
          "Phone Number": "رقم الهاتف",
          "our website": "موقعنا",
          "Event Calendar": "تقويم الحدث",
          "QR Code Scanner": "ماسح رمز الاستجابة",
          QR: " رمز الاستجابة",
          Select: "اختر",
          Registration: "صنع حساب",
          "Register Now": "إصنع حساب الان",
          "First Name": "الاسم",
          "Last Name": "اللقب",
          "Confirm password": "أكد رقمك السري",
          Confirm: "تأكيد",
          "Phone Number": "رقم الهاتف",
          "Are you a member?": "هل لديك حساب؟",
          Days: "ايام",
          Hour: "ساعة",
          Min: "دقيقة",
          Sec: "ثانية",
          Photos: "الصور",
          "Show All": "عرض الكل",
          "Recent Event Photos": "صور الأحداث الأخيرة",
          "Update Profile": "تحديث الملف الشخصي",
          "Your Code QR": "رمز QR الخاص بك",
          "Reset Now": "أعد تعيين كلمة المرور الخاصة بك الآن",
          Reset: "إعادة تعيين كلمة المرور",
          Continue: "مواصلة",
          Ethics: "الميثاق الأخلاقي لمول 2023",
        },
      },
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage"],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });




ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
