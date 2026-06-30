import { useCallback, useEffect, useRef, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { BUILD_ID } from "../generated/buildMeta.js";

const UPDATE_CHECK_INTERVAL_MS = 5 * 60 * 1000;

const waitForWaitingWorker = (registration, timeoutMs = 4000) =>
    new Promise((resolve) => {
        if (registration?.waiting) {
            resolve(registration.waiting);
            return;
        }

        const installing = registration?.installing;
        if (!installing) {
            resolve(null);
            return;
        }

        const timeout = window.setTimeout(() => resolve(null), timeoutMs);

        installing.addEventListener("statechange", () => {
            if (installing.state === "installed" && registration.waiting) {
                window.clearTimeout(timeout);
                resolve(registration.waiting);
            }
            if (installing.state === "redundant") {
                window.clearTimeout(timeout);
                resolve(null);
            }
        });
    });

export function usePwaUpdate() {
    const registrationRef = useRef(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(registration) {
            registrationRef.current = registration;
            registration?.update();
        },
        onRegisterError(error) {
            console.error("Service worker registration failed:", error);
        },
        onNeedRefresh() {
            setNeedRefresh(true);
        },
    });

    const checkRemoteVersion = useCallback(async () => {
        try {
            const response = await fetch(`/version.json?${Date.now()}`, {
                cache: "no-store",
            });

            if (!response.ok) return;

            const { buildId } = await response.json();
            if (buildId && buildId !== BUILD_ID) {
                await registrationRef.current?.update();
            }
        } catch {
            // Ignore network errors during version check
        }
    }, []);

    const checkForUpdates = useCallback(() => {
        registrationRef.current?.update();
        checkRemoteVersion();
    }, [checkRemoteVersion]);

    useEffect(() => {
        checkForUpdates();

        const onVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                checkForUpdates();
            }
        };

        const onFocus = () => checkForUpdates();
        const onPageShow = (event) => {
            if (event.persisted) {
                checkForUpdates();
            }
        };

        document.addEventListener("visibilitychange", onVisibilityChange);
        window.addEventListener("focus", onFocus);
        window.addEventListener("pageshow", onPageShow);

        const intervalId = window.setInterval(checkForUpdates, UPDATE_CHECK_INTERVAL_MS);

        return () => {
            document.removeEventListener("visibilitychange", onVisibilityChange);
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("pageshow", onPageShow);
            window.clearInterval(intervalId);
        };
    }, [checkForUpdates]);

    const applyUpdate = useCallback(async () => {
        if (isUpdating) return;
        setIsUpdating(true);

        const registration = registrationRef.current;

        try {
            await registration?.update();
        } catch {
            // Continue to reload fallback
        }

        const waitingWorker = registration?.waiting || (await waitForWaitingWorker(registration));

        if (waitingWorker) {
            const onControllerChange = () => {
                navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
                window.location.reload();
            };
            navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

            try {
                await updateServiceWorker(true);
            } catch {
                waitingWorker.postMessage({ type: "SKIP_WAITING" });
            }

            // Fallback reload if controllerchange doesn't fire within 2.5 seconds
            window.setTimeout(() => {
                window.location.reload();
            }, 2500);
            return;
        }

        window.location.reload();
    }, [isUpdating, updateServiceWorker]);

    const dismissUpdate = useCallback(() => {
        setNeedRefresh(false);
        setIsUpdating(false);
    }, [setNeedRefresh]);

    return {
        needRefresh,
        isUpdating,
        applyUpdate,
        dismissUpdate,
        checkForUpdates,
    };
}
