/**
 * The 14 chapters of "The Encyclopedia of Academic Branches".
 * Each entry fills exactly one book spread: the left page carries the
 * heading, illustration and introduction; the right page the subjects,
 * careers and call to action. `icon` is a lucide-react icon name.
 */
export const ACADEMIC_BRANCHES = [
  {
    id: "mathematics",
    name: "Mathematics",
    epithet: "The Language of Pattern",
    icon: "Sigma",
    intro:
      "The study of quantity, structure, space and change. Mathematics gives every other science its grammar, from the proofs of Euclid to the algorithms that steer modern machines.",
    subjects: ["Pure Mathematics", "Applied Mathematics", "Statistics", "Algebra & Number Theory", "Calculus & Analysis", "Operations Research"],
    careers: ["Data Scientist", "Actuary", "Quantitative Analyst", "Cryptographer", "Professor & Researcher"],
    href: "/courses",
  },
  {
    id: "physics",
    name: "Physics",
    epithet: "The Laws of Nature",
    icon: "Atom",
    intro:
      "Physics seeks the fundamental rules that govern matter, energy, motion and time, from the smallest quantum particle to the vast architecture of the cosmos.",
    subjects: ["Classical Mechanics", "Quantum Physics", "Thermodynamics", "Electromagnetism", "Astrophysics", "Optics"],
    careers: ["Research Scientist", "Aerospace Engineer", "Medical Physicist", "Energy Analyst", "Astronomer"],
    href: "/courses",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    epithet: "The Science of Transformation",
    icon: "FlaskConical",
    intro:
      "Chemistry explores the composition and behaviour of substances and the reactions that transform them. It sits at the heart of medicine, industry and everyday materials.",
    subjects: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Chemistry", "Biochemistry", "Polymer Science"],
    careers: ["Pharmaceutical Chemist", "Forensic Scientist", "Materials Engineer", "Quality Analyst", "Chemical Researcher"],
    href: "/courses",
  },
  {
    id: "biology",
    name: "Biology",
    epithet: "The Study of Life",
    icon: "Dna",
    intro:
      "Biology examines living organisms, from the code written in DNA to whole ecosystems, and asks how life grows, adapts, inherits and endures.",
    subjects: ["Genetics", "Microbiology", "Ecology", "Cell & Molecular Biology", "Zoology & Botany", "Biotechnology"],
    careers: ["Biotechnologist", "Geneticist", "Clinical Research Associate", "Environmental Scientist", "Microbiologist"],
    href: "/courses",
  },
  {
    id: "medicine",
    name: "Medicine & Health Sciences",
    epithet: "The Art of Healing",
    icon: "Stethoscope",
    intro:
      "The noblest of applied sciences, devoted to preventing, diagnosing and treating illness. Today it spans the bedside, the laboratory and the health-information systems that support them.",
    subjects: ["Anatomy & Physiology", "Pathology", "Pharmacology", "Public Health", "Nursing Sciences", "Medical Coding & Health Informatics"],
    careers: ["Physician", "Medical Coder", "Clinical Data Analyst", "Pharmacist", "Healthcare Administrator"],
    href: "/courses",
  },
  {
    id: "engineering",
    name: "Engineering",
    epithet: "The Craft of Building",
    icon: "Cog",
    intro:
      "Engineering applies science to design and build: bridges and turbines, circuits and spacecraft. It turns principle into structures and machines that serve society.",
    subjects: ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Chemical Engineering", "Aeronautics", "Robotics"],
    careers: ["Design Engineer", "Structural Engineer", "Project Manager", "Automation Specialist", "Systems Engineer"],
    href: "/courses",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    epithet: "The Logic of Machines",
    icon: "Cpu",
    intro:
      "Computer science studies computation itself: algorithms, data, software and intelligent systems. It is the youngest branch in this volume and perhaps the fastest growing.",
    subjects: ["Algorithms & Data Structures", "Artificial Intelligence", "Software Engineering", "Cybersecurity", "Databases", "Computer Networks"],
    careers: ["Software Engineer", "AI / ML Engineer", "Security Analyst", "Cloud Architect", "Product Developer"],
    href: "/courses",
  },
  {
    id: "economics",
    name: "Economics & Commerce",
    epithet: "The Study of Choice",
    icon: "Landmark",
    intro:
      "Economics examines how individuals, firms and nations allocate scarce resources. Commerce applies these insights to trade, finance and the management of enterprise.",
    subjects: ["Microeconomics", "Macroeconomics", "Accounting", "Finance & Banking", "Business Management", "Econometrics"],
    careers: ["Economist", "Chartered Accountant", "Financial Analyst", "Business Consultant", "Policy Advisor"],
    href: "/courses",
  },
  {
    id: "law",
    name: "Law",
    epithet: "The Order of Society",
    icon: "Scale",
    intro:
      "Law is the system of rules by which societies govern conduct, settle disputes and protect rights. Its study combines reasoning, rhetoric and a deep regard for justice.",
    subjects: ["Constitutional Law", "Criminal Law", "Corporate Law", "International Law", "Intellectual Property", "Human Rights"],
    careers: ["Advocate", "Corporate Counsel", "Judge", "Legal Analyst", "Compliance Officer"],
    href: "/courses",
  },
  {
    id: "psychology",
    name: "Psychology",
    epithet: "The Science of Mind",
    icon: "Brain",
    intro:
      "Psychology investigates thought, emotion and behaviour. Through experiment and observation it asks why we act as we do and how minds develop, falter and heal.",
    subjects: ["Cognitive Psychology", "Clinical Psychology", "Developmental Psychology", "Social Psychology", "Neuroscience", "Organisational Psychology"],
    careers: ["Clinical Psychologist", "Counsellor", "HR Specialist", "UX Researcher", "Neuropsychologist"],
    href: "/courses",
  },
  {
    id: "history",
    name: "History",
    epithet: "The Memory of Mankind",
    icon: "Hourglass",
    intro:
      "History reconstructs the human past from records, ruins and remembrance. By studying where we have been, it explains much of where we stand today.",
    subjects: ["Ancient Civilisations", "Medieval History", "Modern World History", "Archaeology", "Historiography", "Art History"],
    careers: ["Historian", "Archivist", "Museum Curator", "Archaeologist", "Heritage Consultant"],
    href: "/courses",
  },
  {
    id: "literature",
    name: "Literature & Languages",
    epithet: "The Voice of Culture",
    icon: "Feather",
    intro:
      "Literature studies the written word, from epic and verse to the modern novel, while linguistics examines the structure of language itself. Together they illuminate how we speak and dream.",
    subjects: ["English Literature", "Comparative Literature", "Linguistics", "Creative Writing", "Translation Studies", "Classical Languages"],
    careers: ["Author & Editor", "Journalist", "Translator", "Content Strategist", "Lecturer"],
    href: "/courses",
  },
  {
    id: "philosophy",
    name: "Philosophy",
    epithet: "The Love of Wisdom",
    icon: "Lightbulb",
    intro:
      "The oldest of the academic branches, philosophy questions knowledge, existence, reason and ethics, and gave birth in time to nearly every other discipline in this volume.",
    subjects: ["Logic", "Ethics", "Metaphysics", "Epistemology", "Political Philosophy", "Aesthetics"],
    careers: ["Ethicist", "Policy Analyst", "Academic Philosopher", "Legal Scholar", "Editor & Writer"],
    href: "/courses",
  },
  {
    id: "fine-arts",
    name: "Fine Arts & Architecture",
    epithet: "The Pursuit of Beauty",
    icon: "Palette",
    intro:
      "The fine arts give form to imagination through painting, sculpture, music and design, and architecture shapes the spaces in which life unfolds.",
    subjects: ["Painting & Drawing", "Sculpture", "Music", "Architecture", "Graphic Design", "Performing Arts"],
    careers: ["Architect", "Designer", "Artist", "Art Director", "Musician & Composer"],
    href: "/courses",
  },
];
