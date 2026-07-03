# Client Version Restrictions

This project is being built for a client using the existing application as the foundation.

The existing application contains premium features that are part of our own product/IP. These features must not be included in the client's version.

## Do Not Copy Or Expose

- Glow Points / Reward Points
- Leaderboard
- Visitor Board
- Gamification
- Achievement System
- Referral System
- Daily Rewards
- Loyalty Program
- User Levels
- Badges
- Streaks
- Challenge System
- Internal analytics specific to our product
- Experimental AI features
- Premium SaaS-only modules
- Any feature intended for our future commercial product
- Any hidden admin functionality unrelated to the client's requirements

## Removal Requirements

If any of the above features exist in the current project:

- Remove them completely from the UI.
- Remove their navigation links.
- Remove related pages.
- Remove related API endpoints when they are not used elsewhere.
- Remove related database models when they are exclusive to those features.
- Remove related components.
- Remove related notifications.
- Remove related dashboard widgets.
- Remove related analytics cards.

Do not leave unused code behind for proprietary features.

## Client Scope

The application should focus exclusively on the features below.

### Fashion

- Stitching Services
- Fashion Orders
- Measurements
- Aari Work
- Gallery
- Offers
- Customer Management

### Beauty Parlour

- Services
- Appointment Booking
- Staff Management
- Customer History
- Calendar
- Notifications

### Common Features

- Authentication
- Dashboard
- Customers
- Appointments
- Reports
- Analytics
- Gallery
- Reviews
- Contact
- WhatsApp Integration
- Settings
- Responsive UI
- PWA

## Guiding Principle

This is not a copy of our product. It is a custom client implementation built on top of the existing architecture.

Reuse the underlying codebase, architecture, components, and infrastructure wherever possible, but expose only the features required for this client.

When in doubt, choose the simpler client-focused implementation rather than exposing an advanced internal feature.
