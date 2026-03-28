import type { SpecSection } from "@/components/site/spec-modal";

export const airSnapSpecs: SpecSection[] = [
  {
    icon: "✈️",
    title: {
      cs: "Letové vlastnosti a konstrukce",
      en: "Flight Properties and Construction",
    },
    items: [
      {
        label: { cs: "Vzletová hmotnost", en: "Take-off weight" },
        value: {
          cs: "249 g (Kategorie C0 – nejmírnější pravidla v EU)",
          en: "249 g (Category C0 – most lenient EU regulations)",
        },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: {
          cs: "34 min (standardní baterie) / 45 min (Plus baterie)",
          en: "34 min (standard battery) / 45 min (Plus battery)",
        },
      },
      {
        label: { cs: "Max. rychlost", en: "Max. speed" },
        value: {
          cs: "16 m/s (57,6 km/h) v režimu Sport",
          en: "16 m/s (57.6 km/h) in Sport mode",
        },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: {
          cs: "do 10,7 m/s (Level 5)",
          en: "up to 10.7 m/s (Level 5)",
        },
      },
      {
        label: { cs: "Provozní teplota", en: "Operating temperature" },
        value: {
          cs: "-10 °C až 40 °C (optimalizováno pro české proměnlivé počasí)",
          en: "-10 °C to 40 °C (optimized for variable Czech weather)",
        },
      },
    ],
  },
  {
    icon: "📷",
    title: { cs: "Kamerový systém", en: "Camera System" },
    items: [
      {
        label: { cs: "Snímač", en: "Sensor" },
        value: {
          cs: '1/1.3" CMOS (vynikající výkon při horším světle)',
          en: '1/1.3" CMOS (excellent low-light performance)',
        },
      },
      {
        label: { cs: "Rozlišení videa", en: "Video resolution" },
        value: {
          cs: "4K při 60 fps / HDR podpora",
          en: "4K at 60 fps / HDR support",
        },
      },
      {
        label: { cs: "Fotografie", en: "Photos" },
        value: {
          cs: "48 MPx (formáty JPEG + RAW pro postprodukci)",
          en: "48 MP (JPEG + RAW formats for post-production)",
        },
      },
      {
        label: { cs: "Stabilizace", en: "Stabilization" },
        value: {
          cs: "3-osý mechanický gimbal",
          en: "3-axis mechanical gimbal",
        },
      },
      {
        label: { cs: "Speciální funkce", en: "Special feature" },
        value: {
          cs: 'Režim "Vertical Snap" (otočení kamery o 90°) pro TikTok/Reels bez ořezu',
          en: '"Vertical Snap" mode (90° camera rotation) for native TikTok/Reels without cropping',
        },
      },
    ],
  },
  {
    icon: "📡",
    title: { cs: "Přenos a bezpečnost", en: "Transmission and Safety" },
    items: [
      {
        label: { cs: "Přenosový systém", en: "Transmission" },
        value: {
          cs: "REGEN Link v2.0 (dosah až 6 km v EU, pásmo 2.4/5.8 GHz)",
          en: "REGEN Link v2.0 (range up to 6 km in EU, 2.4/5.8 GHz)",
        },
      },
      {
        label: { cs: "Detekce překážek", en: "Obstacle detection" },
        value: {
          cs: "Třísměrové vnímání (vpředu, vzadu, dole) – ideální pro začátečníky",
          en: "Three-way sensing (front, rear, bottom) – ideal for beginners",
        },
      },
      {
        label: { cs: "SmartTrack", en: "SmartTrack" },
        value: {
          cs: "Automatické sledování objektu",
          en: "Automatic object tracking",
        },
      },
      {
        label: { cs: "CitySafe", en: "CitySafe" },
        value: {
          cs: "Integrovaná mapa bezletových zón v ČR (národní parky, okolí letišť)",
          en: "Integrated no-fly zone map for CZ (national parks, airport surroundings)",
        },
      },
      {
        label: { cs: "Interní úložiště", en: "Internal storage" },
        value: { cs: "8 GB", en: "8 GB" },
      },
    ],
  },
];

export const travelFlySpecs: SpecSection[] = [
  {
    icon: "🔋",
    title: { cs: "Výkon a vytrvalost", en: "Performance and Endurance" },
    items: [
      {
        label: { cs: "Vzletová hmotnost", en: "Take-off weight" },
        value: {
          cs: "590 g (robustnější konstrukce pro stabilitu)",
          en: "590 g (sturdier build for stability)",
        },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: {
          cs: "48 minut (High-Density Li-ion články)",
          en: "48 minutes (High-Density Li-ion cells)",
        },
      },
      {
        label: { cs: "Max. rychlost", en: "Max. speed" },
        value: { cs: "19 m/s (68,4 km/h)", en: "19 m/s (68.4 km/h)" },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: {
          cs: "do 12 m/s (Level 6 – zvládne nárazy větru na hřebenech hor)",
          en: "up to 12 m/s (Level 6 – handles gusts on mountain ridges)",
        },
      },
      {
        label: { cs: "Skládací mechanismus", en: "Folding mechanism" },
        value: {
          cs: "Quick-Lock systém (složení/rozložení do 5 sekund)",
          en: "Quick-Lock system (fold/unfold in under 5 seconds)",
        },
      },
    ],
  },
  {
    icon: "🎞️",
    title: { cs: "Optika a záznam", en: "Optics and Recording" },
    items: [
      {
        label: { cs: "Snímač", en: "Sensor" },
        value: {
          cs: '1" CMOS (filmový vzhled a čistý obraz v noci)',
          en: '1" CMOS (cinematic look and clean low-light image)',
        },
      },
      {
        label: { cs: "Objektiv", en: "Lens" },
        value: {
          cs: "24 mm, nastavitelná clona f/2.8 – f/11",
          en: "24 mm, adjustable aperture f/2.8 – f/11",
        },
      },
      {
        label: { cs: "Rozlišení videa", en: "Video resolution" },
        value: {
          cs: "5.1K při 50 fps / 4K při 120 fps (ultra zpomalené záběry)",
          en: "5.1K at 50 fps / 4K at 120 fps (ultra slow motion)",
        },
      },
      {
        label: { cs: "Barevné profily", en: "Color profiles" },
        value: {
          cs: "10-bit D-Log M (pro profesionální barvení videa)",
          en: "10-bit D-Log M (for professional color grading)",
        },
      },
      {
        label: { cs: "Zoom", en: "Zoom" },
        value: {
          cs: "3x digitální bezztrátový zoom ve 4K (pro natáčení zvířat v přírodě)",
          en: "3x lossless digital zoom in 4K (for safe wildlife shooting)",
        },
      },
      {
        label: { cs: "Rozlišení foto", en: "Photo resolution" },
        value: {
          cs: "20 MPx (větší pixely pro čistší obraz)",
          en: "20 MP (larger pixels for cleaner image)",
        },
      },
      {
        label: { cs: "Stabilizace", en: "Stabilization" },
        value: { cs: "3-osý mechanický gimbal", en: "3-axis mechanical gimbal" },
      },
    ],
  },
  {
    icon: "🛡️",
    title: {
      cs: "Inteligentní systémy a bezpečnost",
      en: "Intelligent Systems and Safety",
    },
    items: [
      {
        label: { cs: "Detekce překážek", en: "Obstacle detection" },
        value: {
          cs: "Všesměrové vnímání 360° (přední, zadní, boční, horní, spodní)",
          en: "Omnidirectional 360° sensing (front, rear, side, top, bottom)",
        },
      },
      {
        label: { cs: "Přenosový systém", en: "Transmission" },
        value: {
          cs: "REGEN SkyLink v3.0 – 1080p/60fps na vzdálenost až 10 km (v EU)",
          en: "REGEN SkyLink v3.0 – 1080p/60fps up to 10 km range (in EU)",
        },
      },
      {
        label: { cs: "Waypoint Flight 2.0", en: "Waypoint Flight 2.0" },
        value: {
          cs: "Naplánování trasy po bodech – dron letí sám, vy se soustředíte na kameru",
          en: "Plan a point-to-point route – drone flies itself while you focus on the shot",
        },
      },
      {
        label: { cs: "Interní úložiště", en: "Internal storage" },
        value: {
          cs: "32 GB (záloha i bez SD karty)",
          en: "32 GB (backup even without an SD card)",
        },
      },
    ],
  },
];

export const juniorSpecs: SpecSection[] = [
  {
    icon: "✈️",
    title: {
      cs: "Letové vlastnosti a konstrukce",
      en: "Flight Properties and Construction",
    },
    items: [
      {
        label: { cs: "Vzletová hmotnost", en: "Take-off weight" },
        value: {
          cs: "180 g (včetně ochranných rámů, Kategorie C0 – bezpečná hračka)",
          en: "180 g (including protective guards, Category C0 – safe toy)",
        },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: { cs: "18 minut", en: "18 minutes" },
      },
      {
        label: { cs: "Max. rychlost", en: "Max. speed" },
        value: {
          cs: "8 m/s (28,8 km/h) – omezeno pro bezpečnost",
          en: "8 m/s (28.8 km/h) – limited for safety",
        },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: {
          cs: "5 m/s (Level 3 – primárně pro létání v bezvětří)",
          en: "5 m/s (Level 3 – primarily for calm conditions)",
        },
      },
      {
        label: { cs: "Detekce překážek", en: "Obstacle detection" },
        value: {
          cs: "Spodní senzor (stabilní visení v hale nebo ve třídě)",
          en: "Bottom sensor (stable hovering indoors or in classroom)",
        },
      },
    ],
  },
  {
    icon: "📷",
    title: { cs: "Kamerový systém", en: "Camera System" },
    items: [
      {
        label: { cs: "Snímač", en: "Sensor" },
        value: {
          cs: '1/2.3" CMOS (základní čip)',
          en: '1/2.3" CMOS (entry-level sensor)',
        },
      },
      {
        label: { cs: "Rozlišení videa", en: "Video resolution" },
        value: { cs: "1080p Full HD při 30 fps", en: "1080p Full HD at 30 fps" },
      },
      {
        label: { cs: "Rozlišení foto", en: "Photo resolution" },
        value: { cs: "12 MPx", en: "12 MP" },
      },
      {
        label: { cs: "Stabilizace", en: "Stabilization" },
        value: {
          cs: "Elektronická (EIS) + 2-osý gimbal",
          en: "Electronic (EIS) + 2-axis gimbal",
        },
      },
    ],
  },
  {
    icon: "📡",
    title: { cs: "Přenos a vzdělávání", en: "Transmission and Education" },
    items: [
      {
        label: { cs: "Přenosový systém", en: "Transmission" },
        value: {
          cs: "Wi-Fi REGEN Link v1.0 (dosah až 500 m v EU)",
          en: "Wi-Fi REGEN Link v1.0 (range up to 500 m in EU)",
        },
      },
      {
        label: { cs: "Interní úložiště", en: "Internal storage" },
        value: { cs: "4 GB", en: "4 GB" },
      },
      {
        label: { cs: "EduMode", en: "EduMode" },
        value: {
          cs: "Programování letu v Scratch nebo Python – ideální pro školy",
          en: "Flight programming in Scratch or Python – ideal for schools",
        },
      },
    ],
  },
];

export const inspectSpecs: SpecSection[] = [
  {
    icon: "✈️",
    title: {
      cs: "Letové vlastnosti a konstrukce",
      en: "Flight Properties and Construction",
    },
    items: [
      {
        label: { cs: "Vzletová hmotnost", en: "Take-off weight" },
        value: {
          cs: "3 200 g (modulární systém, Kategorie C2 – profesionální provoz)",
          en: "3,200 g (modular system, Category C2 – professional operation)",
        },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: { cs: "42 minut (se zátěží)", en: "42 minutes (under load)" },
      },
      {
        label: { cs: "Max. rychlost", en: "Max. speed" },
        value: { cs: "21 m/s (75,6 km/h)", en: "21 m/s (75.6 km/h)" },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: { cs: "15 m/s (extrémní odolnost)", en: "15 m/s (extreme resistance)" },
      },
      {
        label: { cs: "Krytí", en: "Protection rating" },
        value: {
          cs: "IP55 – odolný proti prachu a tryskající vodě/dešti",
          en: "IP55 – dust-proof and protected against water jets/rain",
        },
      },
    ],
  },
  {
    icon: "📷",
    title: { cs: "Kamerový systém", en: "Camera System" },
    items: [
      {
        label: { cs: "Snímač", en: "Sensor" },
        value: {
          cs: 'Dual-Cam: 4/3" CMOS + termokamera',
          en: 'Dual-Cam: 4/3" CMOS + thermal camera',
        },
      },
      {
        label: { cs: "Rozlišení videa", en: "Video resolution" },
        value: {
          cs: "4K / 60 fps (vizuál) + 640×512 px (termo)",
          en: "4K / 60 fps (visual) + 640×512 px (thermal)",
        },
      },
      {
        label: { cs: "Rozlišení foto", en: "Photo resolution" },
        value: {
          cs: "20 MPx (mechanická závěrka – žádné rozmazání)",
          en: "20 MP (mechanical shutter – no rolling shutter distortion)",
        },
      },
      {
        label: { cs: "Stabilizace", en: "Stabilization" },
        value: {
          cs: "3-osý gimbal s možností naklonění +90° nahoru",
          en: "3-axis gimbal with +90° upward tilt capability",
        },
      },
      {
        label: { cs: "Detekce překážek", en: "Obstacle detection" },
        value: {
          cs: "Všesměrový LiDAR (pracuje i v úplné tmě)",
          en: "Omnidirectional LiDAR (works in complete darkness)",
        },
      },
    ],
  },
  {
    icon: "📡",
    title: { cs: "Přenos a bezpečnost", en: "Transmission and Safety" },
    items: [
      {
        label: { cs: "Přenosový systém", en: "Transmission" },
        value: {
          cs: "REGEN Link v4.0 – šifrovaný přenos, dosah až 12 km (v EU)",
          en: "REGEN Link v4.0 – encrypted transmission, range up to 12 km (in EU)",
        },
      },
      {
        label: { cs: "Interní úložiště", en: "Internal storage" },
        value: { cs: "128 GB (šifrování AES-256)", en: "128 GB (AES-256 encryption)" },
      },
      {
        label: { cs: "RTK Modul", en: "RTK Module" },
        value: {
          cs: "Centimetrová přesnost GPS pro přesná měření a mapování",
          en: "Centimeter-level GPS accuracy for precise surveying and mapping",
        },
      },
    ],
  },
];

export const agroScanSpecs: SpecSection[] = [
  {
    icon: "✈️",
    title: {
      cs: "Letové vlastnosti a konstrukce",
      en: "Flight Properties and Construction",
    },
    items: [
      {
        label: { cs: "Vzletová hmotnost", en: "Take-off weight" },
        value: {
          cs: "1 950 g (lehká karbonová konstrukce, Kategorie C2/C6 dle konfigurace)",
          en: "1,950 g (lightweight carbon frame, Category C2/C6 depending on configuration)",
        },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: {
          cs: "55 minut (extrémní efektivita pro skenování polí)",
          en: "55 minutes (extreme efficiency for field scanning)",
        },
      },
      {
        label: { cs: "Max. rychlost", en: "Max. speed" },
        value: {
          cs: "15 m/s (optimalizováno pro sběr dat)",
          en: "15 m/s (optimized for data collection)",
        },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: { cs: "12 m/s (Level 6)", en: "12 m/s (Level 6)" },
      },
      {
        label: { cs: "Krytí", en: "Protection rating" },
        value: {
          cs: "IPX6 – odolný proti hnojivům a postřikům",
          en: "IPX6 – resistant to fertilizers and spray chemicals",
        },
      },
    ],
  },
  {
    icon: "📷",
    title: { cs: "Kamerový a senzorový systém", en: "Camera and Sensor System" },
    items: [
      {
        label: { cs: "Snímač", en: "Sensor" },
        value: {
          cs: "Multispektrální pole: 4× 5 MPx (G/R/RE/NIR) + 20 MPx RGB",
          en: "Multispectral array: 4× 5 MP (G/R/RE/NIR) + 20 MP RGB",
        },
      },
      {
        label: { cs: "Rozlišení videa", en: "Video resolution" },
        value: {
          cs: "4K / 30 fps (pro běžnou kontrolu pole)",
          en: "4K / 30 fps (for standard field inspection)",
        },
      },
      {
        label: { cs: "Rozlišení foto", en: "Photo resolution" },
        value: {
          cs: "20 MPx (mechanická závěrka pro přesné mapování)",
          en: "20 MP (mechanical shutter for accurate mapping)",
        },
      },
      {
        label: { cs: "Stabilizace", en: "Stabilization" },
        value: {
          cs: "3-osý gimbal s vysokou přesností úhlu",
          en: "3-axis gimbal with high angular precision",
        },
      },
      {
        label: { cs: "Detekce překážek", en: "Obstacle detection" },
        value: {
          cs: "Všesměrový radar (detekuje i dráty vysokého napětí)",
          en: "Omnidirectional radar (detects even high-voltage wires)",
        },
      },
    ],
  },
  {
    icon: "📡",
    title: { cs: "Přenos a analytika", en: "Transmission and Analytics" },
    items: [
      {
        label: { cs: "Přenosový systém", en: "Transmission" },
        value: {
          cs: "Zesílený signál pro členitý terén – dosah až 8 km (v EU)",
          en: "Boosted signal for complex terrain – range up to 8 km (in EU)",
        },
      },
      {
        label: { cs: "Interní úložiště", en: "Internal storage" },
        value: {
          cs: "64 GB (vysokorychlostní zápis multispektrálních dat)",
          en: "64 GB (high-speed write for multispectral data)",
        },
      },
      {
        label: { cs: "NDVI Analýza", en: "NDVI Analysis" },
        value: {
          cs: "Výpočet vegetačního indexu v reálném čase přímo za letu",
          en: "Real-time vegetation index calculation during flight",
        },
      },
      {
        label: { cs: "RTK Mapování", en: "RTK Mapping" },
        value: {
          cs: "Centimetrová přesnost GPS pro tvorbu map a výškových modelů",
          en: "Centimeter-level GPS accuracy for map creation and elevation models",
        },
      },
    ],
  },
];

export const rescueEyeSpecs: SpecSection[] = [
  {
    icon: "✈️",
    title: {
      cs: "Letové vlastnosti a konstrukce",
      en: "Flight Properties and Construction",
    },
    items: [
      {
        label: { cs: "Vzletová hmotnost", en: "Take-off weight" },
        value: {
          cs: "2 100 g (kompaktní, ale výkonný – Kategorie C2, certifikováno pro státní složky)",
          en: "2,100 g (compact yet powerful – Category C2, certified for public safety agencies)",
        },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: {
          cs: "45 minut (včetně aktivní termokamery)",
          en: "45 minutes (including active thermal camera)",
        },
      },
      {
        label: { cs: "Max. rychlost", en: "Max. speed" },
        value: {
          cs: "23 m/s (82,8 km/h) – nejdůležitější je být na místě včas",
          en: "23 m/s (82.8 km/h) – getting there on time is critical",
        },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: {
          cs: "15 m/s (Level 7 – extrémní stabilita)",
          en: "15 m/s (Level 7 – extreme stability)",
        },
      },
      {
        label: { cs: "Krytí", en: "Protection rating" },
        value: {
          cs: "IP55 – sněžení, déšť, mráz až do -20 °C",
          en: "IP55 – snow, rain, frost down to -20 °C",
        },
      },
    ],
  },
  {
    icon: "📷",
    title: { cs: "Kamerový a senzorový systém", en: "Camera and Sensor System" },
    items: [
      {
        label: { cs: "Snímač", en: "Sensor" },
        value: {
          cs: "Triple-Sensor: termokamera + 4K zoom + širokoúhlá kamera",
          en: "Triple-Sensor: thermal + 4K zoom + wide-angle camera",
        },
      },
      {
        label: { cs: "Termovize", en: "Thermal imaging" },
        value: {
          cs: "640 × 512 px / 30 Hz, citlivost ≤ 30 mK (vysoká přesnost)",
          en: "640 × 512 px / 30 Hz, sensitivity ≤ 30 mK (high accuracy)",
        },
      },
      {
        label: { cs: "Optický zoom", en: "Optical zoom" },
        value: {
          cs: "56× hybridní zoom – přečte SPZ z 500 metrů",
          en: "56× hybrid zoom – reads a license plate from 500 metres",
        },
      },
      {
        label: { cs: "Stabilizace", en: "Stabilization" },
        value: {
          cs: "3-osý gimbal se zámkem na cíl (Target Lock)",
          en: "3-axis gimbal with target lock",
        },
      },
      {
        label: { cs: "Detekce překážek", en: "Obstacle detection" },
        value: {
          cs: "Všesměrová + infračervený přísvit pro noční vidění",
          en: "Omnidirectional + infrared illuminator for night vision",
        },
      },
    ],
  },
  {
    icon: "📡",
    title: { cs: "Přenos a speciální vybavení", en: "Transmission and Special Equipment" },
    items: [
      {
        label: { cs: "Přenosový systém", en: "Transmission" },
        value: {
          cs: "REGEN Link v4.5 – prioritní signál, dosah až 15 km (v EU)",
          en: "REGEN Link v4.5 – priority signal, range up to 15 km (in EU)",
        },
      },
      {
        label: { cs: "Interní úložiště", en: "Internal storage" },
        value: {
          cs: "128 GB (šifrování dat pro Policii a IZS)",
          en: "128 GB (encrypted storage for Police and emergency services)",
        },
      },
      {
        label: { cs: "Loudspeaker", en: "Loudspeaker" },
        value: {
          cs: "Integrovaný reproduktor pro komunikaci s osobami na místě",
          en: "Integrated speaker for on-site communication",
        },
      },
      {
        label: { cs: "Beacon", en: "Beacon" },
        value: {
          cs: "Záchranný maják pro označení polohy v terénu",
          en: "Rescue beacon for position marking in the field",
        },
      },
    ],
  },
];

export const medDropSpecs: SpecSection[] = [
  {
    icon: "✈️",
    title: { cs: "Letové vlastnosti a pohon", en: "Flight Properties and Propulsion" },
    items: [
      {
        label: { cs: "Vzletová hmotnost", en: "Take-off weight" },
        value: {
          cs: "12 500 g (včetně nákladu – Specific/SORA, C6 certifikovaný provoz)",
          en: "12,500 g (including payload – Specific/SORA, C6 certified operation)",
        },
      },
      {
        label: { cs: "Pohon", en: "Propulsion" },
        value: {
          cs: "Hexamotor – 6 motorů (při výpadku jednoho motoru dron stále letí)",
          en: "Hexamotor – 6 motors (continues flying even if one motor fails)",
        },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: { cs: "40 minut (plně naložený)", en: "40 minutes (fully loaded)" },
      },
      {
        label: { cs: "Max. rychlost", en: "Max. speed" },
        value: {
          cs: "25 m/s (90 km/h) – priorita času",
          en: "25 m/s (90 km/h) – time is critical",
        },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: { cs: "17 m/s (Level 8 – extrémní)", en: "17 m/s (Level 8 – extreme)" },
      },
      {
        label: { cs: "Krytí", en: "Protection rating" },
        value: {
          cs: "IP67 – prachotěsný a odolný proti silnému dešti",
          en: "IP67 – dustproof and resistant to heavy rain",
        },
      },
    ],
  },
  {
    icon: "📦",
    title: { cs: "Nákladový systém", en: "Payload System" },
    items: [
      {
        label: { cs: "Užitečné zatížení", en: "Payload capacity" },
        value: {
          cs: "5 kg (léky, krevní konzervy, AED)",
          en: "5 kg (medications, blood units, AED)",
        },
      },
      {
        label: { cs: "Přepravní box", en: "Transport box" },
        value: {
          cs: "Climate-Safe – termoregulační box (4 °C až 25 °C)",
          en: "Climate-Safe – thermoregulated box (4 °C to 25 °C)",
        },
      },
      {
        label: { cs: "Precision Drop", en: "Precision Drop" },
        value: {
          cs: "Výsadkový mechanismus na laně pro přesné spuštění nákladu",
          en: "Winch-based drop mechanism for precise payload delivery",
        },
      },
      {
        label: { cs: "Bezpečnostní systém", en: "Safety system" },
        value: {
          cs: "Integrovaný padák – při selhání motorů bezpečně přistane",
          en: "Integrated parachute – deploys automatically on motor failure",
        },
      },
    ],
  },
  {
    icon: "📡",
    title: { cs: "Přenos a datová bezpečnost", en: "Transmission and Data Safety" },
    items: [
      {
        label: { cs: "Přenosový systém", en: "Transmission" },
        value: {
          cs: "Neomezený dosah – řízení přes 5G síť + satelitní záloha",
          en: "Unlimited range – controlled via 5G network + satellite backup",
        },
      },
      {
        label: { cs: "Interní úložiště", en: "Internal storage" },
        value: {
          cs: "Flight Data Recorder (černá skříňka) pro analýzu po misi",
          en: "Flight Data Recorder (black box) for post-mission analysis",
        },
      },
    ],
  },
];

export const vortexSpecs: SpecSection[] = [
  {
    icon: "✈️",
    title: { cs: "Konstrukce a výkon", en: "Build and Performance" },
    items: [
      {
        label: { cs: "Vzletová hmotnost", en: "Take-off weight" },
        value: {
          cs: "415 g (bez baterie) / ~650 g (s 6S LiPo) – Kategorie C1",
          en: "415 g (without battery) / ~650 g (with 6S LiPo) – Category C1",
        },
      },
      {
        label: { cs: "Konstrukce", en: "Frame" },
        value: {
          cs: "5 mm 3K karbon – monokok s kevlarovými prvky",
          en: "5 mm 3K carbon – monocoque with Kevlar reinforcements",
        },
      },
      {
        label: { cs: "Motory", en: "Motors" },
        value: {
          cs: "REGEN Flux 2306 (2500 KV) – střídavé motory",
          en: "REGEN Flux 2306 (2500 KV) – brushless motors",
        },
      },
      {
        label: { cs: "Řídicí jednotka", en: "Flight controller" },
        value: {
          cs: "REGEN Core F7 – procesor s nízkou latencí",
          en: "REGEN Core F7 – low-latency processor",
        },
      },
      {
        label: { cs: "Max. rychlost", en: "Max. speed" },
        value: {
          cs: "155 km/h (zrychlení 0–100 km/h pod 2 sekundy)",
          en: "155 km/h (0–100 km/h in under 2 seconds)",
        },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: {
          cs: "18 m/s (Level 9 – dron vítr prakticky nevnímá)",
          en: "18 m/s (Level 9 – wind is barely a factor)",
        },
      },
      {
        label: { cs: "Krytí", en: "Protection rating" },
        value: {
          cs: "IP44 – chráněno proti stříkající vodě a prachu",
          en: "IP44 – protected against splashing water and dust",
        },
      },
    ],
  },
  {
    icon: "🎥",
    title: { cs: "Video a přenos", en: "Video and Transmission" },
    items: [
      {
        label: { cs: "Video přenos (FPV)", en: "FPV video link" },
        value: {
          cs: "O3 Air Unit Digital – 1080p / 100 fps do brýlí",
          en: "O3 Air Unit Digital – 1080p / 100 fps to goggles",
        },
      },
      {
        label: { cs: "Záznam na palubě", en: "Onboard recording" },
        value: {
          cs: "4K / 120 fps (stabilizace Gyroflow)",
          en: "4K / 120 fps (Gyroflow stabilization)",
        },
      },
      {
        label: { cs: "Max. dosah", en: "Max. range" },
        value: {
          cs: "4 km (REGEN Link v5.0 – Low Latency)",
          en: "4 km (REGEN Link v5.0 – Low Latency)",
        },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: {
          cs: "4–8 minut (závisí na stylu letu a plynu)",
          en: "4–8 minutes (depends on flying style and throttle)",
        },
      },
    ],
  },
  {
    icon: "🛡️",
    title: { cs: "Závodní funkce", en: "Racing Features" },
    items: [
      {
        label: { cs: "Turtle Mode", en: "Turtle Mode" },
        value: {
          cs: "Automatické přetočení dronu po pádu na záda",
          en: "Automatically flips the drone back upright after a crash",
        },
      },
      {
        label: { cs: "GPS Rescue", en: "GPS Rescue" },
        value: {
          cs: "Záchranný návrat při ztrátě signálu nebo slabé baterii",
          en: "Emergency return-to-home on signal loss or low battery",
        },
      },
    ],
  },
];

export const falconSpecs: SpecSection[] = [
  {
    icon: "✈️",
    title: { cs: "Konstrukce a výkon", en: "Build and Performance" },
    items: [
      {
        label: { cs: "Vzletová hmotnost", en: "Take-off weight" },
        value: {
          cs: "245 g (bezpečný limit pro začátečníky – Kategorie C0 při lehké baterii)",
          en: "245 g (safe limit for beginners – Category C0 with light battery)",
        },
      },
      {
        label: { cs: "Konstrukce", en: "Frame" },
        value: {
          cs: '3.5 mm "Unibody" karbon – téměř nezničitelný rám',
          en: '3.5 mm "Unibody" carbon – near-indestructible frame',
        },
      },
      {
        label: { cs: "Motory", en: "Motors" },
        value: { cs: "REGEN Eco 1404 (3800 KV)", en: "REGEN Eco 1404 (3800 KV)" },
      },
      {
        label: { cs: "Řídicí jednotka", en: "Flight controller" },
        value: {
          cs: "REGEN Lite F4 – prověřená a odolná deska",
          en: "REGEN Lite F4 – proven and durable board",
        },
      },
      {
        label: { cs: "Max. rychlost", en: "Max. speed" },
        value: {
          cs: "95 km/h (dostatečné pro trénink i první závody)",
          en: "95 km/h (enough for training and first races)",
        },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: { cs: "10 m/s (Level 5)", en: "10 m/s (Level 5)" },
      },
      {
        label: { cs: "Krytí", en: "Protection rating" },
        value: { cs: "IP33 – základní ochrana proti prachu", en: "IP33 – basic dust protection" },
      },
    ],
  },
  {
    icon: "🎥",
    title: { cs: "Video a přenos", en: "Video and Transmission" },
    items: [
      {
        label: { cs: "Video přenos (FPV)", en: "FPV video link" },
        value: {
          cs: "Analog High-Def – nízká cena, nulová latence",
          en: "Analog High-Def – low cost, zero latency",
        },
      },
      {
        label: { cs: "Záznam na palubě", en: "Onboard recording" },
        value: {
          cs: "1080p / 60 fps (záznam na SD kartu)",
          en: "1080p / 60 fps (recorded to SD card)",
        },
      },
      {
        label: { cs: "Max. dosah", en: "Max. range" },
        value: { cs: "2 km (stabilní analogový signál)", en: "2 km (stable analog signal)" },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: {
          cs: "5–10 minut (podle dynamiky letu)",
          en: "5–10 minutes (depending on flying style)",
        },
      },
    ],
  },
  {
    icon: "🛡️",
    title: { cs: "Funkce pro začátečníky", en: "Beginner Features" },
    items: [
      {
        label: { cs: "Acro-Assist", en: "Acro-Assist" },
        value: {
          cs: "Stabilizační režim pro bezpečné první kroky v Acro letu",
          en: "Stabilization mode for safe first steps in Acro flying",
        },
      },
    ],
  },
];

export const skybridgerSpecs: SpecSection[] = [
  {
    icon: "✈️",
    title: { cs: "Konstrukce a letové vlastnosti", en: "Build and Flight Properties" },
    items: [
      {
        label: { cs: "Kategorie (EU)", en: "EU Category" },
        value: { cs: "Specific (SORA) / C6", en: "Specific (SORA) / C6" },
      },
      {
        label: { cs: "Konstrukce", en: "Airframe" },
        value: {
          cs: "Hybridní křídlo (V-Tail) z uhlíkových kompozitů",
          en: "Hybrid wing (V-Tail) made from carbon composites",
        },
      },
      {
        label: { cs: "Rozpětí křídel", en: "Wingspan" },
        value: { cs: "2 400 mm", en: "2,400 mm" },
      },
      {
        label: { cs: "Max. vzletová hmotnost", en: "Max. take-off weight" },
        value: { cs: "14 500 g", en: "14,500 g" },
      },
      {
        label: { cs: "Pohon", en: "Propulsion" },
        value: {
          cs: "Plně elektrický – 4 vertikální + 1 tlačný motor",
          en: "Fully electric – 4 vertical + 1 pusher motor",
        },
      },
      {
        label: { cs: "Cestovní rychlost", en: "Cruise speed" },
        value: { cs: "85 km/h (max. 110 km/h)", en: "85 km/h (max. 110 km/h)" },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: { cs: "150 minut (2,5 hodiny)", en: "150 minutes (2.5 hours)" },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: {
          cs: "18 m/s (Level 9 – extrémní stabilita za letu)",
          en: "18 m/s (Level 9 – extreme in-flight stability)",
        },
      },
      {
        label: { cs: "Krytí", en: "Protection rating" },
        value: {
          cs: "IP56 – odolá silnému dešti a námraze",
          en: "IP56 – resistant to heavy rain and icing",
        },
      },
    ],
  },
  {
    icon: "📦",
    title: { cs: "Nákladový systém", en: "Payload System" },
    items: [
      {
        label: { cs: "Užitečné zatížení", en: "Payload capacity" },
        value: {
          cs: "3 kg (senzory nebo urgentní náklad)",
          en: "3 kg (sensors or urgent cargo)",
        },
      },
    ],
  },
  {
    icon: "📡",
    title: { cs: "Přenos a bezpečnost", en: "Transmission and Safety" },
    items: [
      {
        label: { cs: "Max. dosah", en: "Max. range" },
        value: {
          cs: "120 km (satelitní link + 5G roaming)",
          en: "120 km (satellite link + 5G roaming)",
        },
      },
      {
        label: { cs: "Autopilot", en: "Autopilot" },
        value: {
          cs: "Trojitá redundance + nouzový padák",
          en: "Triple redundancy + emergency parachute",
        },
      },
      {
        label: { cs: "BVLoS Ready", en: "BVLoS Ready" },
        value: {
          cs: "Certifikovaný let mimo dohled pilota",
          en: "Certified beyond visual line of sight operation",
        },
      },
    ],
  },
];

export const skydiverSpecs: SpecSection[] = [
  {
    icon: "✈️",
    title: { cs: "Konstrukce a výkon", en: "Build and Performance" },
    items: [
      {
        label: { cs: "Vzletová hmotnost", en: "Take-off weight" },
        value: {
          cs: "320 g (ultra-light konstrukce – Kategorie C0/C1 dle konfigurace)",
          en: "320 g (ultra-light build – Category C0/C1 depending on configuration)",
        },
      },
      {
        label: { cs: "Konstrukce", en: "Frame" },
        value: {
          cs: "Eco-Polymer Monocoque s výměnným šasi",
          en: "Eco-Polymer Monocoque with replaceable chassis",
        },
      },
      {
        label: { cs: "Max. rychlost", en: "Max. speed" },
        value: { cs: "22 m/s (79,2 km/h)", en: "22 m/s (79.2 km/h)" },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: {
          cs: "15–20 minut (optimalizováno na krátký, intenzivní úkol)",
          en: "15–20 minutes (optimized for short, intensive missions)",
        },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: { cs: "10 m/s (Level 5)", en: "10 m/s (Level 5)" },
      },
      {
        label: { cs: "Krytí", en: "Protection rating" },
        value: { cs: "IP40 – základní ochrana", en: "IP40 – basic protection" },
      },
    ],
  },
  {
    icon: "📷",
    title: { cs: "Kamerový systém", en: "Camera System" },
    items: [
      {
        label: { cs: "Snímač", en: "Sensor" },
        value: {
          cs: "Fixed-Angle 4K (pevná kamera bez gimbalu)",
          en: "Fixed-Angle 4K (fixed camera without gimbal)",
        },
      },
      {
        label: { cs: "Stabilizace", en: "Stabilization" },
        value: {
          cs: "Digital Horizon – softwarové vyrovnání obrazu",
          en: "Digital Horizon – software-based image leveling",
        },
      },
    ],
  },
  {
    icon: "📡",
    title: { cs: "Přenos a nasazení", en: "Transmission and Deployment" },
    items: [
      {
        label: { cs: "Přenosový systém", en: "Transmission" },
        value: {
          cs: "REGEN Link v1.5 – dosah až 3 km (v EU)",
          en: "REGEN Link v1.5 – range up to 3 km (in EU)",
        },
      },
      {
        label: { cs: "Interní úložiště", en: "Internal storage" },
        value: {
          cs: "16 GB (integrovaný čip na desce)",
          en: "16 GB (integrated on-board chip)",
        },
      },
      {
        label: { cs: "Rapid Deploy", en: "Rapid Deploy" },
        value: {
          cs: "Start z ruky nebo vystřelením – okamžitá bojová připravenost",
          en: "Hand-launch or ejection start – immediate operational readiness",
        },
      },
    ],
  },
];

export const sentinelSpecs: SpecSection[] = [
  {
    icon: "✈️",
    title: { cs: "Konstrukce a letové vlastnosti", en: "Build and Flight Properties" },
    items: [
      {
        label: { cs: "Vzletová hmotnost", en: "Take-off weight" },
        value: {
          cs: "6 800 g (titan a karbon – Kategorie C2/Specific, dálkový monitoring)",
          en: "6,800 g (titanium and carbon – Category C2/Specific, long-range monitoring)",
        },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: { cs: "70 minut (duální bateriový systém)", en: "70 minutes (dual battery system)" },
      },
      {
        label: { cs: "Max. rychlost", en: "Max. speed" },
        value: { cs: "18 m/s (64,8 km/h)", en: "18 m/s (64.8 km/h)" },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: { cs: "15 m/s (Level 7)", en: "15 m/s (Level 7)" },
      },
      {
        label: { cs: "Krytí", en: "Protection rating" },
        value: {
          cs: "IP56 – prachotěsný, odolný proti tryskající vodě",
          en: "IP56 – dustproof, resistant to water jets",
        },
      },
    ],
  },
  {
    icon: "📷",
    title: { cs: "Senzorová výbava", en: "Sensor Suite" },
    items: [
      {
        label: { cs: "Multi-Payload", en: "Multi-Payload" },
        value: {
          cs: "LiDAR + 8K zoom kamera + termokamera v2.0",
          en: "LiDAR + 8K zoom camera + thermal camera v2.0",
        },
      },
      {
        label: { cs: "LiDAR rozsah", en: "LiDAR range" },
        value: {
          cs: "450 m (přesnost 2 cm, generování 3D mračen bodů)",
          en: "450 m (2 cm accuracy, 3D point cloud generation)",
        },
      },
      {
        label: { cs: "Optický zoom", en: "Optical zoom" },
        value: {
          cs: "80× hybridní – identifikace osoby na vzdálenost 2 km",
          en: "80× hybrid – person identification at 2 km distance",
        },
      },
      {
        label: { cs: "Stabilizace", en: "Stabilization" },
        value: {
          cs: "3-osý gimbal s aktivním tlumením vibrací",
          en: "3-axis gimbal with active vibration dampening",
        },
      },
      {
        label: { cs: "Detekce překážek", en: "Obstacle detection" },
        value: {
          cs: "360° radar – detekuje i tenké dráty a větve v mlze",
          en: "360° radar – detects thin wires and branches even in fog",
        },
      },
    ],
  },
  {
    icon: "📡",
    title: { cs: "Přenos a autonomní funkce", en: "Transmission and Autonomous Features" },
    items: [
      {
        label: { cs: "Přenosový systém", en: "Transmission" },
        value: {
          cs: "REGEN Link v5.0 – dosah 20 km + satelitní záloha Starlink",
          en: "REGEN Link v5.0 – 20 km range + Starlink satellite backup",
        },
      },
      {
        label: { cs: "Interní úložiště", en: "Internal storage" },
        value: {
          cs: "512 GB SSD s hardwarovým šifrováním",
          en: "512 GB SSD with hardware encryption",
        },
      },
      {
        label: { cs: "AI Patrol", en: "AI Patrol" },
        value: {
          cs: "Autonomní oblet definované trasy s detekcí změn v terénu",
          en: "Autonomous patrol of a defined route with terrain change detection",
        },
      },
    ],
  },
];

export const guardianSpecs: SpecSection[] = [
  {
    icon: "✈️",
    title: { cs: "Konstrukce a letové vlastnosti", en: "Build and Flight Properties" },
    items: [
      {
        label: { cs: "Vzletová hmotnost", en: "Take-off weight" },
        value: {
          cs: "8 400 g (magnezium a kevlar – Kategorie C2/Specific, vojenský/policejní standard)",
          en: "8,400 g (magnesium and Kevlar – Category C2/Specific, military/police standard)",
        },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: {
          cs: "60 minut (s plnou výbavou a aktivním radarem)",
          en: "60 minutes (with full equipment and active radar)",
        },
      },
      {
        label: { cs: "Max. rychlost", en: "Max. speed" },
        value: { cs: "20 m/s (72 km/h)", en: "20 m/s (72 km/h)" },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: {
          cs: "20 m/s (Level 10 – extrémní bouře)",
          en: "20 m/s (Level 10 – extreme storm conditions)",
        },
      },
      {
        label: { cs: "Krytí", en: "Protection rating" },
        value: {
          cs: "IP66 – prachotěsný a odolný proti silným vlnám vody",
          en: "IP66 – dustproof and resistant to powerful water jets",
        },
      },
    ],
  },
  {
    icon: "📷",
    title: { cs: "Senzorová výbava", en: "Sensor Suite" },
    items: [
      {
        label: { cs: "Deep-Vision systém", en: "Deep-Vision system" },
        value: {
          cs: "Termo 1024 px + 4K Night-Vision kamera",
          en: "1024 px thermal + 4K Night-Vision camera",
        },
      },
      {
        label: { cs: "Noční vidění", en: "Night vision" },
        value: {
          cs: "Starlight senzor – barevný obraz i při pouhém měsíčním svitu",
          en: "Starlight sensor – color image even in moonlight only",
        },
      },
      {
        label: { cs: "Optika", en: "Optics" },
        value: {
          cs: "40× optický zoom s laserovým dálkoměrem (dosah 3 km)",
          en: "40× optical zoom with laser rangefinder (3 km range)",
        },
      },
      {
        label: { cs: "Stabilizace", en: "Stabilization" },
        value: {
          cs: "3-osý gimbal s gyro-stabilizací obrazu",
          en: "3-axis gimbal with gyro image stabilization",
        },
      },
      {
        label: { cs: "Detekce překážek", en: "Obstacle detection" },
        value: {
          cs: "Duální radarový systém (přední + zadní)",
          en: "Dual radar system (front + rear)",
        },
      },
    ],
  },
  {
    icon: "📡",
    title: { cs: "Přenos a speciální funkce", en: "Transmission and Special Features" },
    items: [
      {
        label: { cs: "Přenosový systém", en: "Transmission" },
        value: {
          cs: "REGEN Link v5.5 – šifrování AES-256, dosah 15 km (v EU)",
          en: "REGEN Link v5.5 – AES-256 encryption, 15 km range (in EU)",
        },
      },
      {
        label: { cs: "Interní úložiště", en: "Internal storage" },
        value: { cs: "1 TB – zabezpečený SSD modul", en: "1 TB – secure SSD module" },
      },
      {
        label: { cs: "Acoustic Sniffer", en: "Acoustic Sniffer" },
        value: {
          cs: "Detekce a klasifikace zvuků (výstřel, křik, rozbití skla)",
          en: "Sound detection and classification (gunshot, screaming, breaking glass)",
        },
      },
    ],
  },
];

export const weightlifterSpecs: SpecSection[] = [
  {
    icon: "✈️",
    title: { cs: "Konstrukce a letové vlastnosti", en: "Build and Flight Properties" },
    items: [
      {
        label: { cs: "Kategorie (EU)", en: "EU Category" },
        value: { cs: "Specific / C6 (těžký transport)", en: "Specific / C6 (heavy transport)" },
      },
      {
        label: { cs: "Konstrukce", en: "Airframe" },
        value: {
          cs: "Oktokoptéra – 8 motorů v koaxiálním uspořádání",
          en: "Octocopter – 8 motors in coaxial configuration",
        },
      },
      {
        label: { cs: "Vzletová hmotnost", en: "Take-off weight" },
        value: { cs: "22 500 g (bez nákladu)", en: "22,500 g (without payload)" },
      },
      {
        label: { cs: "Pohonný systém", en: "Propulsion" },
        value: {
          cs: "8× REGEN Titan-Brushless (vysoký krouticí moment)",
          en: "8× REGEN Titan-Brushless (high torque)",
        },
      },
      {
        label: { cs: "Max. rychlost", en: "Max. speed" },
        value: {
          cs: "14 m/s (50,4 km/h) – omezeno pro stabilitu nákladu",
          en: "14 m/s (50.4 km/h) – limited for payload stability",
        },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: {
          cs: "25 minut (plně naložený) / 45 minut (prázdný)",
          en: "25 minutes (fully loaded) / 45 minutes (empty)",
        },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: { cs: "14 m/s (Level 6)", en: "14 m/s (Level 6)" },
      },
      {
        label: { cs: "Krytí", en: "Protection rating" },
        value: { cs: "IP54 – prach a stříkající voda", en: "IP54 – dust and splashing water" },
      },
    ],
  },
  {
    icon: "📦",
    title: { cs: "Nákladový systém", en: "Payload System" },
    items: [
      {
        label: { cs: "Užitečné zatížení", en: "Payload capacity" },
        value: { cs: "až 25 kg (čistá váha nákladu)", en: "up to 25 kg (net payload weight)" },
      },
      {
        label: { cs: "Způsob uchycení", en: "Attachment method" },
        value: {
          cs: "Modular Hitch – naviják / pevný hák / magnetický zámek",
          en: "Modular Hitch – winch / fixed hook / magnetic lock",
        },
      },
      {
        label: { cs: "Anti-Sway Control", en: "Anti-Sway Control" },
        value: {
          cs: "Aktivní potlačení houpání nákladu za letu",
          en: "Active suppression of payload swaying during flight",
        },
      },
    ],
  },
  {
    icon: "📡",
    title: { cs: "Přenos a telemetrie", en: "Transmission and Telemetry" },
    items: [
      {
        label: { cs: "Přenosový systém", en: "Transmission" },
        value: {
          cs: "REGEN Link v5.0 – dosah 10 km s důrazem na odezvu",
          en: "REGEN Link v5.0 – 10 km range with focus on responsiveness",
        },
      },
      {
        label: { cs: "Interní úložiště", en: "Internal storage" },
        value: {
          cs: "Flight Telemetry Logger – záznam silového namáhání konstrukce",
          en: "Flight Telemetry Logger – records structural load data",
        },
      },
    ],
  },
];

export const promoFleetSpecs: SpecSection[] = [
  {
    icon: "✈️",
    title: { cs: "Konstrukce a letové vlastnosti", en: "Build and Flight Properties" },
    items: [
      {
        label: { cs: "Kategorie (EU)", en: "EU Category" },
        value: {
          cs: "Specific (rojové létání / Swarm)",
          en: "Specific (swarm flight)",
        },
      },
      {
        label: { cs: "Vzletová hmotnost", en: "Take-off weight" },
        value: {
          cs: "850 g (optimalizováno pro stabilitu a svítivost)",
          en: "850 g (optimized for stability and brightness)",
        },
      },
      {
        label: { cs: "Konstrukce", en: "Frame" },
        value: {
          cs: "Difúzní polykarbonát – tělo dronu funguje jako žárovka",
          en: "Diffusive polycarbonate – the drone body acts as a lantern",
        },
      },
      {
        label: { cs: "Max. rychlost", en: "Max. speed" },
        value: {
          cs: "10 m/s (plynulé choreografické pohyby)",
          en: "10 m/s (smooth choreographic movements)",
        },
      },
      {
        label: { cs: "Max. doba letu", en: "Max. flight time" },
        value: { cs: "22 minut (čistý čas pro show)", en: "22 minutes (clean show time)" },
      },
      {
        label: { cs: "Odolnost větru", en: "Wind resistance" },
        value: {
          cs: "8 m/s (Level 4 – pro plynulost obrazců)",
          en: "8 m/s (Level 4 – for smooth formation shapes)",
        },
      },
      {
        label: { cs: "Krytí", en: "Protection rating" },
        value: {
          cs: "IP43 – odolné proti lehké vlhkosti a rose",
          en: "IP43 – resistant to light moisture and dew",
        },
      },
    ],
  },
  {
    icon: "💡",
    title: { cs: "Světelný systém", en: "Light System" },
    items: [
      {
        label: { cs: "LED systém", en: "LED system" },
        value: {
          cs: "Ultra-Bright RGBW LED – 16 milionů barev, 2 000 lumenů",
          en: "Ultra-Bright RGBW LED – 16 million colors, 2,000 lumens",
        },
      },
    ],
  },
  {
    icon: "📡",
    title: { cs: "Pozicování a synchronizace", en: "Positioning and Synchronization" },
    items: [
      {
        label: { cs: "Pozicování", en: "Positioning" },
        value: {
          cs: "RTK Dual-Band – centimetrová přesnost v celém roji",
          en: "RTK Dual-Band – centimeter accuracy across the entire swarm",
        },
      },
      {
        label: { cs: "Komunikace", en: "Communication" },
        value: {
          cs: "Mesh Network – drony komunikují přímo mezi sebou",
          en: "Mesh Network – drones communicate directly with each other",
        },
      },
      {
        label: { cs: "ShowSync Software", en: "ShowSync Software" },
        value: {
          cs: "Import 3D animací z Blenderu – přímé načtení choreografie",
          en: "Import 3D animations from Blender – direct choreography loading",
        },
      },
    ],
  },
];
