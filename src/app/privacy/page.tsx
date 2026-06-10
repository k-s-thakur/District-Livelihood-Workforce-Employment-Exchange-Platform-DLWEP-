import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | DLWEP",
  description:
    "How DLWEP collects, uses, shares, stores, and protects personal information.",
};

const sections = [
  {
    title: "1. Who this policy applies to",
    content: (
      <>
        <p>
          This Privacy Policy applies to citizens, skilled workers, contractors and
          employers, Livelihood College staff, trainees, and other people who access or
          use the District Livelihood Workforce & Employment Exchange Platform
          (&quot;DLWEP&quot;, &quot;Platform&quot;, &quot;we&quot;, or
          &quot;us&quot;).
        </p>
        <p>
          The data fiduciary and Platform operator is the Livelihood College or other
          public authority identified in the final production version of this policy.
        </p>
      </>
    ),
  },
  {
    title: "2. Information we collect",
    content: (
      <>
        <p>Depending on your role and use of the Platform, we may collect:</p>
        <ul>
          <li>
            Account details such as name, mobile number, email address, password
            credentials, role, and verification status.
          </li>
          <li>
            Worker profile details such as photograph, gender, district, block, village,
            skills, experience, availability, certificates, work history, ratings,
            complaints, and no-show records.
          </li>
          <li>
            Service and hiring information such as descriptions, uploaded photographs,
            preferred dates, location, applications, selections, job status, completion
            records, and reviews.
          </li>
          <li>
            Training information such as course applications, batches, enrolment,
            attendance or completion status, and certificates.
          </li>
          <li>
            Technical information such as device and browser data, session records,
            notification preferences, IP address, security logs, and audit logs.
          </li>
          <li>
            Approximate or precise location when you provide it for worker discovery,
            service delivery, geographic reporting, or matching.
          </li>
        </ul>
        <p>
          Please do not upload identity documents or other sensitive material unless the
          Platform specifically requests it for an authorised verification process.
        </p>
      </>
    ),
  },
  {
    title: "3. Why we use information",
    content: (
      <>
        <p>We process information to:</p>
        <ul>
          <li>Create accounts, authenticate users, and manage sessions.</li>
          <li>
            Publish worker profiles and match workers with citizens, contractors, and
            employers based on skill, location, availability, trust indicators, and
            ratings.
          </li>
          <li>
            Operate service requests, manpower requirements, applications, job tracking,
            ratings, complaints, training, certification, and notifications.
          </li>
          <li>
            Generate employment, training, placement, and geographic analytics for the
            Livelihood College and authorised government reporting.
          </li>
          <li>
            Prevent fraud and misuse, protect users, enforce Platform rules, maintain
            audit logs, and comply with legal obligations.
          </li>
          <li>
            Improve accessibility, reliability, performance, and the relevance of
            workforce matching.
          </li>
        </ul>
        <p>
          Where consent is the applicable basis, you may withdraw it through the
          Platform or the grievance contact. Withdrawal will not affect processing
          already lawfully completed and may prevent us from providing features that
          require the information.
        </p>
      </>
    ),
  },
  {
    title: "4. Profile visibility and contact sharing",
    content: (
      <>
        <p>
          Worker names, photographs, skills, general service area, experience,
          certification badges, availability, ratings, trust level, and completed-job
          counts may be visible to Platform users.
        </p>
        <p>
          Direct contact details should be disclosed only at the appropriate stage of a
          service or hiring workflow, such as after a citizen selects an interested
          worker. Users must not scrape, resell, publish, or use contact details for
          unrelated marketing or harassment.
        </p>
      </>
    ),
  },
  {
    title: "5. Automated matching and trust indicators",
    content: (
      <p>
        DLWEP may rank or recommend workers using factors such as skill match, distance,
        availability, verification, trust level, rating, completed jobs, repeat
        customers, complaints, and no-shows. These indicators support discovery and do
        not guarantee a worker&apos;s identity, qualifications, conduct, suitability, or
        service outcome. Material disputes may be submitted through the grievance
        process.
      </p>
    ),
  },
  {
    title: "6. How we share information",
    content: (
      <>
        <p>We may share information:</p>
        <ul>
          <li>
            With citizens, workers, contractors, and employers as needed to complete a
            service or hiring workflow.
          </li>
          <li>
            With authorised Livelihood College personnel for verification, training,
            certification, support, analytics, and administration.
          </li>
          <li>
            With authorised government bodies for lawful employment, placement,
            training, audit, and programme-impact reporting.
          </li>
          <li>
            With infrastructure providers that process data on our behalf, including
            hosting, database, storage, authentication, email, maps, and browser
            notification providers.
          </li>
          <li>
            When required by law, court order, government request, safety need, or the
            investigation of suspected fraud or abuse.
          </li>
        </ul>
        <p>We do not sell personal information.</p>
      </>
    ),
  },
  {
    title: "7. Storage, security, and retention",
    content: (
      <>
        <p>
          The Platform is designed to use Supabase and related infrastructure for
          database, authentication, and file storage, and may use Vercel for hosting.
          The production operator must identify its actual providers and data locations
          before launch.
        </p>
        <p>
          We use reasonable technical and organisational safeguards, including access
          controls, HTTPS, password hashing, role-based permissions, backups, and audit
          logging. No online system can guarantee absolute security.
        </p>
        <p>
          We retain information only for as long as reasonably necessary for the stated
          purpose, account operation, employment and training records, dispute handling,
          audits, security, and legal obligations. The operator must publish a specific
          retention schedule before production launch.
        </p>
      </>
    ),
  },
  {
    title: "8. Your choices and rights",
    content: (
      <>
        <p>Subject to applicable law, you may request to:</p>
        <ul>
          <li>Access a summary of your personal information and its processing.</li>
          <li>Correct, complete, or update inaccurate information.</li>
          <li>Delete information that is no longer required to be retained.</li>
          <li>Withdraw consent or change optional notification permissions.</li>
          <li>Raise a grievance and nominate another person where legally permitted.</li>
        </ul>
        <p>
          We may need to verify your identity before acting on a request. Some
          information may be retained where required for legal, safety, fraud
          prevention, audit, certification, or dispute purposes.
        </p>
      </>
    ),
  },
  {
    title: "9. Children",
    content: (
      <p>
        DLWEP is intended for adults who can lawfully enter service, employment, or
        training arrangements. A person under 18 must not independently create a worker,
        citizen, or contractor account. If a training programme lawfully enrols a child,
        the operator must implement verifiable parental or guardian consent and
        age-appropriate protections before processing the child&apos;s personal data.
      </p>
    ),
  },
  {
    title: "10. Cookies and notifications",
    content: (
      <p>
        We may use essential browser storage and cookies for authentication, security,
        preferences, and session management. Browser push notifications are optional and
        may be disabled in your device or browser settings. A production analytics or
        advertising service must not be added without updating this policy and obtaining
        any required consent.
      </p>
    ),
  },
  {
    title: "11. Changes to this policy",
    content: (
      <p>
        We may update this policy when Platform features, providers, or legal
        requirements change. We will publish the updated effective date and provide
        additional notice where a change materially affects your rights or how we use
        personal information.
      </p>
    ),
  },
  {
    title: "12. Contact and grievances",
    content: (
      <>
        <p>
          Privacy and grievance contact: <strong>[insert designated officer name]</strong>
          <br />
          Email: <strong>[insert official grievance email]</strong>
          <br />
          Postal address: <strong>[insert operator&apos;s registered address]</strong>
        </p>
        <p>
          Please describe your request and provide enough information to identify your
          account. Do not include passwords or unnecessary identity documents in an
          email.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains how DLWEP handles personal information while connecting training, certification, workforce discovery, local hiring, and employment reporting."
      effectiveDate="10 June 2026"
      sections={sections}
    />
  );
}
