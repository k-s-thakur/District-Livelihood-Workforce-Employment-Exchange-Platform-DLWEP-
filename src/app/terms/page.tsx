import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | DLWEP",
  description:
    "The terms governing access to and use of the DLWEP workforce and employment platform.",
};

const sections = [
  {
    title: "1. Acceptance of these terms",
    content: (
      <p>
        By accessing DLWEP, creating an account, publishing a profile or requirement,
        requesting a service, applying for work, or otherwise using the Platform, you
        agree to these Terms & Conditions and the Privacy Policy. If you do not agree,
        do not use the Platform.
      </p>
    ),
  },
  {
    title: "2. About DLWEP",
    content: (
      <>
        <p>
          DLWEP is a district workforce and employment exchange platform that supports
          training, certification, worker discovery, service requests, manpower hiring,
          job tracking, ratings, and programme reporting.
        </p>
        <p>
          Unless expressly stated for a particular programme, DLWEP is a technology
          facilitator. It is not the employer of listed workers, the customer of their
          services, a labour contractor, or a party to agreements made directly between
          users. Users are responsible for deciding whether to enter an arrangement and
          for agreeing scope, price, timing, safety requirements, payment, and other
          conditions.
        </p>
      </>
    ),
  },
  {
    title: "3. Eligibility and accounts",
    content: (
      <>
        <ul>
          <li>You must be at least 18 years old and legally capable of using the Platform.</li>
          <li>
            You must provide accurate, current, and complete information and promptly
            update it when it changes.
          </li>
          <li>
            You are responsible for protecting your password and for activity performed
            through your account.
          </li>
          <li>
            You may not impersonate another person, create misleading profiles, share an
            account without permission, or evade a suspension.
          </li>
          <li>
            Staff and administrative access may be used only for authorised Livelihood
            College or government functions.
          </li>
        </ul>
        <p>
          Notify the grievance contact promptly if you suspect unauthorised access to
          your account.
        </p>
      </>
    ),
  },
  {
    title: "4. Worker obligations",
    content: (
      <ul>
        <li>
          Accurately describe your identity, skills, qualifications, certificates,
          experience, service area, and availability.
        </li>
        <li>
          Hold any licence, permit, insurance, registration, or authorisation legally
          required for the work you accept.
        </li>
        <li>
          Perform accepted work lawfully, safely, professionally, and in accordance with
          the agreement made with the customer or employer.
        </li>
        <li>
          Do not falsely claim Livelihood College certification or misuse a verification
          badge.
        </li>
        <li>
          Update job status honestly and do not manipulate ratings, job counts, trust
          indicators, or employment records.
        </li>
      </ul>
    ),
  },
  {
    title: "5. Citizen, contractor, and employer obligations",
    content: (
      <ul>
        <li>
          Provide lawful, accurate, and reasonably complete service or manpower
          requirements.
        </li>
        <li>
          Assess worker suitability and verify qualifications relevant to the proposed
          work before engagement.
        </li>
        <li>
          Provide a safe workplace and comply with applicable labour, wage, tax,
          licensing, anti-discrimination, and occupational safety laws.
        </li>
        <li>
          Pay agreed compensation on time and do not charge workers unlawful recruitment
          or placement fees.
        </li>
        <li>
          Submit ratings and complaints honestly, based on direct experience, and
          without abusive or defamatory content.
        </li>
      </ul>
    ),
  },
  {
    title: "6. Training and certification",
    content: (
      <p>
        Course listings, enrolment status, batch records, certificates, and
        &quot;Livelihood Certified&quot; badges are subject to the issuing
        institution&apos;s records and rules. A badge confirms only the verification
        represented on the Platform; it is not a guarantee of future performance,
        identity, availability, legal eligibility, or fitness for a particular job. The
        operator may correct, suspend, or remove a badge if records are inaccurate,
        expired, withdrawn, or suspected to be fraudulent.
      </p>
    ),
  },
  {
    title: "7. Matching, ratings, and availability",
    content: (
      <>
        <p>
          Search results and recommendations may consider skill, distance, availability,
          trust level, rating, completed jobs, complaints, and other Platform signals.
          Placement in a result is not an endorsement or guarantee.
        </p>
        <p>
          Users must not offer payment or other benefits for ratings, coordinate false
          reviews, threaten users over reviews, or create transactions solely to
          manipulate Platform metrics. We may investigate and remove unreliable content
          or adjust affected indicators.
        </p>
      </>
    ),
  },
  {
    title: "8. Offline work, payments, and disputes",
    content: (
      <>
        <p>
          Work and payment generally occur directly between users outside the Platform.
          Unless a Platform feature expressly says otherwise, DLWEP does not collect,
          hold, transfer, refund, or guarantee payment.
        </p>
        <p>
          Users should document the agreed work, price, materials, schedule, and payment
          terms before work begins. DLWEP may provide records or a complaint channel but
          is not required to decide private contractual disputes or compensate either
          party.
        </p>
        <p>
          For immediate threats, violence, fraud, unsafe work, or other suspected
          offences, contact the appropriate emergency or law-enforcement authority.
        </p>
      </>
    ),
  },
  {
    title: "9. Prohibited conduct",
    content: (
      <ul>
        <li>Illegal, unsafe, exploitative, discriminatory, or fraudulent activity.</li>
        <li>
          Harassment, threats, stalking, trafficking, forced labour, child labour, or
          sexual exploitation.
        </li>
        <li>
          Posting malware, scraping data, bypassing access controls, testing
          vulnerabilities without permission, or disrupting Platform operation.
        </li>
        <li>
          Publishing another person&apos;s personal information without a lawful need or
          permission.
        </li>
        <li>
          Uploading content that infringes intellectual property, privacy, confidentiality,
          or other rights.
        </li>
        <li>
          Using worker contact details for spam, unrelated marketing, resale, or building
          an external directory.
        </li>
      </ul>
    ),
  },
  {
    title: "10. User content and Platform use",
    content: (
      <>
        <p>
          You retain ownership of content you submit. You grant the operator a
          non-exclusive, royalty-free licence to host, store, reproduce, format, display,
          and share that content only as reasonably necessary to operate, secure,
          improve, and report on the Platform and its programmes.
        </p>
        <p>
          DLWEP branding, software, layouts, and operator-provided content may not be
          copied, sold, reverse engineered, or commercially reused except as allowed by
          law or written permission.
        </p>
      </>
    ),
  },
  {
    title: "11. Suspension and termination",
    content: (
      <p>
        We may restrict, suspend, or terminate access; hide a profile or requirement;
        remove content; or preserve relevant records where reasonably necessary to
        protect users, investigate complaints, address inactivity, enforce these terms,
        correct programme records, or comply with law. Where appropriate, we will
        provide notice and a grievance opportunity. You may request account closure,
        subject to records we must retain.
      </p>
    ),
  },
  {
    title: "12. Availability and changes",
    content: (
      <p>
        We aim to provide a reliable Platform but do not promise uninterrupted,
        error-free, or permanent availability. Features, eligibility rules, matching
        logic, and programme workflows may change. We may update these terms and will
        publish a revised effective date and additional notice for material changes.
      </p>
    ),
  },
  {
    title: "13. Disclaimers and liability",
    content: (
      <>
        <p>
          To the extent permitted by applicable law, the Platform is provided on an
          &quot;as available&quot; basis. The operator does not guarantee the accuracy of
          user-submitted information, worker availability, job completion, service
          quality, employment outcomes, payments, ratings, or suitability of any user.
        </p>
        <p>
          Nothing in these terms excludes liability or consumer rights that cannot
          lawfully be excluded. Subject to those rights, the operator is not responsible
          for indirect or consequential loss arising from arrangements between users,
          third-party conduct, or events outside its reasonable control.
        </p>
      </>
    ),
  },
  {
    title: "14. Governing law and grievances",
    content: (
      <>
        <p>
          These terms are governed by the laws of India. The operator must insert the
          competent courts or other dispute forum after confirming its legal identity
          and jurisdiction before production launch.
        </p>
        <p>
          Operator: <strong>[insert legal name of Livelihood College or authority]</strong>
          <br />
          Grievance officer: <strong>[insert designated officer name]</strong>
          <br />
          Email: <strong>[insert official grievance email]</strong>
          <br />
          Postal address: <strong>[insert operator&apos;s registered address]</strong>
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="These terms govern access to and use of DLWEP by citizens, skilled workers, contractors, employers, trainees, and authorised Livelihood College staff."
      effectiveDate="10 June 2026"
      sections={sections}
    />
  );
}
