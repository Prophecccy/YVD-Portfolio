export interface Sofa {
  id: number;
  src: string;
  name: string;
  category: 'sectional' | 'sofa' | 'loveseat' | 'chair';
  description: string;
  dimensions: string;
  fabrics: string[];
  features: string[];
}

export const SOFA_CATALOG: Sofa[] = [
  {
    id: 1,
    src: '/portfolio/sofa-1.jpg',
    name: 'The Silverstone Sectional',
    category: 'sectional',
    description: 'A monolithic, low-slung sectional engineered for modern open-plan living. Impeccable proportions meet plush, deep-seated comfort.',
    dimensions: '340cm W x 180cm D x 72cm H',
    fabrics: ['Argentine Bouclé', 'Slate Herringbone', 'Chalk Linen'],
    features: ['Modular alignment', 'High-density down wrap', 'Solid beechwood frame']
  },
  {
    id: 2,
    src: '/portfolio/sofa-2.jpg',
    name: 'The Sovereign Velvet Chaise',
    category: 'sofa',
    description: 'An elegant statement chaise lounge finished in deep velvet. Designed with sleek contours that capture architectural shadows.',
    dimensions: '220cm W x 105cm D x 80cm H',
    fabrics: ['Imperial Emerald Velvet', 'Royal Sapphire Velvet', 'Midnight Onyx Velvet'],
    features: ['Polished brass stiletto legs', 'Hand-tufted detailing', 'Ergonomic lumbar support']
  },
  {
    id: 3,
    src: '/portfolio/sofa-3.jpg',
    name: 'The Emerald Diamond Quilt',
    category: 'sofa',
    description: 'A dramatic, masterfully upholstered sofa highlighting rich diamond quilting. Combines classical symmetry with contemporary profiles.',
    dimensions: '240cm W x 95cm D x 78cm H',
    fabrics: ['Emerald Mohair Velvet', 'Forest Green Chenille', 'Sage Matte Velvet'],
    features: ['Diamond-quilted exterior panels', 'Reinforced spring suspension', 'Gold leaf steel trim']
  },
  {
    id: 4,
    src: '/portfolio/sofa-4.jpg',
    name: 'The Milanese Silhouette',
    category: 'sofa',
    description: 'Inspired by mid-century Milanese design, featuring sweeping curves and a floating base platform. Pure understated opulence.',
    dimensions: '230cm W x 100cm D x 75cm H',
    fabrics: ['Alabaster Tweed', 'Oatmeal Wool Blend', 'Camel Nubuck Leather'],
    features: ['Curvilinear geometry', 'Exposed solid walnut base', 'Seamless memory foam cores']
  },
  {
    id: 5,
    src: '/portfolio/sofa-5.jpg',
    name: 'The Botanical Print Loveseat',
    category: 'loveseat',
    description: 'A striking statement loveseat featuring a bespoke botanical jacquard print, designed to serve as an organic accent centerpiece.',
    dimensions: '180cm W x 90cm D x 82cm H',
    fabrics: ['Jacquard Foliage Print', 'Forest Tapestry Cotton', 'Off-White Slub Linen'],
    features: ['Custom weave pattern', 'Turned mahogany feet', 'Plush feather-mix back cushions']
  },
  {
    id: 6,
    src: '/portfolio/sofa-6.jpg',
    name: 'The Nordic Mint Loveseat',
    category: 'loveseat',
    description: 'Clean Scandinavian lines paired with a refreshing mint hue. Brings structural serenity and light to minimalist interiors.',
    dimensions: '170cm W x 88cm D x 78cm H',
    fabrics: ['Sage Wool felt', 'Pistachio Ribbed Corduroy', 'Chalk Twill'],
    features: ['Tapered natural ash legs', 'Reversible seat cushions', 'Sleek thin-arm profile']
  },
  {
    id: 7,
    src: '/portfolio/sofa-7.jpg',
    name: 'The Sahara Olive Modular',
    category: 'sectional',
    description: 'A highly configurable modular system draped in olive linen. Infinite flexibility meets relaxed architectural luxury.',
    dimensions: '360cm W x 270cm D x 68cm H',
    fabrics: ['Sahara Olive Washed Linen', 'Tobacco Heavy Linen', 'Sandstone Linen'],
    features: ['Interlocking sectional brackets', 'Removable double-stitched covers', 'Extra-deep lounging deck']
  },
  {
    id: 8,
    src: '/portfolio/sofa-8.jpg',
    name: 'The Rosewood Contour Quartet',
    category: 'sectional',
    description: 'A striking semi-circular sectional configuration with custom-molded contour lines, anchored on a recessed rosewood plinth.',
    dimensions: '320cm W x 220cm D x 70cm H',
    fabrics: ['Burnt Sienna Velvet', 'Warm Terracotta Bouclé', 'Cognac Aniline Leather'],
    features: ['Contoured modular curvature', 'Solid rosewood plinth base', 'High-resilience orthopaedic core']
  },
  {
    id: 9,
    src: '/portfolio/sofa-9.jpg',
    name: 'The Graphite Stiletto L-Shape',
    category: 'sectional',
    description: 'Bold, masculine angles wrapped in sleek graphite weave. Supported by razor-sharp steel legs for a weightless floating look.',
    dimensions: '290cm W x 165cm D x 72cm H',
    fabrics: ['Graphite Slate Weave', 'Charcoal Wool Flannel', 'Noir Matte Leather'],
    features: ['Gunmetal stiletto legs', 'Adjustable dynamic headrests', 'Pocketed coil spring support']
  },
  {
    id: 10,
    src: '/portfolio/sofa-10.jpg',
    name: 'The Imperial Cocoa Cinema Set',
    category: 'sectional',
    description: 'The ultimate lounging theater setup. Expansive, comfortable, and finished in rich cocoa chenille for cinematic indulgence.',
    dimensions: '380cm W x 200cm D x 75cm H',
    fabrics: ['Imperial Cocoa Chenille', 'Espresso Plush Velvet', 'Taupe Cashmere Blend'],
    features: ['Integrated side-table armrests', 'Dual chaise extensions', 'Zero-gravity feather bedding']
  },
  {
    id: 11,
    src: '/portfolio/sofa-11.jpg',
    name: 'The Havana Velvet Modular',
    category: 'sectional',
    description: 'Rich, deep Havana velvet meets modular flexibility. Highly cozy blocks that rearrange to match changing interior aesthetics.',
    dimensions: '330cm W x 220cm D x 70cm H',
    fabrics: ['Havana Amber Velvet', 'Spiced Bronze Velvet', 'Ochre Matte Velvet'],
    features: ['Fluted channel upholstery', 'Concealed connectors', 'Feather-blend block support']
  },
  {
    id: 12,
    src: '/portfolio/sofa-12.jpg',
    name: 'The Valencia Accent Chair',
    category: 'chair',
    description: 'A sculptural, high-end accent chair showcasing striking mid-century shapes and premium solid oak joinery.',
    dimensions: '82cm W x 85cm D x 76cm H',
    fabrics: ['Valencia Mustard Bouclé', 'Parchment Textured Weave', 'Tan Saddle Leather'],
    features: ['Solid white oak exposed frame', 'Dowelled tenon joints', 'Hand-stitched leather bindings']
  },
  {
    id: 13,
    src: '/portfolio/sofa-13.jpg',
    name: 'The Sienna Channel Loveseat',
    category: 'loveseat',
    description: 'A compact sofa highlighted by beautiful vertical channel tufting. Exudes retro elegance and refined geometry.',
    dimensions: '190cm W x 92cm D x 80cm H',
    fabrics: ['Sienna Rust Velvet', 'Cognac Ribbed Corduroy', 'Vanilla Linen Blend'],
    features: ['Deep channel tufting', 'Stained walnut stiletto feet', 'Reinforced serpentine springs']
  },
  {
    id: 14,
    src: '/portfolio/sofa-14.jpg',
    name: 'The Champagne Gold L-Shape',
    category: 'sectional',
    description: 'Brushed metal framing meets light champagne linen. A bright, architectural statement that elevates open spaces.',
    dimensions: '310cm W x 175cm D x 74cm H',
    fabrics: ['Champagne Linen Mix', 'Ivory Cashmere Flannel', 'Pearl Bouclé'],
    features: ['Satin champagne gold framing', 'Floating seat aesthetic', 'Luxurious duck-down layer']
  },
  {
    id: 15,
    src: '/portfolio/sofa-15.jpg',
    name: 'The Azure Heritage Chair',
    category: 'chair',
    description: 'An elegant occasional chair celebrating heritage craftsmanship, highlighting beautiful hand-carved mahogany scrollwork.',
    dimensions: '78cm W x 80cm D x 90cm H',
    fabrics: ['Azure Royal Brocade', 'Deep Sea Velvet', 'Sky Blue Linen'],
    features: ['Hand-carved mahogany scroll legs', 'Plush feather-inlaid crown', 'Traditional brass nailhead trim']
  },
  {
    id: 16,
    src: '/portfolio/sofa-16.jpg',
    name: 'The Mint Cherrywood Tub Chair',
    category: 'chair',
    description: 'A beautifully rounded luxury tub chair wrapped in mint velvet and hugged by a solid dark cherrywood outer shell.',
    dimensions: '85cm W x 82cm D x 74cm H',
    fabrics: ['Mint Sorbet Velvet', 'Seafoam Velvet', 'Chalk Wool'],
    features: ['Solid cherrywood exterior wrap', 'Polished lacquer finish', '360-degree silent dynamic swivel']
  },
  {
    id: 17,
    src: '/portfolio/sofa-17.jpg',
    name: 'The Sculptural Cream Chair',
    category: 'chair',
    description: 'A pure artistic form masquerading as an armchair. Features sweeping seamless contours upholstered in dense cream bouclé.',
    dimensions: '90cm W x 92cm D x 72cm H',
    fabrics: ['Cream Royal Bouclé', 'Oatmeal Alpaca Weave', 'White Teddy Felt'],
    features: ['Seamless internal fiberglass frame', '3D sculpted cushion core', 'Zero hard edges']
  },
  {
    id: 19,
    src: '/portfolio/sofa-19.jpg',
    name: 'The Sovereign Blue High-Back',
    category: 'chair',
    description: 'An imposing, high-backed reading chair designed to offer exceptional privacy and commanding presence.',
    dimensions: '92cm W x 95cm D x 110cm H',
    fabrics: ['Sovereign Blue Felt', 'Navy Tweed', 'Steely Grey Wool'],
    features: ['Acoustic privacy high-back wings', 'Extra lumbar bolster cushion', 'Solid brushed brass pedestal base']
  },
  {
    id: 20,
    src: '/portfolio/sofa-20.jpg',
    name: 'The Classic Gold Wingback',
    category: 'chair',
    description: 'A timeless wingback chair updated with high-end gold upholstery and sleek black lacquered legs. Heritage re-engineered.',
    dimensions: '88cm W x 90cm D x 102cm H',
    fabrics: ['Classic Gold Brocade', 'Gilded Ochre Velvet', 'Amber Matte Silk'],
    features: ['Traditional wingback architecture', 'Solid oak hand-turned legs', 'Deep-button diamond tufting']
  },
  {
    id: 21,
    src: '/portfolio/sofa-21.jpg',
    name: 'The Windsor Tufted Chesterfield',
    category: 'sofa',
    description: 'A classic English Chesterfield sofa reimagined for the modern home. Meticulous diamond-pattern tufting meets deep luxurious comfort.',
    dimensions: '245cm W x 98cm D x 76cm H',
    fabrics: ['Deep Sapphire Velvet', 'Oxblood Hand-Rubbed Leather', 'English Sage Wool'],
    features: ['Deep diamond button tufting', 'Solid brass caster wheels', 'Kiln-dried ash frame']
  },
  {
    id: 22,
    src: '/portfolio/sofa-22.jpg',
    name: 'The Tuscany Travertine Sectional',
    category: 'sectional',
    description: 'A low-profile modular sectional system embodying warm Italian elegance. Anchored with modular base plinths and premium travertine side deck panels.',
    dimensions: '350cm W x 280cm D x 70cm H',
    fabrics: ['Oatmeal Textured Weave', 'Parchment Belgian Linen', 'Warm Taupe Bouclé'],
    features: ['Low-profile modular base', 'Recessed travertine side deck', 'Feather-fill envelope']
  },
  {
    id: 23,
    src: '/portfolio/sofa-23.jpg',
    name: 'The Florentine Silk Scroll Loveseat',
    category: 'loveseat',
    description: 'An elegant statement loveseat exhibiting traditional Italian craftsmanship. Highlighting hand-carved mahogany scrollwork arms accented by delicate gold leaf trim.',
    dimensions: '185cm W x 92cm D x 84cm H',
    fabrics: ['Florentine Damask Silk', 'Ivory Jacquard Weave', 'Vintage Rose Velvet'],
    features: ['Classic hand-carved scrollwork arms', 'Gilded leaf accents', 'High-crown down seat']
  },
  {
    id: 24,
    src: '/portfolio/sofa-24.jpg',
    name: 'The Monaco Bouclé Accent Chair',
    category: 'chair',
    description: 'A highly sculptural armchair celebrating clean organic curves. Upholstered in premium, heavy bouclé and set on a silent brass swivel base.',
    dimensions: '85cm W x 88cm D x 74cm H',
    fabrics: ['Monaco Alabaster Bouclé', 'Caramel Teddy Weave', 'Midnight Black Wool'],
    features: ['Asymmetrical curved backrest', '360 silent brass swivel base', 'High-resilience foam core']
  },
  {
    id: 25,
    src: '/portfolio/sofa-25.jpg',
    name: 'The Manhattan Floating Corner',
    category: 'sectional',
    description: 'A striking asymmetrical sectional built for high-end urban flats. Featuring deep lounging decks supported by a recessed floating plinth.',
    dimensions: '330cm W x 175cm D x 72cm H',
    fabrics: ['Slate Herringbone Tweed', 'Charcoal Wool Blend', 'Chalk White Bouclé'],
    features: ['Recessed plinth floating base', 'Integrated brushed steel console', 'Dense pocket-spring deck']
  },
  {
    id: 26,
    src: '/portfolio/sofa-26.jpg',
    name: 'The Royal Sandringham Sofa',
    category: 'sofa',
    description: 'An iconic English salon sofa showcasing beautiful floral brocades and hand-finished upholstery panels.',
    dimensions: '230cm W x 95cm D x 82cm H',
    fabrics: ['Sandringham Floral Brocade', 'Forest Green Velvet', 'Oatmeal Slub Linen'],
    features: ['Turned mahogany legs', 'Traditional feather-wrap cushioning', 'Hand-pinned brass trim']
  },
  {
    id: 27,
    src: '/portfolio/sofa-27.jpg',
    name: 'The Kyoto Minimalist Loveseat',
    category: 'loveseat',
    description: 'A minimalist masterpiece combining Japanese simplicity with Scandinavian warmth. Bound by a solid ash wood slatted wrap-around frame.',
    dimensions: '175cm W x 86cm D x 76cm H',
    fabrics: ['Kyoto Moss Linen', 'Natural Chalk Weave', 'Warm Terracotta Linen'],
    features: ['Solid ash wood slatted wrap frame', 'Danish oil finish', 'Sleek high-density profile']
  },
  {
    id: 28,
    src: '/portfolio/sofa-28.jpg',
    name: 'The Venetian High-Back Salon Chair',
    category: 'chair',
    description: 'A stately high-backed salon chair featuring signature privacy wings and graceful walnut cabriole legs.',
    dimensions: '90cm W x 92cm D x 105cm H',
    fabrics: ['Venetian Crimson Velvet', 'Royal Navy Silk', 'Gilded Ochre Velvet'],
    features: ['Dramatic high-back privacy wings', 'Solid walnut cabriole legs', 'Bespoke goose-feather crown']
  }
];
