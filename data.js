/* ============================================================
   DATA: coordinates, mineral supply-chain shares, UI groups
   Extracted from the original single-file microsite.
   Sources: USGS MCS 2025, IEA Critical Minerals Outlook 2025,
   CSIS, Visual Capitalist, Bernreuter, Cobalt Institute, etc.
   ============================================================ */

const COORDS = {
  China:       [104.19, 35.86],
  USA:         [-98.58, 39.83],
  Australia:   [133.78, -25.27],
  DRC:         [21.76,  -4.04],
  Chile:       [-71.54, -35.68],
  Brazil:      [-51.93, -14.24],
  Russia:      [105.32, 61.52],
  Canada:      [-106.35, 56.13],
  Indonesia:   [113.92,  -0.79],
  Peru:        [-75.02,  -9.19],
  Mexico:      [-102.55, 23.63],
  "South Africa":[22.94, -30.56],
  Myanmar:     [95.96, 21.91],
  India:       [78.96, 20.59],
  Japan:       [138.25, 36.20],
  "South Korea":[127.77, 35.91],
  Belgium:     [4.47, 50.50],
  Germany:     [10.45, 51.17],
  France:      [2.21, 46.23],
  Norway:      [8.47, 60.47],
  Estonia:     [25.01, 58.60],
  Vietnam:     [108.28, 14.06],
  Malaysia:    [103.40, 3.78],   // Kuantan Lynas plant
  Argentina:   [-63.62, -38.42],
  Bolivia:     [-63.59, -16.29],
  Philippines: [121.77, 12.88],
  "New Caledonia":[165.62, -20.90],
  Kazakhstan:  [66.92, 48.02],
  Mongolia:    [103.85, 46.86],
  Zimbabwe:    [29.15, -19.02],
  Rwanda:      [29.87,  -1.94],
  Zambia:      [27.85, -13.13],
  Austria:     [14.55, 47.52],
  Finland:     [25.75, 61.92],
  Taiwan:      [121.00, 23.70],
  Poland:      [19.15, 51.92],
  Iceland:     [-19.02, 64.96],
  UK:          [-3.44, 55.38],
  Switzerland: [8.23, 46.82],
  Nigeria:     [8.68,   9.08],
  Tanzania:    [34.89,  -6.37],
  Madagascar:  [46.87, -18.77],
  Greenland:   [-42.60, 71.71],
  Mozambique:  [35.53, -18.67],
  Ukraine:     [31.16, 48.38],
  Turkey:      [35.24, 38.96],
  Ethiopia:    [40.49,  9.15],
  Ghana:       [-1.02,  7.95]
};

const MINERALS = [
  /* ===== SEMICONDUCTOR SUBSTRATE & DOPING ===== */
  {
    id: "silicon",
    symbol: "Si",
    name: "Silicon",
    category: "Chip & Wafer",
    why: "The foundational material of every logic and memory chip in an AI accelerator. Wafer-grade polysilicon must be 99.999999999% pure — '11N' purity — for advanced nodes.",
    applications: [
      { title: "Wafers for AI accelerators", detail: "Substrate for every GPU, TPU, and HBM die manufactured by TSMC, Samsung, Intel, and SK Hynix." },
      { title: "Power conversion modules", detail: "Silicon MOSFETs and IGBTs in data center power supplies and uninterruptible power systems." },
      { title: "MEMS sensors", detail: "Accelerometers, gyroscopes, and pressure sensors that monitor data center cooling and seismic activity." },
      { title: "Photovoltaics", detail: "Solar cells powering the new generation of clean-energy AI data centers." }
    ],
    chokepoint: "China refines 93.5% of global polysilicon. Only Wacker (Germany) and Hemlock (US) produce semiconductor-grade polysilicon at scale outside Asia.",
    mining: [
      { country: "China", share: 80, note: "Silicon metal & ferrosilicon" },
      { country: "Russia", share: 5 },
      { country: "Brazil", share: 4 },
      { country: "Norway", share: 3 },
      { country: "USA", share: 3 }
    ],
    processing: [
      { country: "China", share: 94, note: "Polysilicon refining" },
      { country: "Germany", share: 2, note: "Wacker Chemie" },
      { country: "USA", share: 2, note: "Hemlock Semiconductor" },
      { country: "Malaysia", share: 1, note: "Tokuyama" }
    ],
    refining: [
      { country: "Taiwan", share: 60, note: "Wafer fabrication (TSMC)" },
      { country: "South Korea", share: 18, note: "Samsung, SK Hynix" },
      { country: "Japan", share: 12, note: "SUMCO, Shin-Etsu" },
      { country: "USA", share: 5 },
      { country: "China", share: 3 }
    ]
  },
  {
    id: "gallium",
    symbol: "Ga",
    name: "Gallium",
    category: "Chip & Wafer",
    why: "The backbone of compound semiconductors. GaN powers efficient data center voltage conversion; GaAs drives RF and optical interconnects between AI training pods.",
    applications: [
      { title: "GaN power converters", detail: "High-efficiency switching in AI server PSUs; cuts data center electricity loss versus silicon." },
      { title: "GaAs RF chips", detail: "5G base stations, radar, and high-speed optical transceivers linking GPUs across racks." },
      { title: "Laser diodes", detail: "VCSELs and edge-emitting lasers used in datacom optical I/O and LiDAR." },
      { title: "LEDs", detail: "Indicator and illumination LEDs throughout server infrastructure." }
    ],
    chokepoint: "China controls 99% of refined gallium production. In December 2024 China banned gallium exports to the United States.",
    mining: [
      { country: "China", share: 98, note: "Byproduct of bauxite/alumina" },
      { country: "Russia", share: 1 },
      { country: "Japan", share: 0.5 }
    ],
    processing: [
      { country: "China", share: 99, note: "Primary low-purity Ga" },
      { country: "Russia", share: 0.5 },
      { country: "South Korea", share: 0.3 },
      { country: "Japan", share: 0.2 }
    ],
    refining: [
      { country: "China", share: 80, note: "High-purity GaN/GaAs wafers" },
      { country: "Japan", share: 8, note: "Sumitomo Electric" },
      { country: "Germany", share: 5, note: "Freiberger Compound Materials" },
      { country: "USA", share: 4 },
      { country: "Taiwan", share: 3 }
    ]
  },
  {
    id: "germanium",
    symbol: "Ge",
    name: "Germanium",
    category: "Chip & Wafer",
    why: "Enables SiGe heterojunction transistors in high-speed networking ASICs, and is irreplaceable in fiber-optic transceivers carrying AI training data between facilities.",
    applications: [
      { title: "Fiber-optic networks", detail: "Germanium-doped silica is the core of optical fiber connecting hyperscale data centers." },
      { title: "SiGe high-speed transistors", detail: "RF and mixed-signal chips in 400G/800G data center switches." },
      { title: "Infrared optics", detail: "Thermal imaging cameras used to monitor server hotspots and cooling." },
      { title: "Photodetectors", detail: "Receivers in optical data links between AI training clusters." }
    ],
    chokepoint: "China produces ~68% of refined germanium. Banned exports to the US in December 2024. Belgium (Umicore) is the largest non-Chinese refiner.",
    mining: [
      { country: "China", share: 68, note: "Zinc/coal-ash byproduct" },
      { country: "Russia", share: 5 },
      { country: "USA", share: 3 },
      { country: "Canada", share: 2 }
    ],
    processing: [
      { country: "China", share: 60 },
      { country: "Belgium", share: 15, note: "Umicore, Olen" },
      { country: "Russia", share: 8 },
      { country: "Canada", share: 5, note: "5N Plus" },
      { country: "Germany", share: 5 },
      { country: "USA", share: 5 }
    ],
    refining: [
      { country: "China", share: 55 },
      { country: "Belgium", share: 18, note: "High-purity GeO₂" },
      { country: "Canada", share: 8 },
      { country: "USA", share: 7 },
      { country: "Germany", share: 6 }
    ]
  },
  {
    id: "indium",
    symbol: "In",
    name: "Indium",
    category: "Chip & Wafer",
    why: "Used in ITO transparent conductors (touchscreens, displays) and InP semiconductors that drive coherent optical transceivers — the high-bandwidth links between AI training nodes.",
    applications: [
      { title: "InP photonics", detail: "Indium phosphide chips for coherent optics moving terabits between training clusters." },
      { title: "ITO transparent electrodes", detail: "OLED displays and touchscreens on server-room control panels." },
      { title: "Low-temp solders", detail: "Indium-based solders for bonding heat-sensitive chip packages." },
      { title: "Thermal interface materials", detail: "Indium foil between AI chips and heatsinks for superior heat transfer." }
    ],
    chokepoint: "China imposed export licensing on indium in 2025. ~58% of global indium refining sits in China.",
    mining: [
      { country: "China", share: 58, note: "Zinc smelter byproduct" },
      { country: "South Korea", share: 14 },
      { country: "Japan", share: 9 },
      { country: "Canada", share: 7 },
      { country: "Peru", share: 4 }
    ],
    processing: [
      { country: "China", share: 50 },
      { country: "South Korea", share: 18 },
      { country: "Japan", share: 12 },
      { country: "Canada", share: 8 }
    ],
    refining: [
      { country: "China", share: 55, note: "Refined indium ingots & ITO" },
      { country: "South Korea", share: 18 },
      { country: "Japan", share: 14 },
      { country: "Belgium", share: 5 }
    ]
  },
  {
    id: "hafnium",
    symbol: "Hf",
    name: "Hafnium",
    category: "Chip & Wafer",
    why: "Hafnium oxide is the high-k gate dielectric that made modern sub-22nm chips physically possible. Every advanced AI accelerator since 2007 depends on Hf-based gate stacks.",
    applications: [
      { title: "High-k gate dielectric", detail: "HfO₂ gate oxide in FinFET and GAA transistors at TSMC N3/N2 and Samsung 3nm." },
      { title: "Capacitor dielectrics", detail: "Used in DRAM and emerging memory technologies." },
      { title: "Superalloys", detail: "Turbine blades in datacenter gas generators for backup power." },
      { title: "Plasma cutting", detail: "Electrodes used in semiconductor fab tooling." }
    ],
    chokepoint: "France (Framatome) and the US dominate nuclear-grade hafnium separation. Derived from zirconium processing — supply is structurally tiny.",
    mining: [
      { country: "Australia", share: 40, note: "From zircon sands" },
      { country: "South Africa", share: 25 },
      { country: "Mozambique", share: 12 },
      { country: "China", share: 10 },
      { country: "USA", share: 6 }
    ],
    processing: [
      { country: "France", share: 45, note: "Framatome Jarrie" },
      { country: "USA", share: 30, note: "Westinghouse, ATI" },
      { country: "Russia", share: 15 },
      { country: "China", share: 8 }
    ],
    refining: [
      { country: "France", share: 40, note: "Nuclear-grade Hf metal" },
      { country: "USA", share: 35 },
      { country: "Russia", share: 15 },
      { country: "China", share: 8 }
    ]
  },
  {
    id: "fluorspar",
    symbol: "F",
    name: "Fluorspar",
    category: "Chip & Wafer",
    why: "Source of hydrofluoric acid (HF) — the chemical that etches every silicon wafer. No fluorspar means no chips, period.",
    applications: [
      { title: "Wafer etching (HF)", detail: "Hydrofluoric acid is used at dozens of steps in every fab process flow." },
      { title: "Photolithography solvents", detail: "Fluorinated chemicals critical to EUV mask production." },
      { title: "Refrigerants", detail: "Fluorocarbons used in chiller systems cooling AI data centers." },
      { title: "Aluminum smelting flux", detail: "Used to produce aluminum heat sinks and chassis." }
    ],
    chokepoint: "China supplies ~63% of global fluorspar and dominates refined HF capacity. US is 100% import-reliant for fluorspar.",
    mining: [
      { country: "China", share: 63 },
      { country: "Mexico", share: 14 },
      { country: "Mongolia", share: 12 },
      { country: "South Africa", share: 4 },
      { country: "Vietnam", share: 3 }
    ],
    processing: [
      { country: "China", share: 70, note: "Acid-grade fluorspar" },
      { country: "Mexico", share: 12 },
      { country: "Mongolia", share: 8 }
    ],
    refining: [
      { country: "China", share: 65, note: "Anhydrous HF production" },
      { country: "Mexico", share: 12 },
      { country: "Germany", share: 5 },
      { country: "Japan", share: 5 },
      { country: "USA", share: 5 }
    ]
  },
  {
    id: "boron",
    symbol: "B",
    name: "Boron",
    category: "Chip & Wafer",
    why: "The standard p-type dopant in CMOS silicon — every transistor in every AI chip has boron implants. Also the 'B' in NdFeB permanent magnets that drive server fans, HDD voice coils, and cooling motors.",
    applications: [
      { title: "Silicon p-type dopant", detail: "Standard implant for forming p-type regions in CMOS — present in every transistor of every AI chip." },
      { title: "BPSG dielectric", detail: "Borophosphosilicate glass as interlayer dielectric in chip back-end-of-line metal stacks." },
      { title: "NdFeB magnets", detail: "The 'B' in neodymium-iron-boron magnets — server fans, HDD voice coils, BLDC motors." },
      { title: "Borosilicate glass", detail: "Heat-resistant glass in chip packaging substrates and photomask blanks." }
    ],
    chokepoint: "Turkey's state-owned Eti Maden controls ~65% of mined boron; Rio Tinto's Boron, California operation provides most of the rest. While less extreme than China's grip on gallium, the two-country concentration leaves limited alternatives.",
    mining: [
      { country: "Turkey", share: 65, note: "Eti Maden (state-owned)" },
      { country: "USA", share: 12, note: "Rio Tinto, Boron CA" },
      { country: "Chile", share: 7 },
      { country: "Argentina", share: 4 },
      { country: "China", share: 4 },
      { country: "Russia", share: 3 }
    ],
    processing: [
      { country: "Turkey", share: 58, note: "Boric acid, borax" },
      { country: "USA", share: 15 },
      { country: "China", share: 10 },
      { country: "Chile", share: 6 },
      { country: "Russia", share: 4 }
    ],
    refining: [
      { country: "Turkey", share: 50, note: "Refined boron compounds" },
      { country: "USA", share: 18 },
      { country: "China", share: 14, note: "Elemental boron for magnets" },
      { country: "Russia", share: 5 },
      { country: "Japan", share: 4 }
    ]
  },

  /* ===== POWER, INTERCONNECT & PACKAGING ===== */
  {
    id: "copper",
    symbol: "Cu",
    name: "Copper",
    category: "Power & Interconnect",
    why: "The metal of electrification. Power cables to data centers, busbars in racks, on-chip damascene interconnects, and motor windings in cooling fans — all copper.",
    applications: [
      { title: "Data center power cabling", detail: "MV/LV cables delivering megawatts to AI training clusters." },
      { title: "On-chip interconnect", detail: "Damascene copper traces inside every modern CPU/GPU since the late 1990s." },
      { title: "Server PCB & busbars", detail: "Backplanes and copper busbars distributing power within racks." },
      { title: "Heat exchangers", detail: "Liquid-cooling cold plates and heat pipes for AI chips." }
    ],
    chokepoint: "Mining is geographically distributed; refining is more concentrated in China (~45%). The IEA warns of structural copper deficits as AI/electrification demand surges.",
    mining: [
      { country: "Chile", share: 23 },
      { country: "DRC", share: 14 },
      { country: "Peru", share: 12 },
      { country: "China", share: 8 },
      { country: "USA", share: 5 },
      { country: "Australia", share: 4 },
      { country: "Zambia", share: 4 },
      { country: "Russia", share: 4 }
    ],
    processing: [
      { country: "China", share: 45, note: "Smelting capacity" },
      { country: "Chile", share: 9 },
      { country: "Japan", share: 7 },
      { country: "DRC", share: 6 },
      { country: "Russia", share: 4 }
    ],
    refining: [
      { country: "China", share: 45, note: "Refined cathode copper" },
      { country: "Chile", share: 9 },
      { country: "Japan", share: 6 },
      { country: "Russia", share: 4 },
      { country: "India", share: 3 },
      { country: "USA", share: 3 }
    ]
  },
  {
    id: "tungsten",
    symbol: "W",
    name: "Tungsten",
    category: "Power & Interconnect",
    why: "Used for vertical interconnects (vias and contacts) inside chips, and for wear-resistant tooling that machines semiconductor equipment.",
    applications: [
      { title: "Via & contact plugs", detail: "Tungsten fills the vertical connections between metal layers in every advanced chip." },
      { title: "X-ray targets", detail: "EUV lithography tooling and inspection." },
      { title: "Carbide cutting tools", detail: "Precision machining of fab equipment and chip packaging." },
      { title: "Heat sinks (W-Cu composites)", detail: "High-power AI chip thermal management." }
    ],
    chokepoint: "China produces ~80% of mined tungsten and >85% of refined output. Imposed export licensing in early 2025.",
    mining: [
      { country: "China", share: 80 },
      { country: "Vietnam", share: 5 },
      { country: "Russia", share: 3 },
      { country: "Mongolia", share: 2 },
      { country: "Australia", share: 2 },
      { country: "Bolivia", share: 2 }
    ],
    processing: [
      { country: "China", share: 85, note: "APT / tungsten oxide" },
      { country: "Vietnam", share: 6 },
      { country: "Austria", share: 3 },
      { country: "Germany", share: 2 }
    ],
    refining: [
      { country: "China", share: 80 },
      { country: "Austria", share: 5, note: "Wolfram Bergbau" },
      { country: "Germany", share: 4 },
      { country: "USA", share: 3 }
    ]
  },
  {
    id: "tantalum",
    symbol: "Ta",
    name: "Tantalum",
    category: "Power & Interconnect",
    why: "Tantalum capacitors stabilize voltage in every AI server. Tantalum nitride is also a diffusion barrier in advanced copper interconnects.",
    applications: [
      { title: "Tantalum capacitors", detail: "Compact, stable capacitors on every server motherboard near the CPU/GPU." },
      { title: "TaN diffusion barriers", detail: "Prevents copper from migrating into silicon in damascene interconnects." },
      { title: "Sputtering targets", detail: "Used in chip fabrication PVD processes." },
      { title: "Aerospace superalloys", detail: "Turbine engines including backup generation." }
    ],
    chokepoint: "DRC and Rwanda mine ~60% of tantalum. Refining is split between US (KEMET), Germany, Japan, and China.",
    mining: [
      { country: "DRC", share: 41 },
      { country: "Rwanda", share: 20 },
      { country: "Brazil", share: 12 },
      { country: "Nigeria", share: 8 },
      { country: "China", share: 6 },
      { country: "Ethiopia", share: 4 }
    ],
    processing: [
      { country: "USA", share: 25 },
      { country: "Germany", share: 20, note: "H.C. Starck" },
      { country: "China", share: 18 },
      { country: "Japan", share: 15 },
      { country: "Kazakhstan", share: 10, note: "Ulba Metallurgical" }
    ],
    refining: [
      { country: "USA", share: 28, note: "Capacitor-grade Ta powder" },
      { country: "Germany", share: 22 },
      { country: "Japan", share: 18 },
      { country: "China", share: 18 },
      { country: "Kazakhstan", share: 8 }
    ]
  },
  {
    id: "gold",
    symbol: "Au",
    name: "Gold",
    category: "Power & Interconnect",
    why: "Microscopic gold wires bond every chip die to its package. Plated gold protects electrical contacts in servers from corrosion.",
    applications: [
      { title: "Wire bonding", detail: "25-µm gold wires connect AI chip dies to their package leads." },
      { title: "Connector plating", detail: "Gold-plated edge connectors and pins on every server module." },
      { title: "Bump bonding (flip chip)", detail: "Gold microbumps in advanced packaging like CoWoS for AI accelerators." },
      { title: "Reflective coatings", detail: "Gold mirrors in EUV photolithography optics." }
    ],
    chokepoint: "Mining is the most diversified of any AI mineral. Refining concentrates in Switzerland, South Africa, and the US.",
    mining: [
      { country: "China", share: 10 },
      { country: "Russia", share: 10 },
      { country: "Australia", share: 9 },
      { country: "Canada", share: 6 },
      { country: "USA", share: 5 },
      { country: "Ghana", share: 4 },
      { country: "Peru", share: 3 },
      { country: "Mexico", share: 3 },
      { country: "South Africa", share: 3 }
    ],
    processing: [
      { country: "Switzerland", share: 40, note: "PAMP, MKS, Valcambi, Argor" },
      { country: "South Africa", share: 12, note: "Rand Refinery" },
      { country: "USA", share: 8 },
      { country: "Australia", share: 7, note: "Perth Mint" },
      { country: "UK", share: 6 }
    ],
    refining: [
      { country: "Switzerland", share: 40 },
      { country: "South Africa", share: 12 },
      { country: "USA", share: 10 },
      { country: "China", share: 9 },
      { country: "Japan", share: 7 }
    ]
  },
  {
    id: "palladium",
    symbol: "Pd",
    name: "Palladium",
    category: "Power & Interconnect",
    why: "The workhorse metal in multilayer ceramic capacitors (MLCCs) — thousands of which sit on every AI server board. Also used for wire bonding and as a catalyst in semiconductor precursor chemistry.",
    applications: [
      { title: "MLCC electrodes", detail: "Pd and Pd-Ag inner electrodes in the ceramic capacitors covering every AI server board." },
      { title: "Wire bonding", detail: "Pd-coated copper bonding wire — a cost alternative to gold in chip packages." },
      { title: "Connector plating", detail: "Pd-Ni plating on high-reliability connectors for repeated mate/unmate cycles." },
      { title: "Semiconductor catalysis", detail: "Catalyst in precursor chemistry and select CVD processes inside chip fabs." }
    ],
    chokepoint: "Russia (Nornickel) and South Africa's Bushveld Complex together produce ~70% of mined palladium. Russia sanctions risk and Bushveld labor instability are both live concerns for AI server supply chains.",
    mining: [
      { country: "Russia", share: 37, note: "Nornickel, Norilsk" },
      { country: "South Africa", share: 34, note: "Bushveld Complex" },
      { country: "Canada", share: 8, note: "Sudbury PGM byproduct" },
      { country: "USA", share: 7, note: "Stillwater, Montana" },
      { country: "Zimbabwe", share: 7, note: "Great Dyke" }
    ],
    processing: [
      { country: "Russia", share: 35 },
      { country: "South Africa", share: 33, note: "Anglo, Sibanye-Stillwater" },
      { country: "UK", share: 8, note: "Johnson Matthey" },
      { country: "Switzerland", share: 6, note: "Argor-Heraeus, Valcambi" },
      { country: "USA", share: 6 },
      { country: "Japan", share: 5, note: "Tanaka" }
    ],
    refining: [
      { country: "Russia", share: 33 },
      { country: "South Africa", share: 30 },
      { country: "UK", share: 10, note: "Johnson Matthey Royston" },
      { country: "Switzerland", share: 8 },
      { country: "USA", share: 7 },
      { country: "Japan", share: 6 },
      { country: "Germany", share: 4, note: "Heraeus" }
    ]
  },

  /* ===== MAGNETS & RARE EARTHS ===== */
  {
    id: "neodymium",
    symbol: "Nd",
    name: "Neodymium",
    category: "Magnets & REEs",
    why: "The 'N' in NdFeB — the most powerful commercial permanent magnets. Drives every server cooling fan, disk drive, and many actuators in robotic AI infrastructure.",
    applications: [
      { title: "Server cooling fan magnets", detail: "High-efficiency BLDC motor magnets in data center HVAC and rack fans." },
      { title: "HDD voice coil motors", detail: "NdFeB magnets position the read/write heads on every spinning hard drive." },
      { title: "Robotic actuators", detail: "Precision servos in data center automation and humanoid robotics." },
      { title: "Generator magnets", detail: "Wind turbines feeding renewable power to AI facilities." }
    ],
    chokepoint: "China refines 91% of all magnet rare earths and produces 94% of sintered NdFeB magnets. Imposed escalating export controls in Apr & Oct 2025.",
    mining: [
      { country: "China", share: 60 },
      { country: "USA", share: 15, note: "Mountain Pass, CA" },
      { country: "Myanmar", share: 8, note: "Often illegal, flows to China" },
      { country: "Australia", share: 7, note: "Mt Weld, Lynas" },
      { country: "India", share: 2 },
      { country: "Russia", share: 1 }
    ],
    processing: [
      { country: "China", share: 91, note: "Separation & oxide refining" },
      { country: "Malaysia", share: 5, note: "Lynas, Kuantan" },
      { country: "Estonia", share: 1, note: "Neo Performance Materials" },
      { country: "France", share: 1, note: "Solvay La Rochelle" }
    ],
    refining: [
      { country: "China", share: 94, note: "NdFeB sintered magnets" },
      { country: "Japan", share: 3, note: "Shin-Etsu, TDK" },
      { country: "Germany", share: 1 },
      { country: "USA", share: 1 }
    ]
  },
  {
    id: "praseodymium",
    symbol: "Pr",
    name: "Praseodymium",
    category: "Magnets & REEs",
    why: "Paired with neodymium in nearly all high-grade NdFeB magnets. Improves coercivity and corrosion resistance in magnets used across AI data center hardware.",
    applications: [
      { title: "NdPr magnets", detail: "Pr partially substitutes for Nd in magnets — same uses: motors, fans, HDDs." },
      { title: "Optical fiber amplifiers", detail: "Pr-doped fiber amplifiers in 1.3-µm telecom bands." },
      { title: "Aircraft engine alloys", detail: "Used in turbines, including data center backup power." },
      { title: "Pigments & ceramics", detail: "Yellow ceramic pigments and welding goggles." }
    ],
    chokepoint: "Same as neodymium — China refines ~91% of magnet rare earths.",
    mining: [
      { country: "China", share: 60 },
      { country: "USA", share: 15 },
      { country: "Australia", share: 8 },
      { country: "Myanmar", share: 7 },
      { country: "India", share: 2 }
    ],
    processing: [
      { country: "China", share: 90 },
      { country: "Malaysia", share: 6, note: "Lynas" },
      { country: "Estonia", share: 1 },
      { country: "France", share: 1 }
    ],
    refining: [
      { country: "China", share: 92 },
      { country: "Japan", share: 4 },
      { country: "Malaysia", share: 2 }
    ]
  },
  {
    id: "dysprosium",
    symbol: "Dy",
    name: "Dysprosium",
    category: "Magnets & REEs",
    why: "Heavy rare earth added to NdFeB magnets so they retain magnetism at high operating temperatures — exactly the condition inside packed AI servers and EV motors.",
    applications: [
      { title: "High-temp magnet doping", detail: "Allows NdFeB magnets to operate above 150°C in motors and servers without demagnetizing." },
      { title: "Magnetostrictive materials", detail: "Terfenol-D for precision actuators and sonar." },
      { title: "Nuclear reactor control rods", detail: "Neutron absorber for backup nuclear power." },
      { title: "Laser materials", detail: "Dy-doped fiber lasers in industrial cutting." }
    ],
    chokepoint: "Almost all heavy rare earth refining happens in China (and Myanmar feeding China). Lynas (Malaysia) became the first non-Chinese commercial Dy oxide producer in May 2025.",
    mining: [
      { country: "China", share: 65, note: "Ionic clay deposits, south China" },
      { country: "Myanmar", share: 25, note: "Flows mostly into China" },
      { country: "Australia", share: 5 },
      { country: "USA", share: 2 }
    ],
    processing: [
      { country: "China", share: 95 },
      { country: "Malaysia", share: 3, note: "Lynas, first non-China Dy 2025" },
      { country: "Myanmar", share: 2 }
    ],
    refining: [
      { country: "China", share: 98, note: "Dy oxide & metal" },
      { country: "Malaysia", share: 2 }
    ]
  },
  {
    id: "terbium",
    symbol: "Tb",
    name: "Terbium",
    category: "Magnets & REEs",
    why: "Heavy rare earth used like dysprosium to boost high-temperature performance of magnets. Also key for green phosphors in displays and solid-state lighting.",
    applications: [
      { title: "High-temp magnet doping", detail: "Improves magnet thermal stability in compact, high-power AI server motors." },
      { title: "Green phosphors", detail: "Tb³⁺ produces green emission in fluorescent and LED phosphor blends." },
      { title: "Magneto-optical storage", detail: "TbFeCo films in MO drives and emerging optical memory." },
      { title: "Fuel cell electrolytes", detail: "Used in solid oxide fuel cells for data center power." }
    ],
    chokepoint: "Subject to China's April 2025 heavy-REE export controls. Lynas began producing terbium concentrate in 2024.",
    mining: [
      { country: "China", share: 70 },
      { country: "Myanmar", share: 22 },
      { country: "Australia", share: 5 }
    ],
    processing: [
      { country: "China", share: 95 },
      { country: "Malaysia", share: 3 }
    ],
    refining: [
      { country: "China", share: 97 },
      { country: "Malaysia", share: 3 }
    ]
  },
  {
    id: "yttrium",
    symbol: "Y",
    name: "Yttrium",
    category: "Magnets & REEs",
    why: "Used to dope GaN/InP semiconductors, in YAG lasers that pattern chips, and as a stabilizer in high-temperature superconducting wire — emerging in data center power.",
    applications: [
      { title: "YAG lasers", detail: "Yttrium aluminum garnet lasers used in semiconductor laser annealing and cutting." },
      { title: "Phosphors", detail: "Red-emitting phosphors in displays and LEDs." },
      { title: "Superconductors (YBCO)", detail: "High-temp superconducting tape for emerging data center power links." },
      { title: "Refractory ceramics", detail: "Crucibles for melting high-purity semiconductor materials." }
    ],
    chokepoint: "China refines ~80% of yttrium. Subject to April 2025 heavy-REE export controls.",
    mining: [
      { country: "China", share: 65 },
      { country: "Myanmar", share: 18 },
      { country: "Australia", share: 8 },
      { country: "USA", share: 3 },
      { country: "India", share: 2 }
    ],
    processing: [
      { country: "China", share: 85 },
      { country: "Malaysia", share: 6, note: "Lynas" },
      { country: "France", share: 2 }
    ],
    refining: [
      { country: "China", share: 85 },
      { country: "Malaysia", share: 6 },
      { country: "Estonia", share: 2 }
    ]
  },

  /* ===== ENERGY STORAGE ===== */
  {
    id: "lithium",
    symbol: "Li",
    name: "Lithium",
    category: "Energy Storage",
    why: "Powers the lithium-ion battery banks that back up every AI data center against grid failure — and increasingly, the BESS systems smoothing renewable supply.",
    applications: [
      { title: "Data center UPS", detail: "Li-ion battery banks providing seconds-to-minutes ride-through during outages." },
      { title: "Grid-scale BESS", detail: "Battery energy storage smoothing renewable supply to AI loads." },
      { title: "EV batteries", detail: "Powers the trucks and logistics fleets servicing data center construction." },
      { title: "Glass strengthening", detail: "Li₂O in display glass for control screens." }
    ],
    chokepoint: "Australia mines the most spodumene; Chile mines the most brine. But China refines ~65% of battery-grade lithium chemicals.",
    mining: [
      { country: "Australia", share: 47, note: "Spodumene hard rock" },
      { country: "Chile", share: 23, note: "Atacama brine" },
      { country: "China", share: 16 },
      { country: "Argentina", share: 6, note: "Salar brine" },
      { country: "Brazil", share: 2 }
    ],
    processing: [
      { country: "China", share: 65, note: "Lithium carbonate / hydroxide" },
      { country: "Chile", share: 15 },
      { country: "Argentina", share: 5 },
      { country: "Australia", share: 5 },
      { country: "USA", share: 3 }
    ],
    refining: [
      { country: "China", share: 65, note: "Battery-grade chemicals" },
      { country: "Chile", share: 12 },
      { country: "South Korea", share: 5 },
      { country: "Japan", share: 4 }
    ]
  },
  {
    id: "cobalt",
    symbol: "Co",
    name: "Cobalt",
    category: "Energy Storage",
    why: "Stabilizes lithium-ion cathodes used in data center UPS and EV batteries. Also used in thin cobalt films as copper barrier liners in cutting-edge chip interconnects.",
    applications: [
      { title: "Li-ion battery cathodes", detail: "NMC and LCO chemistries in UPS and consumer Li-ion cells." },
      { title: "Chip interconnect liners", detail: "Cobalt barrier layers replacing tantalum in advanced sub-7nm node interconnects." },
      { title: "Superalloys", detail: "Turbine blades for backup-power gas generators." },
      { title: "Catalysts", detail: "Petroleum refining for fuels powering generators." }
    ],
    chokepoint: "DRC mines ~73% of cobalt; China refines ~70%. The chip industry now relies on cobalt for both batteries AND on-chip interconnects.",
    mining: [
      { country: "DRC", share: 73 },
      { country: "Indonesia", share: 14 },
      { country: "Russia", share: 2 },
      { country: "Australia", share: 2 },
      { country: "Canada", share: 1 },
      { country: "Philippines", share: 1 }
    ],
    processing: [
      { country: "China", share: 70, note: "Cobalt sulfate / metal" },
      { country: "Finland", share: 8, note: "Umicore Kokkola" },
      { country: "Indonesia", share: 6 },
      { country: "Canada", share: 4 },
      { country: "Japan", share: 3 },
      { country: "Belgium", share: 3 }
    ],
    refining: [
      { country: "China", share: 75, note: "Battery-grade cobalt sulfate" },
      { country: "Finland", share: 8 },
      { country: "Belgium", share: 3 },
      { country: "Japan", share: 3 }
    ]
  },
  {
    id: "nickel",
    symbol: "Ni",
    name: "Nickel",
    category: "Energy Storage",
    why: "Primary cathode metal in high-energy Li-ion batteries (NMC/NCA). Also used in stainless-steel server chassis and in superalloys for backup turbines.",
    applications: [
      { title: "High-energy Li-ion cathodes", detail: "NMC811 and NCA cells used in UPS, EVs, and high-density storage." },
      { title: "Server chassis (stainless)", detail: "Stainless-steel server racks and chassis." },
      { title: "Superalloys", detail: "Inconel for backup gas-turbine generators." },
      { title: "Plating", detail: "Corrosion-resistant plating on connectors and hardware." }
    ],
    chokepoint: "Indonesia mines >50% of global nickel and is rapidly building HPAL refining. China owns much of Indonesia's nickel processing capacity.",
    mining: [
      { country: "Indonesia", share: 55 },
      { country: "Philippines", share: 11 },
      { country: "Russia", share: 6 },
      { country: "New Caledonia", share: 6 },
      { country: "Australia", share: 4 },
      { country: "Canada", share: 4 },
      { country: "China", share: 3 }
    ],
    processing: [
      { country: "Indonesia", share: 50, note: "Chinese-owned HPAL/RKEF" },
      { country: "China", share: 25 },
      { country: "Russia", share: 6 },
      { country: "Japan", share: 4 },
      { country: "Canada", share: 4 }
    ],
    refining: [
      { country: "China", share: 35, note: "Nickel sulfate for batteries" },
      { country: "Indonesia", share: 30 },
      { country: "Russia", share: 8 },
      { country: "Japan", share: 6 },
      { country: "Canada", share: 5 }
    ]
  }
];

const GROUPS = [
  { id: "Chip & Wafer", label: "Chip & Wafer Substrate" },
  { id: "Power & Interconnect", label: "Power & Interconnect" },
  { id: "Magnets & REEs", label: "Magnets & Rare Earths" },
  { id: "Energy Storage", label: "Energy Storage" }
];
