// Mock data for Kalapop B2B Surface Design Studio

export const collections = [
  {
    id: 'starter',
    name: 'Starter Collection',
    tier: 'starter',
    description: 'Entry-level access to curated surface patterns. Perfect for small boutiques and emerging designers exploring textile possibilities.',
    designCount: 25,
    priceRange: 'Accessible pricing for startups',
    features: [
      'Access to 25 base patterns',
      'Standard resolution files',
      'Email support',
      'Single user license'
    ]
  },
  {
    id: 'controlled',
    name: 'Controlled Collection',
    tier: 'controlled',
    description: 'Expanded library with exclusive patterns and priority access. Ideal for established brands seeking distinctive surface design.',
    designCount: 75,
    priceRange: 'Professional tier pricing',
    features: [
      'Access to 75 premium patterns',
      'High resolution files',
      'Priority support',
      'Up to 3 user licenses',
      'Early access to new releases'
    ]
  },
  {
    id: 'exclusive',
    name: 'Exclusive Collection',
    tier: 'exclusive',
    description: 'Complete archive with custom design consultation. For design houses requiring bespoke surface solutions and unlimited creative freedom.',
    designCount: '150+',
    priceRange: 'Premium enterprise pricing',
    features: [
      'Full pattern library access',
      'Ultra-high resolution files',
      'Dedicated design consultant',
      'Unlimited user licenses',
      'Custom pattern development',
      'Exclusive colorway options'
    ]
  }
];

export const designs = [
  {
    id: 'design-001',
    name: 'Geometric Horizon',
    collection: 'starter',
    description: 'A bold exploration of linear repetition and architectural rhythm. This pattern creates depth through layered geometric forms.',
    category: 'Geometric',
    colors: ['#d9fb06', '#1a1c1b', '#dfddd6'],
    suitability: 'Upholstery, Wall coverings, Packaging',
    repeat: 'Half-drop repeat, 24" x 24"',
    style: 'Contemporary Minimalist',
    thumbnail: 'abstract-geometric-1'
  },
  {
    id: 'design-002',
    name: 'Organic Flow',
    collection: 'starter',
    description: 'Fluid forms inspired by natural erosion patterns. Seamless movement across surface creates calm visual continuity.',
    category: 'Organic',
    colors: ['#3f4816', '#dfddd6', '#888680'],
    suitability: 'Apparel, Home textiles, Soft furnishings',
    repeat: 'Block repeat, 18" x 18"',
    style: 'Biomorphic Abstract',
    thumbnail: 'abstract-organic-1'
  },
  {
    id: 'design-003',
    name: 'Fractured Light',
    collection: 'controlled',
    description: 'Angular planes intersect to capture shifting perspectives. A study in controlled chaos and visual tension.',
    category: 'Abstract',
    colors: ['#d9fb06', '#302f2c', '#f8d47a'],
    suitability: 'Statement walls, Large format textiles, Commercial interiors',
    repeat: 'Full drop repeat, 36" x 36"',
    style: 'Architectural Abstract',
    thumbnail: 'abstract-angular-1'
  },
  {
    id: 'design-004',
    name: 'Woven Memory',
    collection: 'controlled',
    description: 'Grid structures break and reform, suggesting textile construction at macro scale. Digital interpretation of hand-woven texture.',
    category: 'Textural',
    colors: ['#888680', '#dfddd6', '#302f2c'],
    suitability: 'Upholstery, Contract textiles, Hospitality design',
    repeat: 'Block repeat, 30" x 30"',
    style: 'Industrial Texture',
    thumbnail: 'abstract-texture-1'
  },
  {
    id: 'design-005',
    name: 'Chromatic Pulse',
    collection: 'exclusive',
    description: 'Rhythmic color gradations create optical vibration. A bold statement in color theory and surface activation.',
    category: 'Optical',
    colors: ['#d9fb06', '#f8d47a', '#3f4816', '#1a1c1b'],
    suitability: 'Feature walls, Retail environments, Brand spaces',
    repeat: 'Half-drop repeat, 48" x 48"',
    style: 'Op-Art Inspired',
    thumbnail: 'abstract-optical-1'
  },
  {
    id: 'design-006',
    name: 'Material Echo',
    collection: 'exclusive',
    description: 'Deconstructed material surfaces reveal hidden complexity. Layers of transparency and opacity create spatial depth.',
    category: 'Layered',
    colors: ['#302f2c', '#dfddd6', '#888680', '#1a1c1b'],
    suitability: 'Luxury textiles, High-end furnishings, Bespoke applications',
    repeat: 'Random match, 60" x 60"',
    style: 'Deconstructed Modernism',
    thumbnail: 'abstract-layered-1'
  }
];

export const howItWorksSteps = [
  {
    step: 1,
    title: 'Browse Collections',
    description: 'Explore our curated tiers — Starter, Controlled, or Exclusive. Each collection offers distinct pattern libraries tailored to different creative needs.'
  },
  {
    step: 2,
    title: 'Sign Up & Access',
    description: 'Create your account with simple Google authentication. Choose your tier and gain immediate access to your design library.'
  },
  {
    step: 3,
    title: 'Download & Create',
    description: 'Access high-resolution files, request custom orders, and bring surface design excellence to your projects.'
  }
];

export const philosophyContent = {
  heading: 'Pattern as Language',
  subheading: 'We believe surface design is a visual dialect — communicating texture, rhythm, and material thinking without words.',
  body: 'Kalapop exists at the intersection of digital craft and textile tradition. Our patterns are designed for contemporary spaces, thoughtful brands, and designers who understand that surfaces speak.'
};

// Mock user for authenticated state
export const mockUser = {
  user_id: 'mock-user-001',
  name: 'Design Studio User',
  email: 'designer@example.com',
  picture: 'https://via.placeholder.com/150',
  tier: 'controlled',
  savedDesigns: ['design-001', 'design-003', 'design-004']
};
