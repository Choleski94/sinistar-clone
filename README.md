# Sinistar Clone - Accommodation Finder

## Objective

The primary goal of this project is to assess proficiency in React, Material UI, TypeScript, algorithm development, and integration of third-party APIs (Google Maps JS SDK). The application dynamically sorts and displays accommodation options based on user-defined criteria, demonstrating the ability to build a responsive and user-friendly web application.

## Features
- Responsive Design: The application adjusts seamlessly to different screen sizes, ensuring a consistent user experience across devices.
- Dynamic Sorting: Accommodations can be sorted based on various user-defined criteria such as distance, host response rate, review score, and extension flexibility.
- Material UI Integration: Utilizes Material UI components for a modern and cohesive interface.
- TypeScript Support: Ensures type safety and improved code quality.
- Google Maps Integration: Displays accommodation locations on an interactive map using the Google Maps JavaScript SDK.
- Filter Form: Allows users to filter accommodations based on their preferences using sliders and other input controls.

# Installation
Clone the repository from GitHub.

```bash
git clone https://github.com/choleski/sinistar-clone.git
```

Install the required packages.
```bash
npm install
```

Before starting, make sure to set up your Google Maps API key in the `.env` file:
```bash
cp .env.sample .env
```

Edit the .env file and add your Google Maps API key:
```bash
VITE_GOOGLE_MAP_API_KEY=<your-google-map-api-key>
```

Start the development server.
```bash
npm run start:dev
```

Open the app in your browser.
```bash
http://localhost:3000/
```

# File structure
```bash
.
├── index.html
├── LICENSE.md
├── package.json
├── postcss.config.js
├── public
│   └── assets
│       ├── favicon
│       │   ├── apple-touch-icon-114x114.png
│       │   ├── apple-touch-icon-120x120.png
│       │   ├── apple-touch-icon-144x144.png
│       │   ├── apple-touch-icon-152x152.png
│       │   ├── apple-touch-icon-57x57.png
│       │   ├── apple-touch-icon-60x60.png
│       │   ├── apple-touch-icon-72x72.png
│       │   ├── apple-touch-icon-76x76.png
│       │   ├── brand.svg
│       │   ├── favicon-128.png
│       │   ├── favicon-16x16.png
│       │   ├── favicon-196x196.png
│       │   ├── favicon-32x32.png
│       │   ├── favicon-96x96.png
│       │   ├── favicon.ico
│       │   ├── mstile-144x144.png
│       │   ├── mstile-150x150.png
│       │   ├── mstile-310x150.png
│       │   ├── mstile-310x310.png
│       │   └── mstile-70x70.png
│       └── img
│           └── rooms
│               ├── pexels-photo-1428348.jpeg
│               ├── pexels-photo-14715846.jpeg
│               ├── pexels-photo-280239.jpeg
│               ├── pexels-photo-3946663.jpeg
│               ├── pexels-photo-5178080.jpeg
│               ├── pexels-photo-6510974.jpeg
│               ├── pexels-photo-7195857.jpeg
│               └── pexels-photo-7195864.jpeg
├── README.md
├── src
│   ├── api
│   │   ├── index.ts
│   │   └── listing.ts
│   ├── App.tsx
│   ├── components
│   │   ├── BlankCard
│   │   │   ├── BlankCard.styled.tsx
│   │   │   ├── BlankCard.tsx
│   │   │   └── index.ts
│   │   ├── Forms
│   │   │   ├── FilterForm
│   │   │   │   ├── FilterForm.styled.tsx
│   │   │   │   ├── FilterForm.tsx
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   └── LanguageForm
│   │   │       ├── index.ts
│   │   │       ├── LanguageForm.styled.tsx
│   │   │       └── LanguageForm.tsx
│   │   ├── GoogleMap
│   │   │   ├── Card
│   │   │   │   ├── Card.styled.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Carousel
│   │   │   │   ├── CarouselControls.tsx
│   │   │   │   ├── Carousel.styled.tsx
│   │   │   │   ├── Carousel.tsx
│   │   │   │   └── index.ts
│   │   │   ├── GoogleMap.tsx
│   │   │   ├── index.ts
│   │   │   ├── MapView
│   │   │   │   ├── index.ts
│   │   │   │   ├── MapView.styled.tsx
│   │   │   │   ├── MapView.tsx
│   │   │   │   └── useDeepCompareEffectForMaps.ts
│   │   │   ├── Marker
│   │   │   │   ├── index.ts
│   │   │   │   ├── Marker.styled.tsx
│   │   │   │   └── Marker.tsx
│   │   │   └── OverlayView
│   │   │       ├── index.ts
│   │   │       ├── Overlay.ts
│   │   │       └── OverlayView.tsx
│   │   ├── index.ts
│   │   ├── InfoCard
│   │   │   ├── index.ts
│   │   │   ├── InfoCard.styled.tsx
│   │   │   └── InfoCard.tsx
│   │   ├── Layout
│   │   │   ├── Header
│   │   │   │   ├── Header.tsx
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   └── Layout.tsx
│   │   ├── Modal
│   │   │   ├── index.ts
│   │   │   ├── Modal.controller.ts
│   │   │   ├── Modal.styled.tsx
│   │   │   └── Modal.tsx
│   │   ├── Pagination
│   │   │   ├── index.ts
│   │   │   ├── Pagination.styled.tsx
│   │   │   └── Pagination.tsx
│   │   └── SearchLocation
│   │       ├── index.ts
│   │       ├── InputWithIcon.tsx
│   │       ├── SearchLocation.styled.tsx
│   │       ├── SearchLocation.tsx
│   │       └── Suggestions.tsx
│   ├── config.ts
│   ├── locales
│   │   ├── index.ts
│   │   └── lang
│   │       ├── en
│   │       │   └── US.json
│   │       ├── es
│   │       │   └── ES.json
│   │       └── fr
│   │           └── CA.json
│   ├── main.tsx
│   ├── mocks
│   │   ├── database.json
│   │   └── index.ts
│   ├── screens
│   │   ├── index.ts
│   │   └── Search
│   │       ├── index.ts
│   │       ├── Search.controller.ts
│   │       └── Search.tsx
│   ├── store
│   │   ├── actions
│   │   │   ├── claim.actions.ts
│   │   │   ├── index.ts
│   │   │   └── locale.actions.ts
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   └── useLogger.ts
│   │   ├── index.tsx
│   │   ├── reducers
│   │   │   ├── claim.reducer.ts
│   │   │   ├── index.ts
│   │   │   └── locale.reducer.ts
│   │   ├── states
│   │   │   ├── claim.state.ts
│   │   │   ├── index.ts
│   │   │   └── locale.state.ts
│   │   └── types
│   │       └── index.ts
│   ├── styles
│   │   └── index.css
│   ├── utils
│   │   ├── formatMessage.tsx
│   │   ├── hocs
│   │   │   ├── index.ts
│   │   │   ├── withErrorHandling.tsx
│   │   │   └── withGoogleMapServices.tsx
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   └── useAccomodationFilters.jsx
│   │   └── index.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

