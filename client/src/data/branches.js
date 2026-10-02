/**
 * Static branch/location data for the homepage "3D orbit" Locations section
 * (see components/sections/BranchesPreview.jsx). This is the authoritative
 * source for branch photography, full addresses, and Google Maps links —
 * richer than the MongoDB-backed `/branches` API, which still powers the
 * full /branches listing page and /branches/:slug detail page (phone,
 * email, course and batch data).
 */
export const DEFAULT_BRANCH_IMAGE = "/branch-building.jpg";

function buildBranch(branch) {
  return {
    gallery: [],
    hasStudio: false,
    ...branch,
    slug: branch.id,
    heroImage: branch.img || DEFAULT_BRANCH_IMAGE
  };
}

export const CITY_BACKGROUNDS = {
  coimbatore: "/branch-building.jpg",
  hyderabad: "/branch-reception.jpg",
  kochi: "/branch-classroom.jpg",
  trivandrum: "/branch-building.jpg",
  vizag: "/branch-reception.jpg",
  tirupathi: "/branch-classroom.jpg",
  trichy: "/branch-building.jpg",
  salem: "/branch-reception.jpg"
};

export const BRANCHES = [
  buildBranch({
    id: 'gandhipuram-coimbatore',
    code: 'COIMBATORE',
    name: 'Gandhipuram',
    city: 'Coimbatore, Tamil Nadu',
    cityBgImage: CITY_BACKGROUNDS.coimbatore,
    address: 'Jay Enclave, 1084, 3rd St, Cross Cut Road, Gandhipuram, Coimbatore, Tamil Nadu 641012',
    gmapUrl: 'https://maps.app.goo.gl/VDFfTxUovDB8R1E6A',
    mapEmbedUrl: 'https://maps.google.com/maps?q=11.0175821,76.9682749&z=15&output=embed',
    img: '/branch-building.jpg',
    gallery: [
      { url: '/branch-building.jpg', title: 'Main Academy Building Exterior' },
      { url: '/branch-classroom.jpg', title: 'High-Tech Computer Training Lab' },
      { url: '/branch-reception.jpg', title: 'Student Counseling & Reception Lounge' },
    ],
  }),
  buildBranch({
    id: 'hope-college-coimbatore',
    code: 'COIMBATORE',
    name: 'Hope College',
    city: 'Coimbatore, Tamil Nadu',
    cityBgImage: CITY_BACKGROUNDS.coimbatore,
    address: 'Opposite GRG Ladies Hostel, Above Sneha Hospital, Hope College, Peelamedu, Coimbatore, Tamil Nadu 641004',
    gmapUrl: 'https://maps.app.goo.gl/JUknQRYXUoqyBUFn8',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Peelamedu+Hope+College+Coimbatore&z=14&output=embed',
    img: '/branch-classroom.jpg',
    gallery: [
      { url: '/branch-classroom.jpg', title: 'Hope College Computer Classroom' },
      { url: '/branch-reception.jpg', title: 'Reception & Student Services Desk' },
      { url: '/branch-building.jpg', title: 'Hope College Campus Building' },
    ],
  }),
  buildBranch({
    id: 'saravanampatti-coimbatore',
    code: 'COIMBATORE',
    name: 'Saravanampatti',
    city: 'Coimbatore, Tamil Nadu',
    cityBgImage: CITY_BACKGROUNDS.coimbatore,
    address: 'Promenade Tower, 1st Floor, No. 171/2A, Sathy Main Road, Saravanampatti, Coimbatore, Tamil Nadu 641035',
    gmapUrl: 'https://maps.app.goo.gl/desTgkBphapaQwxc8',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Saravanampatti+Coimbatore&z=14&output=embed',
    img: '/branch-reception.jpg',
    gallery: [
      { url: '/branch-reception.jpg', title: 'Promenade Tower Reception Lobby' },
      { url: '/branch-classroom.jpg', title: 'Medical Coding Workstation Lab' },
      { url: '/branch-building.jpg', title: 'Saravanampatti Tech Campus' },
    ],
  }),
  buildBranch({
    id: 'trichy',
    code: 'TRICHY',
    name: 'Trichy',
    city: 'Trichy, Tamil Nadu',
    cityBgImage: CITY_BACKGROUNDS.trichy,
    address: 'C-40, No. 25, 3rd Cross Road, Amil Towers, Thillai Nagar East, Tiruchirappalli, Tamil Nadu 620018',
    gmapUrl: 'https://maps.app.goo.gl/UDcpPgJKjnK2nLgF8',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Trichy+Cantonment&z=14&output=embed',
    img: '/branch-building.jpg',
    gallery: [
      { url: '/branch-building.jpg', title: 'Amil Towers Building Exterior' },
      { url: '/branch-classroom.jpg', title: 'Trichy Training Classroom' },
      { url: '/branch-reception.jpg', title: 'Reception Desk' },
    ],
  }),
  buildBranch({
    id: 'salem',
    code: 'SALEM',
    name: 'Salem',
    city: 'Salem, Tamil Nadu',
    cityBgImage: CITY_BACKGROUNDS.salem,
    address: '1st Floor, S Square Towers, Omalur Main Road, Arthanari Nagar, Mamangam, Salem, Tamil Nadu 636302',
    gmapUrl: 'https://maps.app.goo.gl/yzKjhCt24Q88d2aF6',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Five+Roads+Salem&z=14&output=embed',
    img: '/branch-classroom.jpg',
    gallery: [
      { url: '/branch-classroom.jpg', title: 'S Square Towers Training Lab' },
      { url: '/branch-reception.jpg', title: 'Salem Campus Reception' },
      { url: '/branch-building.jpg', title: 'Salem Building Entrance' },
    ],
  }),
  buildBranch({
    id: 'kochi',
    code: 'KOCHI',
    name: 'Kochi',
    city: 'Kochi, Kerala',
    cityBgImage: CITY_BACKGROUNDS.kochi,
    address: '4th floor, Vee Vee Tower, near Bhima Jewels, NH Bye Pass, Edappally, Kochi, Ernakulam, Kerala 682024',
    gmapUrl: 'https://maps.app.goo.gl/5EBy9zmVoEWgQvFG6',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Edappally+Kochi&z=14&output=embed',
    img: '/branch-reception.jpg',
    gallery: [
      { url: '/branch-reception.jpg', title: 'Vee Vee Tower Entrance Lounge' },
      { url: '/branch-classroom.jpg', title: 'Kochi Medical Coding Studio & Lab' },
      { url: '/branch-building.jpg', title: 'Edappally Tech Center Building' },
    ],
    hasStudio: true,
  }),
  buildBranch({
    id: 'trivandrum',
    code: 'TRIVANDRUM',
    name: 'Trivandrum',
    city: 'Thiruvananthapuram, Kerala',
    cityBgImage: CITY_BACKGROUNDS.trivandrum,
    address: '167, 1st Floor, Karimpanal Arcade, Opp. Padmanabhaswamy Temple, East Fort, Thiruvananthapuram, Kerala 695024',
    gmapUrl: 'https://maps.app.goo.gl/qpobuXhdniRo4KyBA',
    mapEmbedUrl: 'https://maps.google.com/maps?q=East+Fort+Trivandrum&z=14&output=embed',
    img: '/branch-building.jpg',
    gallery: [
      { url: '/branch-building.jpg', title: 'Karimpanal Arcade Exterior' },
      { url: '/branch-classroom.jpg', title: 'Trivandrum Computer Classroom' },
      { url: '/branch-reception.jpg', title: 'Student Counseling Desk' },
    ],
  }),
  buildBranch({
    id: 'vizag',
    code: 'VIZAG',
    name: 'Vizag',
    city: 'Visakhapatnam, Andhra Pradesh',
    cityBgImage: CITY_BACKGROUNDS.vizag,
    address: '7th Floor, IT Grand Palace, 701/A, 1st Lane, Dwaraka Nagar, Visakhapatnam, Andhra Pradesh 530016',
    gmapUrl: 'https://maps.app.goo.gl/8egQEHLdf7DjcwBK8',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Dwaraka+Nagar+Visakhapatnam&z=14&output=embed',
    img: '/branch-classroom.jpg',
    gallery: [
      { url: '/branch-classroom.jpg', title: 'IT Grand Palace Computer Lab' },
      { url: '/branch-reception.jpg', title: 'Vizag Campus Reception' },
      { url: '/branch-building.jpg', title: 'Dwaraka Nagar Tech Tower' },
    ],
  }),
  buildBranch({
    id: 'tirupathi',
    code: 'TIRUPATHI',
    name: 'Tirupathi',
    city: 'Tirupati, Andhra Pradesh',
    cityBgImage: CITY_BACKGROUNDS.tirupathi,
    address: 'Korlagunta Main Road, Near Railway Station, Tirupati, Andhra Pradesh 517501',
    gmapUrl: 'https://maps.app.goo.gl/iDBPqZmVWGZ8skE36',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Korlagunta+Tirupati&z=14&output=embed',
    img: '/branch-reception.jpg',
    gallery: [
      { url: '/branch-reception.jpg', title: 'Tirupati Reception & Counseling Desk' },
      { url: '/branch-classroom.jpg', title: 'Tirupati Training Hall' },
      { url: '/branch-building.jpg', title: 'Academy Building View' },
    ],
  }),
  buildBranch({
    id: 'ameerpet-hyderabad',
    code: 'HYDERABAD',
    name: 'Ameerpet',
    city: 'Hyderabad, Telangana',
    cityBgImage: CITY_BACKGROUNDS.hyderabad,
    address: 'No. 606/A, Level 6, Vasavi MPM Grand, Yellareddyguda, Ameerpet X Road, Hyderabad, Telangana 500073',
    gmapUrl: 'https://maps.app.goo.gl/XDz2X9graW1t4UKU7',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Ameerpet+Metro+Hyderabad&z=14&output=embed',
    img: '/branch-building.jpg',
    gallery: [
      { url: '/branch-building.jpg', title: 'Vasavi MPM Grand Commercial Tower' },
      { url: '/branch-classroom.jpg', title: 'Ameerpet Computer Training Workstations' },
      { url: '/branch-reception.jpg', title: 'Executive Reception & Student Lounge' },
    ],
  }),
  buildBranch({
    id: 'dilsukhnagar-hyderabad',
    code: 'HYDERABAD',
    name: 'Dilsukhnagar',
    city: 'Hyderabad, Telangana',
    cityBgImage: CITY_BACKGROUNDS.hyderabad,
    address: 'Sai Towers, 2nd Floor, H.No: 16-11-477/6/1/A, Near Pillar No. 1519, Dilsukhnagar, Hyderabad, Telangana 500102',
    gmapUrl: 'https://maps.app.goo.gl/evaduEaUU1w8qBby8',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Dilsukhnagar+Hyderabad&z=14&output=embed',
    img: '/branch-classroom.jpg',
    gallery: [
      { url: '/branch-classroom.jpg', title: 'Sai Towers Training Classroom' },
      { url: '/branch-reception.jpg', title: 'Dilsukhnagar Reception Nook' },
      { url: '/branch-building.jpg', title: 'Dilsukhnagar Metro Center Building' },
    ],
  }),
];

export default BRANCHES;

