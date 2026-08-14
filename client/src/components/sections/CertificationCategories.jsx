import SectionHeading from "../SectionHeading";
import RevealOnScroll from "../RevealOnScroll";

const categories = [
  {
    name: "AAPC",
    codes: ["CPC", "CIC", "COC", "CPMA", "CRC", "CPB", "CEDC", "CEMC", "CDEO", "CDEI", "CPPM"]
  },
  {
    name: "Specialty Training",
    codes: ["Surgery", "ED", "EM", "Radiology", "Anesthesia", "IP DRG", "HCC", "IVR", "CDI"]
  },
  {
    name: "AHIMA",
    codes: ["CCS", "CCS-P", "RHIA", "RHIT"]
  },
  {
    name: "HIMAA",
    codes: ["CCC", "HIM"]
  }
];

export default function CertificationCategories() {
  return (
    <section className="section-pad bg-white pt-0">
      <div className="container-max">
        <SectionHeading
          eyebrow="Certifications"
          title="Certification bodies & specialty tracks we prepare you for"
          subtitle="Every course maps to a recognized credential — from foundational AAPC certifications to specialty and health-information tracks."
        />

        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {categories.map((category, i) => (
              <RevealOnScroll key={category.name} delay={i * 0.08}>
                <div>
                  <h3 className="text-navy-900 font-semibold text-base md:text-lg tracking-wide">
                    {category.name}
                  </h3>
                  <span className="block h-0.5 w-10 bg-teal-500 mt-2 mb-5" />
                  <ul className="flex flex-col">
                    {category.codes.map((code) => (
                      <li
                        key={code}
                        className="text-navy-900/70 text-sm md:text-[15px] py-2.5 border-b border-navy-900/8 last:border-b-0"
                      >
                        {code}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
