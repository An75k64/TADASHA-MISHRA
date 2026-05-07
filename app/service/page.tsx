import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ServiceShowcase } from "@/components/service-showcase";

export default function ServicePage() {
  return (
    <Container className="py-20">
      <SectionHeading
        eyebrow="Career"
        title="Career & Experience"
      />
      <div className="mt-8 max-w-4xl space-y-5 text-lg leading-8 text-ink/75">
        <p>
          Tadasha Mishra began her career in the Indian Police Service in 1994 and brings over three decades of experience in policing and administration. Following the formation of Jharkhand in 2000, she became part of the Jharkhand cadre and has since played a key role in the state&apos;s policing framework.
        </p>
        <p>
          In the early years of her career, she served in important field positions across districts such as Giridih and Bokaro, and also held the role of City SP in Ranchi. These assignments helped shape her understanding of on-ground policing and operational challenges.
        </p>
        <p>
          Over time, she established a reputation as a composed and firm officer, known for her administrative clarity and ability to handle responsibilities across both field and leadership roles.
        </p>
        <blockquote className="border-l-4 border-bronze/70 pl-4 italic text-ink/80">
          Over three decades of service across field operations and senior leadership roles.
        </blockquote>
      </div>
      <ServiceShowcase />
    </Container>
  );
}
