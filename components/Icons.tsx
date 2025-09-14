import React from 'react';

// Fix: Updated IconProps to extend React.SVGProps<SVGSVGElement> to allow standard SVG attributes
// like 'style'. This resolves TypeScript errors when passing style objects to icon components.
type IconProps = React.SVGProps<SVGSVGElement>;

// --- START: OFFICIAL LOGOS AND ICONS BASED ON USER'S DESIGN ---

// The icon for the login screen, as seen in the user's provided image.
// Fix: Updated component to accept and spread all SVG props.
export const PetFlowLoginLogo: React.FC<IconProps> = (props) => (
    <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="24" fill="#3B82F6"/>
        <circle cx="40" cy="24" r="7" fill="#F97316"/>
    </svg>
);

// The main logo for the sidebar
// Fix: Updated component to accept and spread all SVG props.
export const PetFlowLogoFull: React.FC<IconProps> = (props) => (
    <svg {...props} viewBox="0 0 207 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.9 23.33c0 0-5.97-11.2-18.4-11.2C11.06 12.13 2 23.33 2 23.33s8.33 10.38 21.5 10.38c13.16 0 18.4-10.38 18.4-10.38z" stroke="#3B82F6" strokeWidth="3" strokeMiterlimit="10"></path>
        <path d="M23.5 12.13c4.8-4.73 12.83-3.08 15.63 2.08M23.5 12.13c-4.8-4.73-12.83-3.08-15.63 2.08" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"></path>
        <path d="M30.8 27.14c0 0-2.98-2.95-7.3-2.95s-7.3 2.95-7.3 2.95" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"></path>
        <path d="M12.57 38.02C7.8 36.64 5.3 31.02 6.68 26.27" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"></path>
        <path d="M68.53 12.13c0 0-5.97 11.2-18.4 11.2-12.44 0-17.68-11.2-17.68-11.2S40.79 1.75 53.95 1.75c13.17 0 14.58 10.38 14.58 10.38z" stroke="#F97316" strokeWidth="3" strokeMiterlimit="10"></path>
        <path d="M53.95 23.33c4.8 4.73-13.23 6.38-16.03 1.22M53.95 23.33c-4.8 4.73 13.23 6.38 16.03 1.22" stroke="#F97316" strokeWidth="3" strokeLinecap="round"></path>
        <path d="M61.26 16.13c0 0-2.98 2.95-7.3 2.95s-7.3-2.95-7.3-2.95" stroke="#F97316" strokeWidth="2" strokeLinecap="round"></path>
        <path d="M43.02 38.02c4.76-1.38 7.26-6.99 5.88-11.75" stroke="#F97316" strokeWidth="3" strokeLinecap="round"></path>
        <text fill="#3B82F6" xmlSpace="preserve" style={{whiteSpace: 'pre'}} fontFamily="Poppins" fontSize="24" fontWeight="bold"><tspan x="77" y="34.932">Pet</tspan></text>
        <text fill="#F97316" xmlSpace="preserve" style={{whiteSpace: 'pre'}} fontFamily="Poppins" fontSize="24" fontWeight="bold"><tspan x="142" y="34.932">Flow</tspan></text>
    </svg>
);

// The large striped cat from the login screen
// Fix: Updated component to accept and spread all SVG props.
export const StripedCatIcon: React.FC<IconProps> = (props) => (
    <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M83.2,26.4c-2.4-1.9-5.1-3.3-8-4.2c-1.4-0.4-2.9-0.7-4.3-0.9c-2.9-0.4-5.8-0.2-8.6,0.5c-4.3,1.1-8.2,3.3-11.5,6.4 c-2.9,2.7-5.3,6-7,9.6c-2.1,4.5-2.9,9.5-2.3,14.4c0.5,4,2.1,7.9,4.6,11.2c2.4,3.2,5.6,5.7,9.3,7.2c3.2,1.3,6.6,1.8,10,1.4 c5-0.6,9.8-2.8,13.9-6c0.6-0.5,1.2-1,1.8-1.5c1.1-1.1,2.1-2.2,3.1-3.4c2.8-3.4,4.8-7.3,5.8-11.5c1-4,1-8.1,0-12.2 C90.1,46.1,87.3,34.7,83.2,26.4z" fill="#FFC107"></path>
        <path d="M68.8,12.7c-0.1-1.5-0.3-2.9-0.6-4.4c-0.3-1.1-0.8-2.2-1.3-3.3c-0.8-1.5-2-2.8-3.5-3.8c-1.1-0.7-2.3-1.2-3.6-1.5 c-1.5-0.3-3-0.5-4.5-0.5c-2.9,0-5.8,0.6-8.5,1.8c-2.6,1.2-5,2.9-6.9,5c-1.8,2-3.2,4.4-4,7c-1.1,3.4-1.4,7-0.8,10.5 c0.4,2.3,1.3,4.6,2.6,6.6c1.1,1.7,2.5,3.3,4.1,4.6c2,1.6,4.3,2.8,6.7,3.6c3.1,1,6.3,1.2,9.5,0.6c3-0.6,5.9-1.9,8.4-3.8 c0.9-0.7,1.8-1.4,2.6-2.2c0.7-0.7,1.3-1.4,1.9-2.2c1.4-1.8,2.5-3.8,3.3-5.9c0.9-2.3,1.4-4.8,1.5-7.2c0.1-2.9-0.3-5.8-1.2-8.5 C70,16.8,69.5,14.7,68.8,12.7z" fill="#FFA000"></path>
        <path d="M83,26.5c-4.1-8.3-9.9-15.6-17.1-21.2c-0.3-0.2-0.6-0.5-0.9-0.7c-1-0.7-2-1.3-3.1-1.8C59.8,1.9,57.5,1.3,55.1,1 c-2-0.2-4-0.2-6,0.1c-2.9,0.5-5.8,1.5-8.4,3.1c-2.9,1.8-5.4,4.2-7.5,6.9c-2.2,2.9-3.9,6.2-5.1,9.7c-1.3,3.9-1.9,8-1.7,12 c0.2,3.5,1,7,2.5,10.2c1.3,2.9,3.1,5.6,5.3,7.9c2.5,2.6,5.5,4.7,8.8,6c3.4,1.4,7.1,1.9,10.7,1.5c4.7-0.5,9.2-2.4,13.1-5.4 c0.6-0.4,1.1-0.9,1.7-1.4c1.1-0.9,2.2-1.9,3.1-3c2.7-3.1,4.8-6.7,6-10.6c1.1-3.6,1.4-7.4,0.8-11.1c-0.4-2.5-1.2-5-2.4-7.4 C84.3,30.3,83.7,28.4,83,26.5z M71.9,78.2c-3.2,1.3-6.6,1.8-10,1.4c-3.7-0.5-7-2-9.3-4.2c-2.3-2.2-4-5-4.6-8.2 c-0.6-3.2-0.2-6.5,1.2-9.5c1.4-3,3.7-5.5,6.5-7.2c3.2-1.9,6.8-2.8,10.4-2.5c4.1,0.3,8,2,11.1,4.8c2.9,2.6,4.8,6.1,5.6,9.8 c0.7,3.5,0.3,7.1-1.2,10.4C77.4,73,74.9,75.9,71.9,78.2z" fill="#FFA000"></path>
        <path d="M81.2,28.4c-1.3-3-3.1-5.7-5.2-8.1c-2.4-2.7-5.2-4.9-8.3-6.5c-3.1-1.6-6.5-2.5-10-2.5c-3.1,0-6.1,0.7-9,2 c-3.3,1.5-6.3,3.7-8.8,6.5c-2.3,2.6-4.1,5.7-5.3,9.1c-1.1,3.2-1.6,6.6-1.4,10c0.2,3.3,1.1,6.5,2.6,9.5c1.5,2.9,3.5,5.5,5.9,7.6 c2.7,2.3,5.8,4.1,9.2,5.1c3.2,1,6.5,1.2,9.8,0.6c3.6-0.7,7-2.3,9.9-4.5c0.4-0.3,0.9-0.6,1.3-1c0.8-0.6,1.6-1.3,2.3-2 c2.1-2.2,3.7-4.8,4.8-7.6c1.1-2.8,1.7-5.8,1.7-8.8c0-3.3-0.7-6.6-2-9.6C82.5,32.3,82,30.3,81.2,28.4z M66,74.5 c-3,0.6-6,0.4-8.9-0.7c-3-1.1-5.6-3-7.6-5.4c-2-2.4-3.3-5.3-3.8-8.4c-0.5-3.3,0-6.6,1.2-9.7c1.3-3.2,3.3-6,5.9-8.1 c3-2.4,6.5-3.9,10.2-4.3c4.1-0.4,8.2,0.6,11.6,2.8c3.3,2.1,5.8,5.2,7.2,8.8c1.3,3.4,1.5,7.1,0.6,10.7c-0.9,3.5-2.8,6.7-5.4,9.2 C72.2,72.5,69.1,74,66,74.5z" fill="#FFC107"></path>
    </svg>
);

// A striped dog to match the cat
// Fix: Updated component to accept and spread all SVG props.
export const StripedDogIcon: React.FC<IconProps> = (props) => (
    <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M85.4,56.1c-2.2,4.8-5.3,9.1-9.2,12.6c-4.1,3.7-9,6.5-14.3,8.1c-5.2,1.6-10.7,1.9-16.1,0.9 c-5.6-1-11-3.5-15.6-7.2c-4.2-3.4-7.5-7.9-9.8-12.8c-2.4-5.2-3.7-10.9-3.8-16.6c-0.1-5.9,1.1-11.8,3.5-17.2 C23.6,18.5,27,13.8,31.2,10c1.3-1.2,2.7-2.3,4.1-3.3c2.1-1.4,4.4-2.6,6.7-3.5c3-1.1,6.2-1.9,9.4-2.1c3.7-0.2,7.4,0.3,11,1.5 c4.7,1.5,9,4,12.6,7.4c3.4,3.2,6,7.1,7.6,11.4c1.5,4,2.2,8.3,1.9,12.5c-0.3,4.4-1.6,8.7-3.8,12.6C90,52.2,88.1,54.5,85.4,56.1z" fill="#FFC107"></path>
        <path d="M84.3,51.8c-1.1,5.1-3.4,9.9-6.6,14c-3.4,4.2-7.8,7.6-12.8,9.8c-5.1,2.2-10.6,3.2-16.2,2.8 c-5.7-0.4-11.3-2.4-16.2-5.7c-4.5-3-8.2-7.2-10.8-12c-2.7-5-4.2-10.6-4.3-16.3c-0.1-5.8,1.2-11.6,3.8-16.9 C25.1,16,28.8,11.1,33.5,7.3c1.4-1.1,2.9-2.2,4.4-3.1c2.3-1.3,4.7-2.4,7.2-3.2c3.2-1,6.6-1.6,10-1.7c3.9-0.1,7.8,0.6,11.5,1.9 c5,1.7,9.5,4.6,13.2,8.4c3.5,3.6,6.2,8,7.8,12.8c1.5,4.5,2.1,9.2,1.7,13.9c-0.4,4.7-1.8,9.3-4.1,13.5 C90,49.2,87.6,50.8,84.3,51.8z" fill="#FFA000"></path>
        <path d="M83.2,47.5c-0.2,5.3-1.7,10.5-4.4,15.2c-2.8,4.9-6.8,9.1-11.5,12.2c-4.9,3.2-10.4,5.2-16.2,5.8 c-5.9,0.6-11.9-0.3-17.3-2.5c-5-2.1-9.3-5.4-12.7-9.6c-3.5-4.4-5.9-9.7-7-15.3c-1.1-5.8-0.9-11.8,0.7-17.5 c1.5-5.5,4.3-10.6,8.1-14.8c1.1-1.2,2.3-2.3,3.5-3.3c2.4-1.9,5-3.5,7.7-4.8c3.5-1.6,7.2-2.7,11-3c4.2-0.3,8.5,0.2,12.5,1.5 c5.4,1.8,10.2,4.9,14.1,8.9c3.7,3.8,6.4,8.5,7.9,13.5c1.4,4.8,1.6,9.8,0.7,14.7C90.2,44.2,87.1,46.2,83.2,47.5z M74,18 c-3.2-3.4-7.2-5.9-11.6-7.2c-4.4-1.4-9.1-1.6-13.6-0.7c-4.7,1-9.1,3.2-12.8,6.4c-3.8,3.3-6.8,7.5-8.7,12.2c-1.9,4.8-2.7,10-2.2,15.2 c0.5,5,2.3,9.8,5.1,14c2.8,4.2,6.6,7.5,11,9.8c4.6,2.3,9.6,3.5,14.8,3.4c5.3-0.1,10.5-1.5,15.1-4.2c4.8-2.7,8.8-6.6,11.8-11.3 c2.9-4.5,4.6-9.7,5.1-15c0.4-5.1-0.4-10.3-2.3-15.1C79.8,22.8,77.2,20.4,74,18z" fill="#FFA000"></path>
        <path d="M82.1,43.2c-1.1,5.3-3.6,10.3-7.1,14.5c-3.7,4.3-8.4,7.7-13.7,9.8c-5.4,2.1-11.2,2.8-16.9,1.9 c-5.8-0.9-11.4-3.4-16.1-7.1c-4.3-3.4-7.7-7.9-9.9-12.9c-2.3-5.2-3.4-10.9-3.2-16.6c0.2-5.9,1.8-11.7,4.6-16.9 C23,10.8,26.8,6,31.5,2.3c1.4-1.1,2.9-2.1,4.4-3c2.5-1.4,5.2-2.5,7.9-3.3c3.4-1,7-1.5,10.7-1.5c4.1,0,8.2,0.8,12.1,2.4 c5.2,2.1,9.8,5.4,13.5,9.6c3.5,4,6.1,8.9,7.4,14.2c1.2,5,1.2,10.2-0.1,15.2c-0.8,3-2,5.8-3.5,8.5C89.1,40.2,85.9,42,82.1,43.2z M72.9,13.8 c-3.6-3.6-8-6.2-12.8-7.6c-4.8-1.4-9.9-1.5-14.8-0.3c-5.1,1.2-9.7,3.8-13.6,7.4c-4,3.7-7.1,8.4-8.9,13.6c-1.8,5.2-2.3,10.9-1.4,16.4 c0.9,5.5,3.2,10.7,6.7,15c3.5,4.3,8.1,7.6,13.2,9.6c5.3,2,11,2.6,16.6,1.7c5.8-0.9,11.2-3.5,15.9-7.3c4.6-3.8,8.2-8.7,10.5-14.2 c2.3-5.5,3.2-11.4,2.7-17.3c-0.6-5.8-2.6-11.3-5.9-16.1C80.2,18.8,76.7,15.9,72.9,13.8z" fill="#FFC107"></path>
    </svg>
);

// --- END: OFFICIAL LOGOS AND ICONS ---


// Fix: Updated component to accept and spread all SVG props.
export const SunIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const MoonIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const FoodBowlIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 12.5C2 12.5 5 10 12 10C19 10 22 12.5 22 12.5V14C22 15.1046 21.1046 16 20 16H4C2.89543 16 2 15.1046 2 14V12.5Z"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 6L8 4"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6L12 4"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 6L16 4"/>
  </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const ClockIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const NextFeedIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
  </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const DispenseIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 15c0 3.9 3.1 7 7 7s7-3.1 7-7" />
    <path d="M17 15s-1-2-5-2-5 2-5 2" />
    <path d="M12 22V10" />
    <path d="M12 5L15 2H9L12 5z" />
  </svg>
);

// Fix: Updated component to accept and spread all SVG props, while preserving the base animation class.
export const LoadingSpinner: React.FC<IconProps> = ({ className, ...rest }) => (
  <svg className={`animate-spin ${className || ''}`} {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const ScheduleIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const HistoryIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m-6-3a9 9 0 1118 0 9 9 0 01-18 0z" />
  </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const ManualFeedIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const ScheduledFeedIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const WandIcon: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0Z" />
    <path d="M4 4h.01M20 4h.01M4 20h.01M20 20h.01" />
  </svg>
);

// Sidebar Icons
// Fix: Updated component to accept and spread all SVG props.
export const HomeIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const CalendarIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const UserGroupIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const CubeIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const ChartBarIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
);

// Fix: Updated component to accept and spread all SVG props.
export const LogoutIcon: React.FC<IconProps> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);
