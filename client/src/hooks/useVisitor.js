import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { visitorService } from "../services";

const VISITOR_ID_KEY = "visitor_id";
const SESSION_START_KEY = "session_start";

const generateVisitorId = () => {
  return `visitor_${Math.random().toString(36).substring(2, 9)}${Date.now().toString(36)}`;
};

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) return "Mobile";
  if (/tablet/i.test(ua)) return "Tablet";
  return "Desktop";
};

const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  return "Unknown";
};

const getOS = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac")) return "MacOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iOS")) return "iOS";
  return "Unknown";
};

const getScreenResolution = () => {
  return `${window.screen.width}x${window.screen.height}`;
};

const getTrafficSource = () => {
  const referrer = document.referrer;
  if (!referrer) return "Direct";
  if (referrer.includes("google")) return "Google";
  if (referrer.includes("facebook")) return "Facebook";
  if (referrer.includes("instagram")) return "Instagram";
  if (referrer.includes("linkedin")) return "LinkedIn";
  if (referrer.includes("twitter")) return "Twitter";
  return "Other";
};

const getUTMParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get("utm_source") || null,
    utm_medium: urlParams.get("utm_medium") || null,
    utm_campaign: urlParams.get("utm_campaign") || null,
    utm_term: urlParams.get("utm_term") || null,
    utm_content: urlParams.get("utm_content") || null,
  };
};

export const useVisitor = () => {
  const location = useLocation();
  const visitorIdRef = useRef(null);
  const sessionStartRef = useRef(Date.now());
  const lastPageRef = useRef(location.pathname);
  const scrollTimeoutRef = useRef(null);

  // Initialize visitor ID
  useEffect(() => {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
      visitorId = generateVisitorId();
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }
    visitorIdRef.current = visitorId;
    localStorage.setItem(SESSION_START_KEY, Date.now().toString());
  }, []);

  // Track page views
  useEffect(() => {
    if (!visitorIdRef.current) return;

    const trackPageView = async () => {
      try {
        await visitorService.track({
          visitorId: visitorIdRef.current,
          page: location.pathname,
          device: getDeviceType(),
          browser: getBrowser(),
          os: getOS(),
          language: navigator.language,
          screenResolution: getScreenResolution(),
          trafficSource: getTrafficSource(),
          referrer: document.referrer || null,
          utmParameters: getUTMParameters(),
          notificationPermission: Notification.permission,
          pwaInstalled: window.matchMedia("(display-mode: standalone)").matches,
        });
      } catch (error) {
        console.error("Failed to track visitor:", error);
      }
    };

    trackPageView();
    lastPageRef.current = location.pathname;
  }, [location.pathname]);

  // Track scroll depth
  useEffect(() => {
    if (!visitorIdRef.current) return;

    const handleScroll = () => {
      if (scrollTimeoutRef.current) return;

      scrollTimeoutRef.current = setTimeout(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

        if (scrollPercentage > 0 && scrollPercentage % 25 === 0) {
          visitorService.trackEvent({
            visitorId: visitorIdRef.current,
            eventType: "scroll",
            eventData: { scrollPercentage },
          }).catch(console.error);
        }

        scrollTimeoutRef.current = null;
      }, 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track time spent on page when unmounting
  useEffect(() => {
    if (!visitorIdRef.current) return;

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - sessionStartRef.current) / 1000);
      if (timeSpent > 0) {
        visitorService.updateTimeSpent({
          visitorId: visitorIdRef.current,
          timeSpent,
        }).catch(console.error);

        // Track exit event
        visitorService.trackEvent({
          visitorId: visitorIdRef.current,
          eventType: "exit",
          eventData: { page: location.pathname },
        }).catch(console.error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [location.pathname]);

  // Track button clicks
  const trackButtonClick = useCallback((buttonName, page = location.pathname) => {
    if (!visitorIdRef.current) return;

    visitorService.trackEvent({
      visitorId: visitorIdRef.current,
      eventType: "button_click",
      eventData: { buttonName, page },
    }).catch(console.error);
  }, [location.pathname]);

  // Track register click
  const trackRegisterClick = useCallback(() => {
    if (!visitorIdRef.current) return;

    visitorService.trackEvent({
      visitorId: visitorIdRef.current,
      eventType: "register_click",
      eventData: { page: location.pathname },
    }).catch(console.error);
  }, [location.pathname]);

  // Track register form open
  const trackRegisterOpen = useCallback(() => {
    if (!visitorIdRef.current) return;

    visitorService.trackEvent({
      visitorId: visitorIdRef.current,
      eventType: "register_open",
      eventData: { page: location.pathname },
    }).catch(console.error);
  }, [location.pathname]);

  return {
    visitorId: visitorIdRef.current,
    trackButtonClick,
    trackRegisterClick,
    trackRegisterOpen,
  };
};
