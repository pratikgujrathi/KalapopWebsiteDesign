// Mock data for Kalapop B2B Surface Design Studio

export const collections = [
  {
    id: 'starter',
    name: 'Starter Collection',
    tier: 'starter',
    access: 'Non-exclusive',
    description: 'Curated surface patterns for modern brands and boutiques. Entry-level access to foundational designs perfect for emerging designers.',
    designCount: 50,
    priceRange: 'Accessible for emerging brands',
    features: [
      'Access to 50 base patterns',
      'High resolution downloads',
      'Non-exclusive usage rights',
      'Email support',
      'Commercial license included'
    ]
  },
  {
    id: 'exclusive',
    name: 'Exclusive Collection',
    tier: 'exclusive',
    access: 'Commissioned / Original',
    description: 'Complete archive with custom design consultation. Bespoke surface solutions with unlimited creative freedom for established brands.',
    designCount: '200+',
    priceRange: 'Premium commissioned work',
    features: [
      'Full pattern library access',
      'Exclusive commissioned designs',
      'Dedicated design consultant',
      'Unlimited usage rights',
      'Custom pattern development',
      'Exclusive colorway options',
      'Priority support'
    ]
  }
];

export const fabrics = [
  {
    id: 'fabric-001',
    name: 'Cotton Poplin',
    weight: '120 GSM',
    suitability: 'Apparel, Light furnishings',
    techniques: ['Digital', 'Screen printing'],
    description: 'Crisp, smooth finish. Excellent color clarity.'
  },
  {
    id: 'fabric-002',
    name: 'Linen Canvas',
    weight: '280 GSM',
    suitability: 'Upholstery, Wall coverings',
    techniques: ['Digital', 'Screen printing', 'Block printing'],
    description: 'Natural texture with dimensional quality.'
  },
  {
    id: 'fabric-003',
    name: 'Silk Crepe de Chine',
    weight: '90 GSM',
    suitability: 'Luxury apparel, Scarves',
    techniques: ['Digital'],
    description: 'Fluid drape with subtle sheen.'
  },
  {
    id: 'fabric-004',
    name: 'Cotton Sateen',
    weight: '200 GSM',
    suitability: 'Bedding, Soft furnishings',
    techniques: ['Digital', 'Screen printing'],
    description: 'Smooth surface with soft hand feel.'
  },
  {
    id: 'fabric-005',
    name: 'Organic Cotton Jersey',
    weight: '180 GSM',
    suitability: 'Apparel, Activewear',
    techniques: ['Digital'],
    description: 'Stretch and recovery with eco credentials.'
  },
  {
    id: 'fabric-006',
    name: 'Velvet',
    weight: '320 GSM',
    suitability: 'Upholstery, Statement pieces',
    techniques: ['Digital'],
    description: 'Rich texture with depth and luxury.'
  }
];

export const designs = [
  {
    id: 'design-001',
    name: 'Geometric Horizon',
    collection: 'starter',
    description: 'A bold exploration of linear repetition and architectural rhythm. This pattern creates depth through layered geometric forms.',
    category: 'Geometric',
    colors: ['#2C3E50', '#E74C3C', '#ECF0F1'],
    designIntent: 'Inspired by urban skylines and architectural blueprints, this design translates structural thinking into textile language.',
    suitableTechniques: ['Digital printing', 'Screen printing'],
    recommendedFabrics: ['fabric-001', 'fabric-002', 'fabric-004'],
    scale: 'Half-drop repeat, 24" x 24"',
    style: 'Contemporary Minimalist',
    thumbnail: 'abstract-geometric-1'
  },
  {
    id: 'design-002',
    name: 'Organic Flow',
    collection: 'starter',
    description: 'Fluid forms inspired by natural erosion patterns. Seamless movement across surface creates calm visual continuity.',
    category: 'Organic',
    colors: ['#27AE60', '#F39C12', '#95A5A6'],
    designIntent: 'Water-carved stone and wind patterns inform this exploration of organic movement and natural rhythm.',
    suitableTechniques: ['Digital printing', 'Block printing'],
    recommendedFabrics: ['fabric-001', 'fabric-003', 'fabric-005'],
    scale: 'Block repeat, 18" x 18"',
    style: 'Biomorphic Abstract',
    thumbnail: 'abstract-organic-1'
  },
  {
    id: 'design-003',
    name: 'Fractured Light',
    collection: 'controlled',
    description: 'Angular planes intersect to capture shifting perspectives. A study in controlled chaos and visual tension.',
    category: 'Abstract',
    colors: ['#8E44AD', '#F1C40F', '#34495E'],
    designIntent: 'Light refraction through crystalline structures creates this play of angles and transparent layers.',
    suitableTechniques: ['Digital printing', 'Screen printing'],
    recommendedFabrics: ['fabric-002', 'fabric-004', 'fabric-006'],
    scale: 'Full drop repeat, 36" x 36"',
    style: 'Architectural Abstract',
    thumbnail: 'abstract-angular-1'
  },
  {
    id: 'design-004',
    name: 'Woven Memory',
    collection: 'controlled',
    description: 'Grid structures break and reform, suggesting textile construction at macro scale. Digital interpretation of hand-woven texture.',
    category: 'Textural',
    colors: ['#7F8C8D', '#BDC3C7', '#2C3E50'],
    designIntent: 'Traditional weaving techniques reimagined through digital lens, celebrating craft history and contemporary making.',
    suitableTechniques: ['Digital printing', 'Screen printing', 'Block printing'],
    recommendedFabrics: ['fabric-001', 'fabric-002', 'fabric-004'],
    scale: 'Block repeat, 30" x 30"',
    style: 'Industrial Texture',
    thumbnail: 'abstract-texture-1'
  },
  {
    id: 'design-005',
    name: 'Chromatic Pulse',
    collection: 'exclusive',
    description: 'Rhythmic color gradations create optical vibration. A bold statement in color theory and surface activation.',
    category: 'Optical',
    colors: ['#E74C3C', '#F39C12', '#8E44AD', '#2C3E50'],
    designIntent: 'Op-art traditions meet contemporary color science in this exploration of visual rhythm and perceptual engagement.',
    suitableTechniques: ['Digital printing'],
    recommendedFabrics: ['fabric-003', 'fabric-004', 'fabric-006'],
    scale: 'Half-drop repeat, 48" x 48"',
    style: 'Op-Art Inspired',
    thumbnail: 'abstract-optical-1'
  },
  {
    id: 'design-006',
    name: 'Material Echo',
    collection: 'exclusive',
    description: 'Deconstructed material surfaces reveal hidden complexity. Layers of transparency and opacity create spatial depth.',
    category: 'Layered',
    colors: ['#34495E', '#BDC3C7', '#7F8C8D', '#2C3E50'],
    designIntent: 'Material archaeology — exposing the layers, marks, and histories embedded in surfaces over time.',
    suitableTechniques: ['Digital printing', 'Screen printing'],
    recommendedFabrics: ['fabric-002', 'fabric-004', 'fabric-006'],
    scale: 'Random match, 60" x 60"',
    style: 'Deconstructed Modernism',
    thumbnail: 'abstract-layered-1'
  }
];

export const processSteps = [
  {
    id: 1,
    title: 'Discover',
    description: 'Browse our curated library of production-ready surface patterns.'
  },
  {
    id: 2,
    title: 'Subscribe',
    description: 'Choose a plan that fits your design needs and budget.'
  },
  {
    id: 3,
    title: 'Download',
    description: 'Get high-resolution seamless patterns with commercial rights.'
  }
];

export const philosophyContent = {
  heading: 'Design-to-Print Intelligence',
  body: 'Kalapop exists at the intersection of curated design and thoughtful production. We help brands move from surface pattern to small-batch printing with design intelligence, trusted partners, and zero excess inventory.'
};

// Mock user for authenticated state
export const mockUser = {
  user_id: 'mock-user-001',
  name: 'Design Studio User',
  email: 'designer@example.com',
  picture: 'https://via.placeholder.com/150',
  tier: 'controlled',
  isAdmin: false,
  savedDesigns: ['design-001', 'design-003', 'design-004']
};

// Mock admin user
export const mockAdminUser = {
  user_id: 'admin-user-001',
  name: 'Kalapop Admin',
  email: 'admin@kalapop.design',
  picture: 'https://via.placeholder.com/150',
  tier: 'exclusive',
  isAdmin: true,
  savedDesigns: []
};
