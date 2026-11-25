export interface ProjectGalleryItem {
  src: string;
  title: string;
  badge: string;
  description: string;
}

export interface ProjectCaseStudy {
  headline: string;
  overview: string;
  theProblem: string;
  theStrategy: string;
  theDecisions: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  liveUrl: string;
  heroImage: string;
  isMobile?: boolean;
  description: string;
  tags: string[];
  caseStudy: ProjectCaseStudy;
  gallery: ProjectGalleryItem[];
}

export const projects: Project[] = [
  {
    id: "smartworker",
    title: "SmartWorker",
    category: "Unified SaaS Workforce & Field Operations",
    client: "SmartWorker Inc.",
    liveUrl: "https://www.smartworker.app/",
    heroImage: "/images/projects/smartworker/hero.webp",
    isMobile: true,
    description:
      "A cohesive SaaS platform uniting mobile attendance clock-in, shift management, live fleet tracking, automated ticketing, and field maintenance dispatch into one command system.",
    tags: ["Mobile App", "SaaS Platform", "Field Operations", "Real-Time Tracking", "Cloud Backend"],
    caseStudy: {
      headline: "One App. Entire Workforce. Unified SaaS Command.",
      overview:
        "SmartWorker resolves the fragmentation of enterprise field operations by consolidating shift scheduling, geofenced clock-in, technician work orders, and internal helpdesk workflows into a single high-velocity mobile-first ecosystem.",
      theProblem:
        "Modern field-service enterprises were juggling disconnected tools: manual spreadsheets for shift swaps, third-party apps for attendance, and sluggish desktop portals for dispatching work orders. The result was communication delays, payroll discrepancies, and lack of real-time visibility into active job sites.",
      theStrategy:
        "Designed an intuitive, task-oriented mobile architecture with instant offline-tolerant caching, automatic GPS verification, and frictionless peer-to-peer shift swaps governed by multi-tier manager approval flows.",
      theDecisions:
        "Built with a reactive component system enabling optimistic UI updates, integrated role-based security guards for technician assignments, and implemented cryptographic timestamp verification for automated wage compliance."
    },
    gallery: [
      {
        src: "/images/projects/smartworker/attendance-report.webp",
        title: "Attendance & Pay Period Reports",
        badge: "Workforce Analytics",
        description:
          "Automated timesheets with granular daily breakdown: hours worked, mandatory rest breaks, status indicators, and one-click pay period audits."
      },
      {
        src: "/images/projects/smartworker/task-management.webp",
        title: "Maintenance Work Orders & Dispatch",
        badge: "Operations",
        description:
          "End-to-end work order tracking (#5860) featuring planned dates, technician assignments, status lifecycle (In Progress, Approved, Done), and metadata auditing."
      },
      {
        src: "/images/projects/smartworker/technician-assignment.webp",
        title: "Technician Assignment & Security Guards",
        badge: "Security & Permissions",
        description:
          "Intuitive swipe-to-assign technician cards backed by stringent authorization rules to prevent unauthorized task reassignment across teams."
      },
      {
        src: "/images/projects/smartworker/helpdesk-ticketing.webp",
        title: "Enterprise Helpdesk & SLA Engine",
        badge: "Helpdesk SaaS",
        description:
          "Multi-team support ticket queue (Inventory, ERP, Infrastructure) with SLA status, priority tags, and automated assignee routing."
      },
      {
        src: "/images/projects/smartworker/shift-swap.webp",
        title: "Peer-to-Peer Shift Swap Flow",
        badge: "Scheduling",
        description:
          "Frictionless shift trade engine allowing team members to select shifts, find available coworkers, and submit requests for manager sign-off."
      },
      {
        src: "/images/projects/smartworker/leave-requests.webp",
        title: "Time Off Requests & Leave Calendar",
        badge: "HR & Compliance",
        description:
          "Interactive monthly calendar view displaying pending, approved, and refused leave days with automated balance deduction."
      }
    ]
  },
  {
    id: "almatar",
    title: "ALMATAR",
    category: "Oilfield & Energy Engineering Infrastructure",
    client: "ALMATAR Energy Group",
    liveUrl: "https://www.almatar-oil.com/",
    heroImage: "/images/projects/almatar/hero.webp",
    isMobile: false,
    description:
      "Corporate digital ecosystem and governance portal for an international oilfield services leader, showcasing comprehensive upstream solutions, heavy drilling assets, and QHSE compliance.",
    tags: ["Enterprise Web", "Oil & Gas", "QHSE Compliance", "Corporate Governance", "B2B Infrastructure"],
    caseStudy: {
      headline: "Excellence in Oilfield & Energy Engineering.",
      overview:
        "ALMATAR Energy & Oilfield Services required a high-trust digital presence reflecting their multinational scale, technical depth, and strict adherence to international safety, environmental, and corporate governance standards.",
      theProblem:
        "International energy conglomerates and state operators require absolute transparency regarding safety protocols, fleet readiness, and leadership accountability before issuing multi-million dollar drilling contracts.",
      theStrategy:
        "Created an authoritative, bilingual (English & Arabic) enterprise web architecture featuring a 10-point interactive policy framework, a transparent executive leadership registry, and detailed capabilities indexing.",
      theDecisions:
        "Engineered for sub-second delivery over low-bandwidth remote desert connections using static edge compilation, accessible typography, and structured QHSE document repositories."
    },
    gallery: [
      {
        src: "/images/projects/almatar/policies-qhse.webp",
        title: "Corporate Policies & QHSE Compliance",
        badge: "Governance",
        description:
          "Interactive 10-point compliance directory covering Quality, Health, Safety & Environment (QHSE), anti-bribery, site safety, and crisis management."
      },
      {
        src: "/images/projects/almatar/board-management.webp",
        title: "Executive Board & Management Registry",
        badge: "Corporate Leadership",
        description:
          "Transparent governance directory detailing the Board of Directors, CEO, and operational heads with verified credentials."
      },
      {
        src: "/images/projects/almatar/services-overview.webp",
        title: "Integrated Energy Services Catalog",
        badge: "Engineering",
        description:
          "Comprehensive overview of upstream drilling, well intervention, geological testing, and oilfield equipment maintenance."
      },
      {
        src: "/images/projects/almatar/drilling-infrastructure.webp",
        title: "Heavy Drilling Infrastructure & Rig Assets",
        badge: "Assets & Rigs",
        description:
          "High-capacity drilling rigs, hydraulic workover units, and technical field infrastructure ready for immediate global deployment."
      },
      {
        src: "/images/projects/almatar/contact-portal.webp",
        title: "Global Inquiries & Commercial Procurement",
        badge: "B2B Procurement",
        description:
          "Direct procurement and RFQ gateway with encrypted routing to regional engineering headquarters and commercial teams."
      }
    ]
  },
  {
    id: "ntdh",
    title: "NTDH Services",
    category: "National Technical Drilling & Hydro Engineering",
    client: "NTDH Corporation",
    liveUrl: "https://ntdhservices.com/",
    heroImage: "/images/projects/ntdh/hero.webp",
    isMobile: false,
    description:
      "A high-impact engineering portal showcasing 20+ years of deep water well drilling, hydrogeological surveys, heavy machinery fleets, and turnkey civil infrastructure projects.",
    tags: ["Industrial Engineering", "Geotechnical", "Hydro Systems", "Fleet Telemetry", "B2B Portal"],
    caseStudy: {
      headline: "From Depths to Development. Reliable Hydro Engineering.",
      overview:
        "NTDH (National Technical Drilling & Hydro) provides vital water infrastructure and geotechnical drilling services across arid regions, executing deep wells and industrial water networks.",
      theProblem:
        "Municipal water authorities and agricultural enterprises needed clear proof of technical capability, equipment capacity, and geological reliability before commissioning critical water well projects.",
      theStrategy:
        "Developed a metric-centric design spotlighting +20 years of experience, +300 completed projects, and +150 executed wells, supported by interactive equipment catalogs and fast quote generators.",
      theDecisions:
        "Implemented high-contrast visual hierarchies, mobile-responsive specification cards for field engineers, and direct RFQ request pathways that capture precise depth and soil parameters."
    },
    gallery: [
      {
        src: "/images/projects/ntdh/services-catalog.webp",
        title: "Integrated Engineering & Hydro Solutions",
        badge: "Capabilities",
        description:
          "Deep water well drilling, municipal water networks, building renovation, and turnkey civil engineering logistics."
      },
      {
        src: "/images/projects/ntdh/heavy-machinery.webp",
        title: "Advanced Drilling Rigs & Heavy Machinery",
        badge: "Fleet Assets",
        description:
          "Fleet of over 120 heavy machinery units, mobile crawler rigs, mud pumps, and certified API spare parts inventory."
      },
      {
        src: "/images/projects/ntdh/project-locations.webp",
        title: "Geological Surveys & Executed Wellfields",
        badge: "Case History",
        description:
          "Geospatial showcase of successfully delivered deep aquifers, commercial farms, and municipal water supply systems."
      },
      {
        src: "/images/projects/ntdh/quote-portal.webp",
        title: "Online RFQ & Engineering Quote Portal",
        badge: "Commercial Inquiry",
        description:
          "Streamlined technical request builder allowing clients to define required well depth, casing specs, and site coordinates."
      }
    ]
  },
  {
    id: "barbershop",
    title: "B.Royals Barbershop",
    category: "Luxury Grooming & Multi-Location Salon Platform",
    client: "B.Royals Group GmbH",
    liveUrl: "https://www.broyals.de/",
    heroImage: "/images/projects/barbershop/hero.webp",
    isMobile: false,
    description:
      "An opulent digital experience for Germany's premier five-location barbershop chain, celebrating master craftsmanship, walk-in convenience, and royal grooming standards.",
    tags: ["Luxury Branding", "Multi-Location", "E-Commerce", "Appointment-Free", "Motion Design"],
    caseStudy: {
      headline: "Präzision. Stil. Handwerk. Königliches Barbiererlebnis.",
      overview:
        "B.Royals has redefined modern men's grooming in Germany across five premier branches with an appointment-free philosophy, delivering master haircuts, traditional hot-towel shaves, and signature beard styling.",
      theProblem:
        "Most salon websites are cluttered booking calendars that detract from the tactile, luxurious craft of the barber experience, creating barriers for spontaneous walk-in guests.",
      theStrategy:
        "Crafted a rich, immersive dark-and-gold visual identity highlighting founder Benjamin Mustafi's philosophy, transparent service pricing, instant location navigation, and salon retail products.",
      theDecisions:
        "Prioritized zero-friction branch locators with instant opening hours and real-time walk-in indicators, paired with cinematic video ambient tours and seamless e-commerce product links."
    },
    gallery: [
      {
        src: "/images/projects/barbershop/founder-story.webp",
        title: "Founder & Master Barber Benjamin Mustafi",
        badge: "Craftsmanship",
        description:
          "Inhaber & Gründer storytelling highlighting traditional scissor techniques, royal hospitality, and five flourishing salon branches."
      },
      {
        src: "/images/projects/barbershop/services-menu.webp",
        title: "Bespoke Grooming & Cut Menu",
        badge: "Services & Pricing",
        description:
          "Comprehensive price list for master skin fades, beard trimming & hot-towel contouring, hair treatments, and VIP grooming packages."
      },
      {
        src: "/images/projects/barbershop/salon-locations.webp",
        title: "Five Branches — Appointment-Free Walk-In",
        badge: "Branch Locator",
        description:
          "Interactive branch selector providing real-time location addresses, directions, parking info, and operating hours."
      },
      {
        src: "/images/projects/barbershop/grooming-products.webp",
        title: "B.Royals Exclusive Care Products",
        badge: "Salon Cosmetics",
        description:
          "Curated line of salon-grade styling pomades, nourishing beard oils, and scalp elixirs crafted for daily gentleman care."
      },
      {
        src: "/images/projects/barbershop/salon-ambiance.webp",
        title: "Cinematic Salon Ambiance & Architecture",
        badge: "Atmosphere",
        description:
          "Visual tour of custom gold-accented leather chairs, marble washing stations, and premium acoustic lounge environments."
      }
    ]
  },
  {
    id: "fischlevy",
    title: "Fisch Levy Frankfurt",
    category: "Artisanal Seafood Culinary Experience & Story",
    client: "Fisch Levy GmbH",
    liveUrl: "https://fischlevy.de/",
    heroImage: "/images/projects/fischlevy/hero.webp",
    isMobile: false,
    description:
      "A mouthwatering, heritage-rich digital presence for Frankfurt's legendary fish & chips institution, showcasing three generations of culinary passion and fresh North Sea delicacies.",
    tags: ["Food & Beverage", "Interactive Storytelling", "Brand Heritage", "Frankfurt Culinary", "Digital Menu"],
    caseStudy: {
      headline: "Fish is Our Passion. Fresh North Sea Delights in Frankfurt.",
      overview:
        "From its historic origins at the Barbarossa Market in 2008 to the modern Hauptwache B-Level hub and upcoming Central Station presence, Fisch Levy is Frankfurt's reference point for artisanal fish & chips and homemade sauces.",
      theProblem:
        "Fast-casual food websites often feel sterile, failing to communicate generational quality, organic ingredient sourcing, and the vibrant street-food joy that turns commuters into loyal regulars.",
      theStrategy:
        "Designed an interactive visual feast: deconstructed artisanal salmon burger animations, a whimsical illustrated boat food truck, and a milestone timeline chronicling decades of family recipes.",
      theDecisions:
        "Combined lightweight micro-interactions that explode burger ingredients on scroll, clean bilingual menu toggles, and instant Google Maps directions for Frankfurt Hauptwache transit travelers."
    },
    gallery: [
      {
        src: "/images/projects/fischlevy/food-truck-heritage.webp",
        title: "Illustrated Boat Food Truck & Heritage Timeline",
        badge: "Brand Story",
        description:
          "Three generations of passion illustrated from Barbarossa Market (2008) to Frankfurt Hauptwache (2024) and Frankfurt Central Station (2026)."
      },
      {
        src: "/images/projects/fischlevy/speisekarte-showcase.webp",
        title: "Fresh Catch Fish Burger & Speisekarte",
        badge: "Culinary Highlights",
        description:
          "Crispy backfisch, fresh fish fillets, calamari, and artisanal rolls prepared daily from sustainable sea harvests."
      },
      {
        src: "/images/projects/fischlevy/menu-specialties.webp",
        title: "Signature Fish & Chips & Homemade Sauces",
        badge: "Menu Classics",
        description:
          "Crisp golden batter, authentic British-style chips, homemade remoulade, tartar sauce, and pickled garnishes."
      },
      {
        src: "/images/projects/fischlevy/fresh-counter.webp",
        title: "Daily Fresh Counter & Quality Guarantee",
        badge: "Freshness Standards",
        description:
          "30+ daily varieties delivered straight from coastal fish auctions, prepared without artificial additives or preservatives."
      },
      {
        src: "/images/projects/fischlevy/frankfurt-location.webp",
        title: "Hauptwache Station Hub & Opening Hours",
        badge: "Visit & Contact",
        description:
          "Prime downtown Frankfurt location (B-Level Hauptwache) open Monday to Saturday from 11:00 to 20:00 with express takeaway."
      }
    ]
  },
  {
    id: "sevpark",
    title: "SevPark",
    category: "Smart AI Parking Enforcement & Management",
    client: "SevPark Deutschland GmbH",
    liveUrl: "https://sevpark.de/",
    heroImage: "/images/projects/sevpark/hero.webp",
    isMobile: false,
    description:
      "An intelligent, barrier-free parking management platform leveraging automated ANPR cameras, legally compliant signage, and digital enforcement for retail, commercial, and residential real estate.",
    tags: ["Smart Cities", "AI Computer Vision", "ANPR Telemetry", "Parking Automation", "IoT Security"],
    caseStudy: {
      headline: "Ordnung, die sich auszahlt. Intelligent Parking Management.",
      overview:
        "SevPark revolutionizes parking lot supervision across Germany with automated License Plate Recognition (ANPR/ALPR), freeing property owners from barrier breakdowns, lost revenue, and unauthorized long-term parkers.",
      theProblem:
        "Supermarkets, medical centers, and residential complexes suffered from parking abuse by non-customers. Traditional barrier gates were expensive to install, broke down frequently, and created traffic congestion.",
      theStrategy:
        "Positioned SevPark as a complete turnkey zero-investment solution: free camera installation, automated grace-period management for legitimate shoppers, and fully automated legal enforcement.",
      theDecisions:
        "Engineered an interactive parking analysis calculator for commercial real estate executives, transparent GDPR privacy compliance documentation, and multi-sector use cases (Retail, Healthcare, Residential)."
    },
    gallery: [
      {
        src: "/images/projects/sevpark/contact-portal.webp",
        title: "Site Evaluation & Analysis Inquiry Portal",
        badge: "Onboarding",
        description:
          "Streamlined commercial onboarding allowing facility managers in Erlensee and nationwide to request free parking lot feasibility analyses."
      },
      {
        src: "/images/projects/sevpark/anpr-technology.webp",
        title: "High-Precision ANPR Camera Telemetry",
        badge: "Computer Vision",
        description:
          "99.8% precision automated license plate capture upon vehicle entry and exit with zero barrier gates and zero traffic bottlenecks."
      },
      {
        src: "/images/projects/sevpark/enforcement-dashboard.webp",
        title: "Automated Violation Processing Dashboard",
        badge: "Cloud Management",
        description:
          "Real-time lot occupancy tracking, automated violation generation after grace period expiration, and legal compliance workflows."
      },
      {
        src: "/images/projects/sevpark/retail-solutions.webp",
        title: "Tailored Retail & Supermarket Solutions",
        badge: "Industry Solutions",
        description:
          "Customizable parking durations (e.g. 90 minutes free for shoppers) ensuring customer spaces remain free of commuter abuse."
      },
      {
        src: "/images/projects/sevpark/security-compliance.webp",
        title: "GDPR Compliance & Certified Signage",
        badge: "Legal Security",
        description:
          "Weather-resistant, court-tested legal warning signage and strict privacy-compliant data erasure protocols."
      }
    ]
  },
  {
    id: "taverne-kostas",
    title: "Taverne Kostas",
    category: "Full-Stack Gastronomy OS, Floor Plan & Live POS",
    client: "Taverne Kostas Freigericht",
    liveUrl: "https://youtu.be/4dzbj_yuDyo?si=gCCJU5zhCoT4htQ5",
    heroImage: "/images/projects/taverne-kostas/hero.webp",
    isMobile: false,
    description:
      "A complete hospitality operating system uniting a responsive public Speisekarte, bird's-eye architectural floor plan reservations with digital QR table passes, live waiter POS terminals, and real-time kitchen displays (KDS).",
    tags: [
      "Hospitality SaaS",
      "Real-Time POS",
      "Kitchen Display (KDS)",
      "Interactive Floor Plan",
      "Digital QR Pass",
      "Enterprise RBAC"
    ],
    caseStudy: {
      headline: "Authentic Greek Gastronomy Meets Real-Time Restaurant Operations.",
      overview:
        "Taverne Kostas in Freigericht-Somborn required a modern, end-to-end digital ecosystem to replace fragmented third-party booking platforms, paper kitchen chits, and static PDF menus with a unified hospitality platform.",
      theProblem:
        "Traditional gastronomy businesses lose revenue to third-party booking commissions, suffer table misallocation during rush hours, and experience order bottlenecks when waiters carry handwritten tickets between dining rooms and the kitchen.",
      theStrategy:
        "Designed an integrated dual-facing architecture: an appetizing public portal with dynamic Speisekarte filtering and interactive 2D floor plan table booking, paired with real-time staff tools including high-speed waiter ordering and an audio-equipped Kitchen Display System (KDS).",
      theDecisions:
        "Engineered real-time order dispatch via reactive websockets, instant digital table pass generation with scannable QR authentication, dynamic branded PDF menu compilation, and a 5-tier role-based access control (RBAC) matrix for owners, managers, service staff, and kitchen personnel."
    },
    gallery: [
      {
        src: "/images/projects/taverne-kostas/speisekarte-catalog.webp",
        title: "Dynamic Categorized Speisekarte & 1-Click PDF",
        badge: "Digital Menu",
        description:
          "Interactive menu filtering across 10 Greek culinary categories with real-time pricing, dish photography, allergen indicators, and one-click branded PDF downloads."
      },
      {
        src: "/images/projects/taverne-kostas/floorplan-reservation.webp",
        title: "Architectural Bird's-Eye Floor Plan Seating",
        badge: "Table Reservation",
        description:
          "Interactive visual seating floor plan mapping the Erdgeschoss (11 tables, 56 seats) and Keller Gewölbesaal (17 tables, 85 seats), enabling guests to choose their exact preferred table."
      },
      {
        src: "/images/projects/taverne-kostas/digital-table-pass.webp",
        title: "Instant Digital Table Pass & Contactless QR",
        badge: "QR Check-In",
        description:
          "Instant booking confirmation generating a digital table pass complete with unique scannable QR code for frictionless, contactless guest check-in upon arrival."
      },
      {
        src: "/images/projects/taverne-kostas/waiter-pos-terminal.webp",
        title: "High-Speed Waiter POS Terminal",
        badge: "Live POS",
        description:
          "Mobile waiter interface with visual table status, quick-tap menu ordering, automatic bill calculation, and instant kitchen ticket dispatch."
      },
      {
        src: "/images/projects/taverne-kostas/kitchen-display-system.webp",
        title: "Real-Time Kitchen Display System (KDS)",
        badge: "Kitchen Ops",
        description:
          "Dedicated KDS screen featuring audio chimes for new tickets, preparation timers, status workflows (Waiting, In Prep, Ready), and bump-bar order completion."
      },
      {
        src: "/images/projects/taverne-kostas/admin-menu-management.webp",
        title: "Live Menu & Pricing Management Suite",
        badge: "Admin Suite",
        description:
          "Centralized management portal allowing staff to adjust dish prices in real time, toggle dietary & allergen tags, mark items sold out, and reorder menu categories."
      },
      {
        src: "/images/projects/taverne-kostas/events-management.webp",
        title: "Cultural Events & Bouzouki Nights Portal",
        badge: "Event Marketing",
        description:
          "Event scheduling dashboard promoting upcoming Greek live music nights with Bouzouki, Mediterranean wine tastings, barbecue feasts, and holiday galas."
      },
      {
        src: "/images/projects/taverne-kostas/rbac-security-matrix.webp",
        title: "Enterprise Role-Based Access Control (RBAC)",
        badge: "Security & Permissions",
        description:
          "Granular 5-tier permission matrix defining screen access and operational privileges across Owner, Manager, Staff, Waiter, and Kitchen roles."
      }
    ]
  }
];
