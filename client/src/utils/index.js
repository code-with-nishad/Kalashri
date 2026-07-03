import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-IN")}`;

export const formatDate = (date) => {
  if (!date) return "--";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (time) => time || "--";

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(date);
};

export const getInitials = (firstName, lastName) =>
  `${(firstName || "?")[0]}${(lastName || "")[0] || ""}`.toUpperCase();

export const truncate = (str, n = 80) =>
  str && str.length > n ? `${str.slice(0, n)}...` : str;

export const isPriceSet = (amount) => typeof amount === "number" && amount > 0;

export const formatPriceOrTbd = (amount) =>
  isPriceSet(amount) ? formatCurrency(amount) : "Price on request";

export const formatDuration = (seconds) => {
  if (!seconds) return "0s";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
};
