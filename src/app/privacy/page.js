import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcomponents/ui/breadcrumb";
import { Laptop, NewspaperIcon } from "lucide-react";

export default async function Privacy() {
  return (
    <>
      <Breadcrumb className="font-main font-semibold flex flex-wrap sm:flex-nowrap h-8 items-center gap-2 px-4 sm:px-6 py-2">
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:flex">
            <BreadcrumbLink
              href="/"
              className="flex items-center font-medium text-xs text-[#37352F] gap-2 hover:underline"
            >
              <Laptop className="rounded-xs text-white fill-blue-500 h-5 w-5" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <div className="text-gray-300">/</div>
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-main font-medium text-xs text-[#37352F] hover:underline cursor-pointer flex items-center gap-2">
              <NewspaperIcon className="rounded-xs text-blue-500 h-5 w-5" />
              Privacy Policy
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main className="bg-white text-gray-900 font-main px-7 py-12 leading-relaxed flex flex-col justify-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl tracking-wide mb-4 font-playfair">
            PRIVACY POLICY
          </h1>

          <p className="text-md text-gray-700 mb-9">
            <strong>Last updated</strong> December 24, 2025
          </p>

          <p className="text-md mb-5">
            This Privacy Notice for “we,” “us,” or “our”, describes how and why
            we might access, collect, store, use, and/or share (“process”) your
            personal information when you use our services (“Services”),
            including when you:
          </p>

          <ul className="list-disc pl-6 text-md mb-6 space-y-3">
            <li>
              Visit our website at{" "}
              <a
                href="https://www.trypalette.app/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://www.trypalette.app/
              </a>{" "}
              or any website of ours that links to this Privacy Notice
            </li>

            <li>
              Use Palette. Palette is an all-in-one outreach platform designed
              to support research internship recruiting by helping users source
              leads, send emails, track follow-ups, and manage their outreach
              pipeline in a single place.
            </li>

            <li>
              Engage with us in other related ways, including any marketing or
              events
            </li>
          </ul>

          <p className="text-md">
            <strong>Questions or concerns?</strong> Reading this Privacy Notice
            will help you understand your privacy rights and choices. We are
            responsible for making decisions about how your personal information
            is processed. If you do not agree with our policies and practices,
            please do not use our Services. If you still have any questions or
            concerns, please contact us at{" "}
            <a
              href="mailto:jiexuan55@gmail.com"
              className="text-blue-600 hover:underline"
            >
              jiexuanliu55@gmail.com
            </a>
            .
          </p>
        </div>
      </main>
      <section className="bg-white font-main text-gray-900  px-7 py-12 leading-relaxed flex flex-col justify-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl tracking-wide mb-4 font-playfair">
            1. WHAT INFORMATION DO WE COLLECT?
          </h2>

          <h3 className="text-xl font-semibold mb-4">
            Personal information you disclose to us
          </h3>

          <p className="text-md text-gray-700 mb-6 italic">
            <strong>In Short:</strong> We collect personal information that you
            provide to us.
          </p>

          <p className="text-md mb-5">
            We collect personal information that you voluntarily provide to us
            when you register on the Services, express an interest in obtaining
            information about us or our products and Services, when you
            participate in activities on the Services, or otherwise when you
            contact us.
          </p>

          <p className="text-md mb-4">
            <strong>Personal Information Provided by You.</strong> The personal
            information that we collect depends on the context of your
            interactions with us and the Services, the choices you make, and the
            products and features you use. The personal information we collect
            may include the following:
          </p>

          <ul className="list-disc pl-6 text-md mb-6 space-y-2">
            <li>names</li>
            <li>email addresses</li>
            <li>usernames</li>
            <li>passwords</li>
            <li>contact or authentication data</li>
            <li>graduation year</li>
            <li>university program</li>
            <li>attending school</li>
            <li>research interests</li>
          </ul>

          <p className="text-md mb-5">
            <strong>Sensitive Information.</strong> We do not process sensitive
            information.
          </p>

          <p className="text-md mb-5">
            <strong>Social Media Login Data.</strong> We may provide you with
            the option to register with us using your existing social media
            account details, like your Facebook, X, or other social media
            account. If you choose to register in this way, we will collect
            certain profile information about you from the social media
            provider, as described in the section called{" "}
            <span className="text-blue-600 font-semibold">
              “HOW DO WE HANDLE YOUR SOCIAL LOGINS?”
            </span>{" "}
            below.
          </p>

          <p className="text-md">
            All personal information that you provide to us must be true,
            complete, and accurate, and you must notify us of any changes to
            such personal information.
          </p>
        </div>
      </section>
      <section className="bg-white text-gray-900 font-main px-7 py-12 leading-relaxed flex flex-col justify-center">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">
            Information automatically collected
          </h3>

          <p className="text-md text-gray-700 mb-6 italic">
            <strong>In Short:</strong> Some information — such as your Internet
            Protocol (IP) address and/or browser and device characteristics — is
            collected automatically when you visit our Services.
          </p>

          <p className="text-md mb-5">
            We automatically collect certain information when you visit, use, or
            navigate the Services. This information does not reveal your
            specific identity (like your name or contact information) but may
            include device and usage information, such as your IP address,
            browser and device characteristics, operating system, language
            preferences, referring URLs, device name, country, location,
            information about how and when you use our Services, and other
            technical information. This information is primarily needed to
            maintain the security and operation of our Services, and for our
            internal analytics and reporting purposes.
          </p>

          <p className="text-md mb-5">
            Like many businesses, we also collect information through cookies
            and similar technologies.
          </p>

          <p className="text-md mb-3">The information we collect includes:</p>

          <ul className="list-disc pl-6 text-md mb-8 space-y-3">
            <li>
              <em className="font-semibold">Log and Usage Data.</em> Log and
              usage data is service-related, diagnostic, usage, and performance
              information our servers automatically collect when you access or
              use our Services and which we record in log files. Depending on
              how you interact with us, this log data may include your IP
              address, device information, browser type, and settings and
              information about your activity in the Services (such as the
              date/time stamps associated with your usage, pages and files
              viewed, searches, and other actions you take such as which
              features you use), device event information (such as system
              activity, error reports (sometimes called “crash dumps”), and
              hardware settings).
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-4">Google API</h3>

          <p className="text-md">
            Our use of information received from Google APIs will adhere to{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google API Services User Data Policy
            </a>
            , including the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy#limited-use"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Limited Use requirements
            </a>
            .
          </p>
        </div>
      </section>
      <section className="bg-white text-gray-900 font-main px-7 py-12 leading-relaxed flex flex-col justify-center">
        <div className="max-w-5xl mx-auto">
          {/* Information collected from other sources */}
          <h3 className="text-xl font-semibold mb-4">
            Information collected from other sources
          </h3>

          <p className="text-md text-gray-700 mb-6 italic">
            <strong>In Short:</strong> We may collect limited data from public
            databases, marketing partners, social media platforms, and other
            outside sources.
          </p>

          <p className="text-md mb-5">
            In order to enhance our ability to provide relevant marketing,
            offers, and services to you and update our records, we may obtain
            information about you from other sources, such as public databases,
            joint marketing partners, affiliate programs, data providers, social
            media platforms, and from other third parties. This information
            includes mailing addresses, job titles, email addresses, phone
            numbers, intent data (or user behavior data), Internet Protocol (IP)
            addresses, social media profiles, social media URLs, and custom
            profiles, for purposes of targeted advertising and event promotion.
          </p>

          <p className="text-md mb-10">
            If you interact with us on a social media platform using your social
            media account (e.g. Facebook or X), we receive personal information
            about you from such platforms such as your name, email address, and
            gender. You may have the right to withdraw your consent to
            processing your personal information. Learn more about{" "}
            <a
              href="#withdraw-consent"
              className="text-blue-600 hover:underline"
            >
              withdrawing your consent
            </a>
            . Any personal information that we collect from your social media
            account depends on your social media account’s privacy settings.
            Please note that their own use of your information is not governed
            by this Privacy Notice.
          </p>

          {/* Section 2 */}
          <h2 className="text-3xl tracking-wide mb-4 font-playfair">
            2. HOW DO WE PROCESS YOUR INFORMATION?
          </h2>

          <p className="text-md text-gray-700 mb-6 italic">
            <strong>In Short:</strong> We process your information to provide,
            improve, and administer our Services, communicate with you, for
            security and fraud prevention, and to comply with law. We process
            the personal information for the following purposes listed below. We
            may also process your information for other purposes only with your
            prior explicit consent.
          </p>

          <p className="text-md mb-4">
            We process your personal information for a variety of reasons,
            depending on how you interact with our Services, including:
          </p>

          <ul className="list-disc pl-6 text-md space-y-3">
            <li>
              <strong>
                To facilitate account creation and authentication and otherwise
                manage user accounts.
              </strong>{" "}
              We may process your information so you can create and log in to
              your account, as well as keep your account in working order.
            </li>

            <li>
              <strong>
                To deliver and facilitate delivery of services to the user.
              </strong>{" "}
              We may process your information to provide you with the requested
              service.
            </li>

            <li>
              <strong>
                {"To save or protect an individual’s vital interest."}
              </strong>{" "}
              {`We may process your information when necessary to save or protect an
            individual’s vital interest, such as to prevent harm.`}
            </li>
          </ul>
        </div>
      </section>
      <section className="bg-white text-gray-900 font-main px-7 py-12 leading-relaxed flex flex-col justify-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl tracking-wide mb-4 font-playfair">
            3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
          </h2>

          <p className="text-md text-gray-700 mb-6 italic">
            <strong>In Short:</strong> We only process your personal information
            when we believe it is necessary and we have a valid legal reason
            (i.e. legal basis) to do so under applicable law, like with your
            consent, to comply with laws, to provide you with services to enter
            into or fulfill our contractual obligations, to protect your rights,
            or to fulfill our legitimate business interests.
          </p>

          <p className="text-md mb-5 italic">
            <strong>
              If you are located in the EU or UK, this section applies to you.
            </strong>
          </p>

          <p className="text-md mb-5">
            The General Data Protection Regulation (GDPR) and UK GDPR require us
            to explain the valid legal bases we rely on in order to process your
            personal information. As such, we may rely on the following legal
            bases to process your personal information:
          </p>

          <ul className="list-disc pl-6 text-md mb-10 space-y-3">
            <li>
              <strong>Consent.</strong> We may process your information if you
              have given us permission (i.e. consent) to use your personal
              information for a specific purpose. You can withdraw your consent
              at any time. Learn more about{" "}
              <a
                href="#withdraw-consent"
                className="text-blue-600 hover:underline"
              >
                withdrawing your consent
              </a>
              .
            </li>

            <li>
              <strong>Performance of a Contract.</strong> We may process your
              personal information when we believe it is necessary to fulfill
              our contractual obligations to you, including providing our
              Services or at your request prior to entering into a contract with
              you.
            </li>

            <li>
              <strong>Legal Obligations.</strong> We may process your
              information where we believe it is necessary for compliance with
              our legal obligations, such as to cooperate with a law enforcement
              body or regulatory agency, exercise or defend our legal rights, or
              disclose your information as evidence in litigation in which we
              are involved.
            </li>

            <li>
              <strong>Vital Interests.</strong> We may process your information
              where we believe it is necessary to protect your vital interests
              or the vital interests of a third party, such as situations
              involving potential threats to the safety of any person.
            </li>
          </ul>

          <p className="text-md mb-5 italic">
            <strong>
              If you are located in Canada, this section applies to you.
            </strong>
          </p>

          <p className="text-md mb-5">
            We may process your information if you have given us specific
            permission (i.e. express consent) to use your personal information
            for a specific purpose, or in situations where your permission can
            be inferred (i.e. implied consent). You can{" "}
            <a
              href="#withdraw-consent"
              className="text-blue-600 hover:underline"
            >
              withdraw your consent
            </a>{" "}
            at any time.
          </p>

          <p className="text-md mb-4">
            In some exceptional cases, we may be legally permitted under
            applicable law to process your information without your consent,
            including, for example:
          </p>

          <ul className="list-disc pl-6 text-md space-y-3">
            <li>
              If collection is clearly in the interests of an individual and
              consent cannot be obtained in a timely way
            </li>
            <li>For investigations and fraud detection and prevention</li>
            <li>
              For business transactions provided certain conditions are met
            </li>
            <li>
              If it is contained in a witness statement and the collection is
              necessary to assess, process, or settle an insurance claim
            </li>
            <li>
              For identifying injured, ill, or deceased persons and
              communicating with next of kin
            </li>
            <li>
              If we have reasonable grounds to believe an individual has been,
              is, or may be victim of financial abuse
            </li>
            <li>
              If it is reasonable to expect collection and use with consent
              would compromise the availability or the accuracy of the
              information and the collection is reasonable for purposes related
              to investigating a breach of an agreement or a contravention of
              the laws of Canada or a province
            </li>
            <li>
              If disclosure is required to comply with a subpoena, warrant,
              court order, or rules of the court relating to the production of
              records
            </li>
            <li>
              If it was produced by an individual in the course of their
              employment, business, or profession and the collection is
              consistent with the purposes for which the information was
              produced
            </li>
            <li>
              If the collection is solely for journalistic, artistic, or
              literary purposes
            </li>
            <li>
              If the information is publicly available and is specified by the
              regulations
            </li>
            <li>
              We may disclose de-identified information for approved research or
              statistics projects, subject to ethics oversight and
              confidentiality commitments
            </li>
          </ul>
        </div>
      </section>
      <section className="bg-white text-gray-900 font-main px-7 py-12 leading-relaxed flex flex-col justify-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl tracking-wide mb-4 font-playfair">
            4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
          </h2>

          <p className="text-md text-gray-700 mb-6 italic">
            <strong>In Short:</strong> We may share information in specific
            situations described in this section and/or with the following third
            parties.
          </p>

          <p className="text-md mb-4">
            We may need to share your personal information in the following
            situations:
          </p>

          <ul className="list-disc pl-6 text-md space-y-3">
            <li>
              <strong>Business Transfers.</strong> We may share or transfer your
              information in connection with, or during negotiations of, any
              merger, sale of company assets, financing, or acquisition of all
              or a portion of our business to another company.
            </li>
          </ul>
        </div>
      </section>
      <section className="bg-white text-gray-900 font-main px-7 py-12 leading-relaxed flex flex-col justify-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl tracking-wide mb-4 font-playfair">
            5. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?
          </h2>

          <p className="text-md text-gray-700 mb-6 italic">
            <strong>In Short:</strong> We offer products, features, or tools
            powered by artificial intelligence, machine learning, or similar
            technologies.
          </p>

          <p className="text-md mb-8">
            As part of our Services, we offer products, features, or tools
            powered by artificial intelligence, machine learning, or similar
            technologies (collectively, &quot;AI Products&quot;). These tools
            are designed to enhance your experience and provide you with
            innovative solutions. The terms in this Privacy Notice govern your
            use of the AI Products within our Services.
          </p>

          <h3 className="text-xl font-semibold mb-4">Use of AI Technologies</h3>

          <p className="text-md mb-8">
            We provide the AI Products through third-party service providers
            (&quot;AI Service Providers&quot;), including OpenAI. As outlined in
            this Privacy Notice, your input, output, and personal information
            will be shared with and processed by these AI Service Providers to
            enable your use of our AI Products for purposes outlined in{" "}
            <a href="#legal-bases" className="text-blue-600 hover:underline">
              &quot;WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL
              INFORMATION?&quot;
            </a>{" "}
            You must not use the AI Products in any way that violates the terms
            or policies of any AI Service Provider.
          </p>

          <h3 className="text-xl font-semibold mb-4">Our AI Products</h3>

          <p className="text-md mb-4">
            Our AI Products are designed for the following functions:
          </p>

          <ul className="list-disc pl-6 text-md mb-8 space-y-2">
            <li>Natural language processing</li>
            <li>Machine learning models</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4">
            How We Process Your Data Using AI
          </h3>

          <p className="text-md mb-8">
            All personal information processed using our AI Products is handled
            in line with our Privacy Notice and our agreement with third
            parties. This ensures high security and safeguards your personal
            information throughout the process, giving you peace of mind about
            your data&apos;s safety.
          </p>

          <h3 className="text-xl font-semibold mb-4">How to Opt Out</h3>

          <p className="text-md mb-4">
            We believe in giving you the power to decide how your data is used.
            To opt out, you can:
          </p>

          <ul className="list-disc pl-6 text-md space-y-2">
            <li>Contact us using the contact information provided</li>
          </ul>
        </div>
      </section>

      <section className="bg-white text-gray-900 font-main px-7 py-12 leading-relaxed flex flex-col justify-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl tracking-wide mb-4 font-playfair">
            6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
          </h2>

          <p className="text-md text-gray-700 mb-6 italic">
            <strong>In Short:</strong> If you choose to register or log in to
            our Services using a social media account, we may have access to
            certain information about you.
          </p>

          <p className="text-md mb-5">
            Our Services offer you the ability to register and log in using your
            third-party social media account details (like your Facebook or X
            logins). Where you choose to do this, we will receive certain
            profile information about you from your social media provider. The
            profile information we receive may vary depending on the social
            media provider concerned, but will often include your name, email
            address, friends list, and profile picture, as well as other
            information you choose to make public on such a social media
            platform.
          </p>

          <p className="text-md mb-10">
            We will use the information we receive only for the purposes that
            are described in this Privacy Notice or that are otherwise made
            clear to you on the relevant Services. Please note that we do not
            control, and are not responsible for, other uses of your personal
            information by your third-party social media provider. We recommend
            that you review their privacy notice to understand how they collect,
            use, and share your personal information, and how you can set your
            privacy preferences on their sites and apps.
          </p>

          <h2 className="text-3xl tracking-wide mb-4 font-playfair">
            7. HOW LONG DO WE KEEP YOUR INFORMATION?
          </h2>

          <p className="text-md text-gray-700 mb-6 italic">
            <strong>In Short:</strong> We keep your information for as long as
            necessary to fulfill the purposes outlined in this Privacy Notice
            unless otherwise required by law.
          </p>

          <p className="text-md mb-5">
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this Privacy Notice, unless a
            longer retention period is required or permitted by law (such as
            tax, accounting, or other legal requirements). No purpose in this
            notice will require us keeping your personal information for longer
            than the period of time in which users have an account with us.
          </p>

          <p className="text-md">
            When we have no ongoing legitimate business need to process your
            personal information, we will either delete or anonymise such
            information, or, if this is not possible (for example, because your
            personal information has been stored in backup archives), then we
            will securely store your personal information and isolate it from
            any further processing until deletion is possible.
          </p>
        </div>
      </section>
      <section className="bg-white text-gray-900 font-main px-7 py-12 leading-relaxed flex flex-col justify-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl tracking-wide mb-4 font-playfair">
            8. HOW DO WE KEEP YOUR INFORMATION SAFE?
          </h2>

          <p className="text-md text-gray-700 mb-6 italic">
            <strong>In Short:</strong> We aim to protect your personal
            information through a system of organisational and technical
            security measures.
          </p>

          <p className="text-md mb-10">
            We have implemented appropriate and reasonable technical and
            organisational security measures designed to protect the security of
            any personal information we process. However, despite our safeguards
            and efforts to secure your information, no electronic transmission
            over the Internet or information storage technology can be
            guaranteed to be 100% secure, so we cannot promise or guarantee that
            hackers, cybercriminals, or other unauthorised third parties will
            not be able to defeat our security and improperly collect, access,
            steal, or modify your information. Although we will do our best to
            protect your personal information, transmission of personal
            information to and from our Services is at your own risk. You should
            only access the Services within a secure environment.
          </p>

          <h2 className="text-3xl tracking-wide mb-4 font-playfair">
            9. DO WE COLLECT INFORMATION FROM MINORS?
          </h2>

          <p className="text-md text-gray-700 mb-6 italic">
            <strong>In Short:</strong> We do not knowingly collect data from or
            market to children under 18 years of age or the equivalent age as
            specified by law in your jurisdiction.
          </p>

          <p className="text-md">
            {`We do not knowingly collect, solicit data from, or market to children
          under 18 years of age or the equivalent age as specified by law in your
          jurisdiction, nor do we knowingly sell such personal information. By
          using the Services, you represent that you are at least 18 or the
          equivalent age as specified by law in your jurisdiction or that you
          are the parent or guardian of such a minor and consent to such minor
          dependent’s use of the Services. If we learn that personal information
          from users less than 18 years of age or the equivalent age as specified
          by law in your jurisdiction has been collected, we will deactivate the
          account and take reasonable measures to promptly delete such data from
          our records. If you become aware of any data we may have collected
          from children under age 18 or the equivalent age as specified by law
          in your jurisdiction, please contact us at`}
            <a
              href="mailto:jiexuan55@gmail.com"
              className="text-blue-600 hover:underline"
            >
              jiexuan55@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
      <section className="bg-white text-gray-900 font-main px-7 py-12 leading-relaxed flex flex-col justify-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl tracking-wide mb-4 font-playfair">
            10. WHAT ARE YOUR PRIVACY RIGHTS?
          </h2>

          <p className="text-md text-gray-700 mb-6 italic">
            <strong>In Short:</strong> Depending on your state of residence in
            the US or in some regions, such as the European Economic Area (EEA),
            United Kingdom (UK), Switzerland, and Canada, you have rights that
            allow you greater access to and control over your personal
            information. You may review, change, or terminate your account at
            any time, depending on your country, province, or state of
            residence.
          </p>

          <p className="text-md mb-5">
            In some regions (like the EEA, UK, Switzerland, and Canada), you
            have certain rights under applicable data protection laws. These may
            include the right (i) to request access and obtain a copy of your
            personal information, (ii) to request rectification or erasure,
            (iii) to restrict the processing of your personal information, (iv)
            if applicable, to data portability, and (v) not to be subject to
            automated decision-making. If a decision that produces legal or
            similarly significant effects is made solely by automated means, we
            will inform you, explain the main factors, and offer a simple way to
            request human review. In certain circumstances, you may also have
            the right to object to the processing of your personal information.
            You can make such a request by contacting us by using the contact
            details provided in the section{" "}
            <span className="text-blue-600 font-semibold">
              “HOW CAN YOU CONTACT US ABOUT THIS NOTICE?”
            </span>{" "}
            below.
          </p>

          <p className="text-md mb-5">
            We will consider and act upon any request in accordance with
            applicable data protection laws.
          </p>

          <p className="text-md mb-5">
            If you are located in the EEA or UK and believe we are unlawfully
            processing your personal information, you also have the right to
            complain to your{" "}
            <a href="#eea-authority" className="text-blue-600 hover:underline">
              Member State data protection authority
            </a>{" "}
            or{" "}
            <a href="#uk-authority" className="text-blue-600 hover:underline">
              UK data protection authority
            </a>
            .
          </p>

          <p className="text-md mb-8">
            If you are located in Switzerland, you may contact the{" "}
            <a
              href="#swiss-authority"
              className="text-blue-600 hover:underline"
            >
              Federal Data Protection and Information Commissioner
            </a>
            .
          </p>

          <p className="text-md mb-6">
            <strong>Withdrawing your consent:</strong> If we are relying on your
            consent to process your personal information, which may be express
            and/or implied consent depending on the applicable law, you have the
            right to withdraw your consent at any time. You can withdraw your
            consent at any time by contacting us by using the contact details
            provided in the section{" "}
            <span className="text-blue-600 font-semibold">
              “HOW CAN YOU CONTACT US ABOUT THIS NOTICE?”
            </span>{" "}
            below or updating your preferences.
          </p>

          <p className="text-md mb-10">
            However, please note that this will not affect the lawfulness of the
            processing before its withdrawal nor, when applicable law allows,
            will it affect the processing of your personal information conducted
            in reliance on lawful processing grounds other than consent.
          </p>

          <h3 className="text-xl font-semibold mb-4">Account Information</h3>

          <p className="text-md mb-4">
            If you would at any time like to review or change the information in
            your account or terminate your account, you can:
          </p>

          <ul className="list-disc pl-6 text-md mb-6 space-y-2">
            <li>Contact us using the contact information provided.</li>
            <li>
              Log in to your account settings and update your user account.
            </li>
          </ul>

          <p className="text-md mb-5">
            Upon your request to terminate your account, we will deactivate or
            delete your account and information from our active databases.
            However, we may retain some information in our files to prevent
            fraud, troubleshoot problems, assist with any investigations,
            enforce our legal terms and/or comply with applicable legal
            requirements.
          </p>

          <p className="text-md mb-5">
            <strong>Cookies and similar technologies:</strong> Most Web browsers
            are set to accept cookies by default. If you prefer, you can usually
            choose to set your browser to remove cookies and to reject cookies.
            If you choose to remove cookies or reject cookies, this could affect
            certain features or services of our Services.
          </p>

          <p className="text-md">
            If you have questions or comments about your privacy rights, you may
            email us at{" "}
            <a
              href="mailto:jiexuan55@gmail.com"
              className="text-blue-600 hover:underline"
            >
              jiexuan55@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
      <section className="bg-white text-gray-900 font-main px-7 py-12 leading-relaxed flex flex-col justify-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl tracking-wide mb-4 font-playfair">
            11. DO WE MAKE UPDATES TO THIS NOTICE?
          </h2>

          <p className="text-md text-gray-700 mb-6 italic">
            <strong>In Short:</strong> Yes, we will update this notice as
            necessary to stay compliant with relevant laws.
          </p>

          <p className="text-md mb-10">
            We may update this Privacy Notice from time to time. The updated
            version will be indicated by an updated &quot;Revised&quot; date at
            the top of this Privacy Notice. If we make material changes to this
            Privacy Notice, we may notify you either by prominently posting a
            notice of such changes or by directly sending you a notification. We
            encourage you to review this Privacy Notice frequently to be
            informed of how we are protecting your information.
          </p>

          <h2 className="text-3xl tracking-wide mb-4 font-playfair">
            12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
          </h2>

          <p className="text-md mb-10">
            If you have questions or comments about this notice, you may email
            us at{" "}
            <a
              href="mailto:jiexuan55@gmail.com"
              className="text-blue-600 hover:underline"
            >
              jiexuan55@gmail.com
            </a>
            .
          </p>

          {/* Section 16 */}
          <h2 className="text-3xl tracking-wide mb-4 font-playfair">
            12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
            YOU?
          </h2>

          <p className="text-md mb-4">
            Based on the applicable laws of your country or state of residence
            in the US, you may have the right to request access to the personal
            information we collect from you, details about how we have processed
            it, correct inaccuracies, or delete your personal information. You
            may also have the right to withdraw your consent to our processing
            of your personal information. These rights may be limited in some
            circumstances by applicable law.
          </p>

          <p className="text-md">
            To request to review, update, or delete your personal information,
            please visit{" "}
            <a
              href="https://forms.gle/ceo9PDmgBCW7sim9"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://forms.gle/ceo9PDmgBCW7sim9
            </a>
            .
          </p>
        </div>
      </section>
      <footer className="bg-white font-light flex border-t mt-12 py-4">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <div className="text-sm flex gap-4">
            <span>Made By Jie Xuan Liu</span>
            <a className="underline hover:text-blue-500" href="/blog">
              Engineering Blog
            </a>
          </div>
        </div>
        <div className="w-[20rem] flex gap-5">
          <div className="text-sm w-fit flex gap-4">
            <a className="underline hover:text-blue-500" href="/terms">
              Terms of Use
            </a>
          </div>
          <div className="text-sm flex gap-4">
            <a className="underline hover:text-blue-500" href="/privacy">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
