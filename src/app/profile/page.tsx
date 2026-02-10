import { UnavailableSection } from "@/components/UnavailableSection/UnavailableSection";
import { PageTransition } from "@/components/PageTransition/PageTransition";

export default function Profile() {
  return (
    <PageTransition>
      <section>
        <div className="container">
          <UnavailableSection animate />
        </div>
      </section>
    </PageTransition>
  );
}